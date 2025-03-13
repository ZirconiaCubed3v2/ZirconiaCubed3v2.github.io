---
title: "The Definitive Jetson Nano Plex Guide"
date: 2024-3-19
description: "I posted about putting plex on a jetson nano a while ago, so here's an actual description of the setup"
keywords: jetson, nano, plex, guide, server, nvidia, armbian
---
<img src="https://raw.githubusercontent.com/ZirconiaCubed3v2/ZirconiaCubed3v2.github.io/refs/heads/main/_images/2024-03-19-plex-jetson.png" alt="the plex logo above a jetson nano" width="40%">
A while ago (more than a month to be more exact), I said I was working on a jetson nano plex server. If you don't know what a jetson nano is, it's basically nvidia's go at a raspberry pi clone, but of course, they threw a gpu in it, so it's better than raspberry pi's at video transcoding and AI acceleration. For some reason, they stopped production on the carrier board, which is what makes is usable for most non-embedded applications. The carrier board adds usb ports, video output, and ports for power, and an M.2 slot (which will come in handy later).  
  
I originally wanted to use the ubuntu image nvidia provides, which comes with the jetpack sdk, so it has the custom kernel with support for the gpu (which is a Tegra-X1) and drivers, and tensorflow libraries that were specifically built with cuda support for the gpu. Unfortunately, the version of ubuntu they ship is based on 18.04 Bionic Beaver, which is an LTS version, but I had so much trouble getting it to work. Mainly because some of the libraries required for things to work were way too old, like libc. Libc was a really big problem. So, I switched to Armbian.  
  
Armbian is an open-source version of debian made for ARM-based devices. There's community support for the jetson nano, but strangely, the latest bookworm image simply didn't work. I could not get it to boot at all whatsoever. So, I got the next latest working image, the bullseye one, and ran through the bullseye->bookworm upgrade process. That worked pretty well, but I couldn't upgrade the kernel because it wouldn't build properly, but that's fine, I don't really need the latest kernel for something like this. The only problem I have with armbian is that no matter what I do, it doesn't recognize the thermal zones, so I can never know how hot it's running. And, plex doesn't recognize the nvidia gpu, so it's not actually used for the transcoding.  
  
With Armbian working (mostly), I installed plex, and it was a breeze. Then when it came to storage, I got a WD Black 2TB NVMe, and attached it with a usb-c enclosure. It didn't even occur to me that I could've just bought a different form factor and used the M.2 slot on the board, which also probably would've been faster. But, it's too late for that now, I already bought it.  
  
And, that's basically it! That is the entire process I went through to get a plex media server running on my jetson nano. It took a ridiculous amount of time to get it working, as anything does on one of these infernal little computers. But I did learn a lot about how plex works and some more about the internal workings of linux. If you want to learn how to troubleshoot a project, I strongly recommend you try to do something like this. If not, maybe just follow another guide on a raspberry pi 4 or something.
&nbsp;  
&nbsp;  

If buying isn't owning, pirating isn't stealing,    
<img src="https://github.com/ZirconiaCubed3v2/ZirconiaCubed3v2.github.io/blob/main/_images/sig.png?raw=true" alt="signature" style="width:250px;"/>
