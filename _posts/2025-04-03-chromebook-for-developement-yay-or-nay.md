---
title: "Chromebook for Development: Yay or Nay?"
date: 2025-3-4
description: "I tried using an underpowered chromebook for developement and it kinda worked"
keywords: chromebook, developement, chromeos, dev mode, chromebrew, crew, crosh, sh1mboot, sh1mmer, rma, shim
thumbnail: data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=
---
<h2 id="heading">Should You Use a Chromebook for Developement?</h2>
Well, that's what we all want to know, isn't it? Can a computer that retails for $320 brand-new and runs the abomination that is chromeos be good for programming? Well, I can say that after using it for just that for a while, it isn't too bad and can be a good buy in a pinch. In this post, I'll talk about the chromebook I bought, and how I made it useable for a power user.  
  
<h3 id="heading">The Chromebook in Question</h3>
First, let's talk about what chromebook I got. After looking for a while, I found an Acer C734 for $320, and I chose it because I think it provides a good overview of the lower-end chromebooks. Here's the hard specs for those nerds who want to know:  
- Intel(R) Celeron(R) N4500 @ 1.10GHz (2 threads, 2.80GHz)
- 4GB LPDDR4X RAM
- 32GB eMMC Storage
- Intel UHD Graphics
- 11.6" 1366x768 LCD Touchscreen
- 4590mAh battery
- Bluetooth 2.0, Intel Wi-Fi 6 802.11ax  
  
<br>
<h3 id="heading">ChromeOS or Linux?</h3>
Now we need to talk about something very important. Should you run ChromeOS on it, or install RW\_LEGACY firmware and use linux? Well unfortunately, I ran into many technical errors getting RW\_LEGACY firmware onto my chromebook (for the uninitiated, RW\_LEGACY firmware allows chromebooks to boot normal UEFI oses), so I had to resort to <a href="https://shimboot.ading.dev" target="blank noopener noreferrer">sh1mboot</a>, which is a beautiful program that utilizes the recovery mode exploits found in the <a href="https://sh1mmer.me" target="blank noopener noreferrer">SH1MMER</a> project to boot debian off of an external storage device without modifying the firmware or OS of the chromebook. You can read how these exploits work on their websites. Using sh1mboot, I booted the prebuilt debian image for my board, and it worked pretty well. Internal audio support was off the table because of drivers, and sleep mode was also not an option because of the finnickiness of the recovery mode environment. Other than those two very vital flaws, it worked pretty well. Until I wanted to install some programs that needed to, say, rebuilt the initramfs, or install a new kernel module. Since the chromeOS kernel and initial ramdisk can't be modified when booting with sh1mboot, this is kinda where all the good stuff to say about linux in this form ends. I love my buddy linux, but sometimes, it just wasn't meant to be.  
  
<br>
Flipping back to the original OS, there is some untapped potential to be had. Crostini, the integrated linux container, is pretty good at its job, but I just couldn't be satisfied with the VM-ey nature of it. It was slow, and separated, where I wanted a system that ran on bare metal. After, I tried crouton, which is a community-made script to make the creation and management of <a href="https://en.wikipedia.org/wiki/Chroot" target="blank noopener noreferrer">chroot</a> environments easier. Chroot is essentially just running a linux system inside another linux system, but without VM architecture or virtualization (or dockerization). I've used crouton before many times, but this time I just couldn't get it to work, mainly because I didn't have the storage space for it (32GB eMMC, remember?), and the installation itself wasn't working because I couldn't remount /tmp with executable flags, which was paramount for the installation to work. I thought I was out of options, until the clouds parted and out fell <a href="https://chromebrew.github.io" target="blank noopener noreferrer">Chromebrew</a>.  
  
<br>
Chromebrew is a port of Brew for ChromeOS, and Brew is pretty much a distro-agnostic package manager for Unix systems. I had to switch into developer mode for it to work, so I could get the crosh shell, but that was fine by me. Keep in mind, when switching between developer and stable mode, _ALL OF YOUR DATA WILL BE ERASED_. After I did that, though, I got Chromebrew installed with the one-liner on their website, and it worked perfectly first try. I was able to install packages on bare metal ChromeOS (get it, cuz chrome is metal) without any virtualization, chrooting, or other shenaneganizing of any sort. I did need to finnick a little bit with some environment exports to get some GUI apps running, but now I can say that my main browser on ChromeOS is Brave, just to stick it to Sundar Pichai. In fact, this whole post was written on said chromebook using nvim in the crosh terminal, and it works perfectly for my needs.  
  
<br>
<h3 id="heading">Conclusions</h3>
The chromebook is a pretty good little device for some light programming and power-usering, especially since I bought a very low-end chromebook and was just fine. Many chromebooks these days have reasonable specs and can be very snappy, especially when running the native OS. Now here's the big question: Do I recommend this? No. Not at all. If you need a cheap computer for programming, don't get a chromebook unless you cannot live without Google being up your ass 24/7. Just get a second-hand laptop like a Thinkpad for cheaper than the chromebook, and it will probably have more power, and not be saddled with the obligatory OS that takes a lot of work to not use or replace with something else. That being said, don't put the chromebooks down, they're fascinating little machines if you give them the tools to stretch their legs.
&nbsp;  
&nbsp;  

Chromebooks, am I right?  
<img src="https://github.com/ZirconiaCubed3v2/ZirconiaCubed3v2.github.io/blob/main/_images/sig.png?raw=true" alt="signature" style="width:250px;"/>
