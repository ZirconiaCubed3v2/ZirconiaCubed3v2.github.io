---
title: "Google Search Console is a Headache"
date: 2024-02-20
description: "I finally got my blog to show up in a google search, but it was stupidly convoluted to do so"
keywords: google, search, console, domain, github, blog, website
---
&emsp;Hooray for me, I finally got this blog onto google, being a result after someone searches for 'zirconiac'. I do still have to figure out why my site icon isn't showing up in the results listing, but at least it's there now!  
  
&emsp;To do so, I had to register the domain first. Because google search console assumes you did it through a domain provider, it tells you to do stuff with the DNS records, which I couldn't do because I was working with a github-provided domain. Then after searching for a while, I found the option to upload a google-provided verification file to the root of the repo, and it could finally verify that the site was mine. Then, I had to get the pages indexed. Thankfully, the sitemap was recognized just fine, but for some reason, it isn't auto-indexing the pages in the sitemap. Instead, I have to go to each page in the url inspection thinger, and request indexing on each page manually. Sure, it's not that hard, but it would kinda be nice to make a post, then a push request, then just let google do its thing.  
  
&emsp;Anyway, now I have to add some meta tags to my page layouts to control how it looks in google search, because right now, the page descriptions are a little messed up because it's just pulling it straight from the html of the page.
&nbsp;  
&nbsp;  

Still hanging in there,    
<img src="https://github.com/ZirconiaCubed3v2/ZirconiaCubed3v2.github.io/blob/main/_images/sig.png?raw=true" alt="signature" style="width:250px;"/>
