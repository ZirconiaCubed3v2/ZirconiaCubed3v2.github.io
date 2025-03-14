---
title: "The Nvidia Jetson Nano: A Very Good Little Server"
date: 2024-02-07
description: "I found an Nvidia Jetson Nano and turned it into a very useful home server"
keywords: jetson, nvidia, nano, server, plex, ubuntu, home
thumbnail: data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=
---
&emsp;I found an Nvidia Jetson Nano in the junk pile that is my house, and I've been having some fun with it. The Nvidia Jetson Nano (referred to as Jetson from now on, the whole name is annoying to type out each time) is a raspberry-pi-ish computer, but made by Nvidia. It has an ARMv8 64-bit Cortex Processor, and an Nvidia Maxwell L4T GPU (yes, it has an actual gpu). It's not very powerful, but that gpu makes it better for things like video processing and AI, but I haven't really done much with the AI side yet.  
  
&emsp;To start, I made a plex server from it, which works pretty well, but it was kinda painful to transfer the several hundred gigabytes of video from my previous plex server, because it was across the city connected through a ZeroTier VPN, so the connection wasn't exactly fast (about 10mbps). I also installed deluge on it so I can have torrents downloading on it when I'm not at home or doing something else on my laptop. I attached an external 1TB hard drive to it with the usb 3.0 ports on it, so I have a terabyte of storage on it now, making it a file server as well. I also installed PiTunnel on it so I can monitor it and keep an eye on things without having to start up an ssh connection or even be on the ZeroTier VPN.  
  
&emsp;The one thing I have a problem with is that the image of ubuntu Nvidia provides for it is Ubuntu 18.04 Bionic Beaver, and it's kinda old, but I can't update it because that breaks a lot of the pre-installed L4T drivers and stuff like that. I can't even switch out the display manager, because I tried that with KDE Plasma, and it did not agree with it, so I had to reflash the SD card.
&nbsp;  
&nbsp;  

Pirate everything and don't take no for an answer,  
<img src="https://github.com/ZirconiaCubed3v2/ZirconiaCubed3v2.github.io/blob/main/_images/sig.png?raw=true" alt="signature" style="width:250px;"/>
