/* 3D printing status page.
   Vanilla JS, no framework, no build step, nothing on window.
   Everything on screen comes from /printer-data.json. */
(function () {
  'use strict';

  var DATA_URL = '/printer-data.json';
  var STALE_AFTER_DAYS = 7;
  var AUTO_REFRESH = true;
  var AUTO_REFRESH_MS = 5 * 60 * 1000;
  var HEX_RE = /^#[0-9a-fA-F]{6}$/;
  var FALLBACK_HEX = '#555555';

  var STATUSES = {
    idle:        { glyph: '●', label: 'Idle',        cls: 'badge-idle' },
    printing:    { glyph: '▶', label: 'Printing',    cls: 'badge-printing' },
    booked:      { glyph: '◷', label: 'Booked',      cls: 'badge-booked' },
    maintenance: { glyph: '⚠', label: 'Maintenance', cls: 'badge-maintenance' },
    offline:     { glyph: '✕', label: 'Offline',     cls: 'badge-offline' }
  };
  var UNKNOWN_STATUS = { glyph: '?', label: 'Unknown', cls: 'badge-unknown' };

  var root = document.querySelector('.printing');
  if (!root) { return; }

  var dom = {
    updated:   root.querySelector('.printing-updated'),
    stale:     root.querySelector('.printing-stale'),
    header:    root.querySelector('.printing-header'),
    sections:  root.querySelectorAll('.printing-section'),
    printers:  root.querySelector('.printer-grid'),
    filaments: root.querySelector('.filament-grid'),
    plates:    root.querySelector('.plate-grid'),
    nozzles:   root.querySelector('.nozzle-grid'),
    chips:     root.querySelector('#material-filters'),
    inStock:   root.querySelector('#in-stock-only')
  };

  /* filter state lives here and nowhere else */
  var state = {
    material: null,
    inStockOnly: false,
    filaments: [],
    lastUpdated: null
  };

  /* ------------------------------------------------------------------ */
  /* tiny DOM builder. textContent and setAttribute only, never innerHTML */
  /* ------------------------------------------------------------------ */

  function el(tag, opts, children) {
    var node = document.createElement(tag);
    opts = opts || {};
    if (opts.class) { node.className = opts.class; }
    if (opts.text != null) { node.textContent = String(opts.text); }
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (key) {
        var value = opts.attrs[key];
        if (value != null && value !== false) {
          node.setAttribute(key, String(value));
        }
      });
    }
    if (children) {
      children.forEach(function (child) {
        if (child) { node.appendChild(child); }
      });
    }
    return node;
  }

  /* append that tolerates null, since the optional-field builders below
     return null when there is nothing worth showing */
  function add(parent, child) {
    if (child) { parent.appendChild(child); }
    return parent;
  }

  function clear(node) {
    while (node.firstChild) { node.removeChild(node.firstChild); }
  }

  function empty(node, message) {
    clear(node);
    node.appendChild(el('p', { class: 'printing-empty', text: message || 'Nothing listed right now.' }));
  }

  function isFilled(value) {
    return value != null && String(value).trim() !== '';
  }

  /* ------------------------------------------------------------------ */
  /* dates                                                               */
  /* ------------------------------------------------------------------ */

  var RELATIVE_UNITS = [
    ['year', 365 * 24 * 3600],
    ['month', 30 * 24 * 3600],
    ['week', 7 * 24 * 3600],
    ['day', 24 * 3600],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ];

  function parseDate(iso) {
    if (!isFilled(iso)) { return null; }
    var date = new Date(iso);
    return isNaN(date.getTime()) ? null : date;
  }

  function formatRelative(iso) {
    var date = parseDate(iso);
    if (!date) { return ''; }
    var seconds = (date.getTime() - Date.now()) / 1000;
    var abs = Math.abs(seconds);
    for (var i = 0; i < RELATIVE_UNITS.length; i++) {
      var unit = RELATIVE_UNITS[i][0];
      var size = RELATIVE_UNITS[i][1];
      if (abs >= size || unit === 'second') {
        var amount = Math.round(seconds / size);
        try {
          return new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }).format(amount, unit);
        } catch (err) {
          return amount >= 0 ? 'in ' + amount + ' ' + unit + 's' : Math.abs(amount) + ' ' + unit + 's ago';
        }
      }
    }
    return '';
  }

  function formatDate(iso, withZone) {
    var date = parseDate(iso);
    if (!date) { return ''; }
    var opts = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    if (withZone) { opts.timeZoneName = 'short'; }
    try {
      return new Intl.DateTimeFormat(undefined, opts).format(date);
    } catch (err) {
      return date.toLocaleString();
    }
  }

  /* ------------------------------------------------------------------ */
  /* small shared pieces                                                 */
  /* ------------------------------------------------------------------ */

  function badge(cls, glyph, label) {
    return el('span', { class: 'badge ' + cls }, [
      el('span', { class: 'glyph', text: glyph, attrs: { 'aria-hidden': 'true' } }),
      document.createTextNode(' ' + label)
    ]);
  }

  function line(label, value) {
    if (!isFilled(value)) { return null; }
    return el('p', { class: 'pcard-line' }, [
      el('span', { class: 'pcard-label', text: label + ': ' }),
      document.createTextNode(String(value))
    ]);
  }

  function note(text) {
    if (!isFilled(text)) { return null; }
    return el('p', { class: 'pcard-note', text: text });
  }

  function progressBar(percent, label, fillClass) {
    var pct = Math.max(0, Math.min(100, Math.round(percent)));
    var fill = el('span', { class: 'bar-fill' + (fillClass ? ' ' + fillClass : '') });
    fill.style.width = pct + '%';
    return el('div', {
      class: 'bar',
      attrs: {
        role: 'progressbar',
        'aria-valuenow': pct,
        'aria-valuemin': '0',
        'aria-valuemax': '100',
        'aria-label': label
      }
    }, [fill]);
  }

  function tagList(values) {
    if (!Array.isArray(values) || !values.length) { return null; }
    var wrap = el('p', { class: 'pcard-line' });
    values.forEach(function (value) {
      if (isFilled(value)) {
        wrap.appendChild(el('span', { class: 'tag', text: String(value) }));
      }
    });
    return wrap.childNodes.length ? wrap : null;
  }

  function dims(arr, unit) {
    if (!Array.isArray(arr) || !arr.length) { return ''; }
    var nums = arr.filter(function (n) { return typeof n === 'number' && isFinite(n); });
    return nums.length ? nums.join(' × ') + ' ' + unit : '';
  }

  /* ------------------------------------------------------------------ */
  /* loading and validation                                              */
  /* ------------------------------------------------------------------ */

  function loadData(isRefresh) {
    /* GitHub Pages caches for roughly ten minutes, so bust it */
    return fetch(DATA_URL + '?v=' + Date.now(), { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.json();
      })
      .catch(function (err) {
        /* network, HTTP or JSON-parse failure: the data never arrived */
        console.warn('printing: could not load ' + DATA_URL, err);
        if (!isRefresh) { showError(); }
        return null;
      })
      .then(function (data) {
        if (data === null) { return; }
        var clean = validate(data);
        if (isRefresh && clean.last_updated === state.lastUpdated) {
          return;
        }
        state.lastUpdated = clean.last_updated;
        renderAll(clean);
      })
      .catch(function (err) {
        /* the data arrived but rendering it blew up: that is a bug in here,
           not a bad connection, so say so loudly and distinctly */
        console.error('printing: failed to render printer-data.json', err);
        if (!isRefresh) { showError(); }
      });
  }

  function arrayOf(data, key) {
    if (!data || !Array.isArray(data[key])) {
      console.warn('printing: "' + key + '" is missing or not an array, treating it as empty');
      return [];
    }
    return data[key].filter(function (entry, index) {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        console.warn('printing: skipping malformed ' + key + '[' + index + ']', entry);
        return false;
      }
      return true;
    });
  }

  function validate(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('printer-data.json did not parse into an object');
    }
    var threshold = Number(data.low_stock_threshold_g);
    return {
      last_updated: isFilled(data.last_updated) ? String(data.last_updated) : null,
      low_stock_threshold_g: isFinite(threshold) && threshold > 0 ? threshold : 200,
      printers: arrayOf(data, 'printers'),
      filaments: arrayOf(data, 'filaments'),
      build_plates: arrayOf(data, 'build_plates'),
      nozzles: arrayOf(data, 'nozzles')
    };
  }

  function indexById(list) {
    var map = {};
    list.forEach(function (entry) {
      if (isFilled(entry.id)) { map[entry.id] = entry; }
    });
    return map;
  }

  /* ------------------------------------------------------------------ */
  /* rendering                                                           */
  /* ------------------------------------------------------------------ */

  function renderAll(data) {
    clearNotices();
    renderUpdated(data.last_updated);

    /* nothing in the file at all: one notice beats four empty sections */
    if (!data.printers.length && !data.filaments.length &&
        !data.build_plates.length && !data.nozzles.length) {
      showConstruction();
      return;
    }

    renderPrinters(data);
    renderPlates(data.build_plates);
    renderNozzles(data.nozzles);

    state.filaments = data.filaments.slice().sort(function (a, b) {
      return (String(a.material || '')).localeCompare(String(b.material || '')) ||
             (String(a.brand || '')).localeCompare(String(b.brand || '')) ||
             (String(a.color_name || '')).localeCompare(String(b.color_name || ''));
    });
    state.threshold = data.low_stock_threshold_g;
    renderChips();
    renderFilaments();
  }

  function renderUpdated(iso) {
    var date = parseDate(iso);
    if (!date) {
      dom.updated.textContent = 'who knows when';
      dom.updated.removeAttribute('datetime');
      return;
    }
    dom.updated.textContent = formatDate(iso, true) + ' (' + formatRelative(iso) + ')';
    dom.updated.setAttribute('datetime', iso);

    var ageDays = (Date.now() - date.getTime()) / (24 * 3600 * 1000);
    if (ageDays > STALE_AFTER_DAYS) {
      dom.stale.textContent = 'Heads up: I last touched this ' + formatRelative(iso) +
        ', so it might be out of date. Ask me before you count on it.';
      dom.stale.hidden = false;
    } else {
      dom.stale.hidden = true;
      dom.stale.textContent = '';
    }
  }

  function renderPrinters(data) {
    var container = dom.printers;
    var filaments = indexById(data.filaments);
    var plates = indexById(data.build_plates);
    var nozzles = indexById(data.nozzles);

    container.setAttribute('aria-busy', 'false');
    if (!data.printers.length) {
      empty(container, 'No printers listed right now.');
      return;
    }
    clear(container);

    data.printers.forEach(function (printer) {
      var status = STATUSES[printer.status] || UNKNOWN_STATUS;
      var card = el('div', { class: 'pcard' });

      card.appendChild(el('h3', {
        class: 'pcard-title',
        text: isFilled(printer.name) ? printer.name : 'Unnamed printer'
      }));
      if (isFilled(printer.model)) {
        card.appendChild(el('p', { class: 'pcard-sub', text: '// ' + printer.model }));
      }
      card.appendChild(badge(status.cls, status.glyph, status.label));

      if (isFilled(printer.status_note)) {
        card.appendChild(el('p', { class: 'pcard-note', text: printer.status_note }));
      }

      var percent = Number(printer.progress_percent);
      if (printer.progress_percent != null && isFinite(percent)) {
        card.appendChild(progressBar(percent, 'Print progress'));
        var progressText = Math.max(0, Math.min(100, Math.round(percent))) + '% done';
        if (isFilled(printer.eta)) {
          progressText += ', done around ' + formatDate(printer.eta, true) +
            ' (' + formatRelative(printer.eta) + ')';
        }
        card.appendChild(el('p', { class: 'pcard-line', text: progressText }));
      }

      if (isFilled(printer.booked_until)) {
        add(card, line('Booked until', formatDate(printer.booked_until, true)));
      }
      if (isFilled(printer.next_available)) {
        add(card, line('Available again',
          formatDate(printer.next_available, true) + ' (' + formatRelative(printer.next_available) + ')'));
      }

      var loadedFilament = filaments[printer.loaded_filament_id];
      if (loadedFilament) {
        card.appendChild(el('p', { class: 'pcard-line' }, [
          el('span', { class: 'pcard-label', text: 'Loaded: ' }),
          swatch(loadedFilament.color_hex),
          document.createTextNode(filamentName(loadedFilament))
        ]));
      }
      var loadedPlate = plates[printer.loaded_plate_id];
      if (loadedPlate) {
        add(card, line('Plate', loadedPlate.name || loadedPlate.surface));
      }
      var loadedNozzle = nozzles[printer.loaded_nozzle_id];
      if (loadedNozzle) {
        add(card, line('Nozzle', nozzleName(loadedNozzle)));
      }

      add(card, line('Build volume', dims(printer.build_volume_mm, 'mm')));

      container.appendChild(card);
    });
  }

  function swatch(hex) {
    var node = el('span', { class: 'swatch', attrs: { 'aria-hidden': 'true' } });
    node.style.backgroundColor = HEX_RE.test(String(hex)) ? String(hex) : FALLBACK_HEX;
    return node;
  }

  function filamentName(filament) {
    return [filament.brand, filament.material, filament.color_name]
      .filter(isFilled).join(' ') || 'Unnamed filament';
  }

  function nozzleName(nozzle) {
    var size = Number(nozzle.diameter_mm);
    var parts = [];
    if (isFinite(size) && size > 0) { parts.push(size + ' mm'); }
    if (isFilled(nozzle.material)) { parts.push(nozzle.material); }
    return parts.join(' ') || 'Unnamed nozzle';
  }

  function stockState(filament, threshold) {
    var grams = Number(filament.grams_available);
    var known = filament.grams_available != null && isFinite(grams);
    if (filament.in_stock === false || (known && grams <= 0)) {
      return { cls: 'badge-out', glyph: '✕', label: 'Out', fill: 'is-out', ok: false };
    }
    if (known && grams < threshold) {
      return { cls: 'badge-low', glyph: '⚠', label: 'Low', fill: 'is-low', ok: true };
    }
    return { cls: 'badge-in', glyph: '●', label: 'In stock', fill: 'is-full', ok: true };
  }

  function renderChips() {
    var materials = [];
    state.filaments.forEach(function (filament) {
      var material = isFilled(filament.material) ? String(filament.material) : null;
      if (material && materials.indexOf(material) === -1) { materials.push(material); }
    });
    materials.sort();

    clear(dom.chips);
    ['All'].concat(materials).forEach(function (label) {
      var value = label === 'All' ? null : label;
      var chip = el('button', {
        class: 'chip',
        text: label,
        attrs: {
          type: 'button',
          'aria-pressed': state.material === value ? 'true' : 'false'
        }
      });
      chip.addEventListener('click', function () {
        state.material = value;
        Array.prototype.forEach.call(dom.chips.children, function (other) {
          other.setAttribute('aria-pressed', other === chip ? 'true' : 'false');
        });
        renderFilaments();
      });
      dom.chips.appendChild(chip);
    });
  }

  function renderFilaments() {
    var container = dom.filaments;
    var threshold = state.threshold;

    var visible = state.filaments.filter(function (filament) {
      if (state.material && String(filament.material) !== state.material) { return false; }
      if (state.inStockOnly && !stockState(filament, threshold).ok) { return false; }
      return true;
    });

    if (!visible.length) {
      empty(container, state.filaments.length
        ? 'Nothing matches that filter.'
        : 'Nothing listed right now.');
      return;
    }
    clear(container);

    visible.forEach(function (filament) {
      var stock = stockState(filament, threshold);
      var card = el('div', { class: 'pcard' });

      card.appendChild(el('h3', { class: 'pcard-title' }, [
        swatch(filament.color_hex),
        document.createTextNode(isFilled(filament.color_name) ? filament.color_name : 'Unnamed colour')
      ]));

      var sub = [filament.brand, filament.material].filter(isFilled).join(' · ');
      if (sub) { card.appendChild(el('p', { class: 'pcard-sub', text: '// ' + sub })); }

      card.appendChild(badge(stock.cls, stock.glyph, stock.label));
      if (isFilled(filament.material)) {
        card.appendChild(el('span', { class: 'tag', text: filament.material }));
      }

      var grams = Number(filament.grams_available);
      var spool = Number(filament.spool_size_g);
      if (filament.grams_available != null && isFinite(grams)) {
        if (isFinite(spool) && spool > 0) {
          card.appendChild(progressBar((grams / spool) * 100,
            'Filament remaining', stock.fill));
          card.appendChild(el('p', { class: 'pcard-line', text: grams + ' g left of ' + spool + ' g' }));
        } else {
          card.appendChild(el('p', { class: 'pcard-line', text: grams + ' g left' }));
        }
      }

      var diameter = Number(filament.diameter_mm);
      if (isFinite(diameter) && diameter > 0) {
        add(card, line('Diameter', diameter + ' mm'));
      }

      add(card, note(filament.notes));
      container.appendChild(card);
    });
  }

  function renderPlates(plates) {
    var container = dom.plates;
    if (!plates.length) { empty(container); return; }
    clear(container);

    plates.forEach(function (plate) {
      var card = el('div', { class: 'pcard' });
      card.appendChild(el('h3', {
        class: 'pcard-title',
        text: isFilled(plate.name) ? plate.name : 'Unnamed plate'
      }));
      if (isFilled(plate.surface)) {
        card.appendChild(el('p', { class: 'pcard-sub', text: '// ' + plate.surface }));
      }
      card.appendChild(availability(plate.available));

      add(card, line('Size', dims(plate.size_mm, 'mm')));

      var tags = tagList(plate.good_for);
      if (tags) {
        card.appendChild(el('p', { class: 'pcard-line pcard-label', text: 'Good for' }));
        card.appendChild(tags);
      }

      add(card, note(plate.notes));
      container.appendChild(card);
    });
  }

  function renderNozzles(nozzles) {
    var container = dom.nozzles;
    if (!nozzles.length) { empty(container); return; }
    clear(container);

    nozzles.forEach(function (nozzle) {
      var card = el('div', { class: 'pcard' });
      var size = Number(nozzle.diameter_mm);
      card.appendChild(el('h3', {
        class: 'pcard-title',
        text: isFinite(size) && size > 0 ? size + ' mm' : 'Unknown size'
      }));
      if (isFilled(nozzle.material)) {
        card.appendChild(el('p', { class: 'pcard-sub', text: '// ' + nozzle.material }));
      }
      card.appendChild(availability(nozzle.available));
      card.appendChild(nozzle.abrasive_safe
        ? badge('badge-yes', '●', 'Abrasive safe')
        : badge('badge-no', '✕', 'Not for abrasives'));

      add(card, note(nozzle.notes));
      container.appendChild(card);
    });
  }

  function availability(available) {
    return available === false
      ? badge('badge-out', '✕', 'Unavailable')
      : badge('badge-in', '●', 'Available');
  }

  /* ------------------------------------------------------------------ */
  /* whole-page notices: load failure, and nothing-in-the-file-yet        */
  /* ------------------------------------------------------------------ */

  var NOTICE_SELECTOR = '.printing-error, .printing-construction';

  /* a later refresh that works should put the page back */
  function clearNotices() {
    var existing = root.querySelector(NOTICE_SELECTOR);
    if (existing) { existing.parentNode.removeChild(existing); }
    Array.prototype.forEach.call(dom.sections, function (section) {
      section.hidden = false;
    });
  }

  /* hide the empty sections and put one message in their place */
  function showNotice(cls, children) {
    Array.prototype.forEach.call(dom.sections, function (section) {
      section.hidden = true;
    });
    if (root.querySelector('.' + cls)) { return; }
    dom.header.appendChild(el('p', { class: cls }, children));
  }

  function showError() {
    showNotice('printing-error', [
      document.createTextNode(
        "Well, this is embarrassing. I couldn't load the printer list, so I " +
        'have no idea what to tell you. Try reloading, and if it is still ' +
        'broken then it is my fault, not yours. '
      ),
      el('a', { text: 'Email me', attrs: { href: '/info/contact' } }),
      document.createTextNode(' and I will answer the old fashioned way.')
    ]);
  }

  /* the data file parsed fine, there is just nothing in it yet */
  function showConstruction() {
    dom.stale.hidden = true;
    showNotice('printing-construction', [
      el('span', { class: 'construction-tag', text: '// under construction' }),
      document.createTextNode(
        "I haven't filled this page in yet. The printers are real, the list " +
        'is not here yet. Check back in a bit, or '
      ),
      el('a', { text: 'email me', attrs: { href: '/info/contact' } }),
      document.createTextNode(' and I will just tell you what I have.')
    ]);
  }

  /* ------------------------------------------------------------------ */
  /* wiring                                                              */
  /* ------------------------------------------------------------------ */

  if (dom.inStock) {
    dom.inStock.checked = false;
    dom.inStock.addEventListener('change', function () {
      state.inStockOnly = dom.inStock.checked;
      renderFilaments();
    });
  }

  loadData(false);

  if (AUTO_REFRESH) {
    setInterval(function () {
      if (document.visibilityState === 'visible') {
        loadData(true);
      }
    }, AUTO_REFRESH_MS);
  }
}());
