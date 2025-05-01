---
title: "The JetKVM: A Wonderful Device"
date: 2025-05-01
description: "The JetKVM is one of the best little tech gadgets I have ever used"
keywords: jetkvm, kvm, server, keyboard, video, mouse, cloud, ota, remote management
thumbnail: https://raw.githubusercontent.com/ZirconiaCubed3v2/ZirconiaCubed3v2.github.io/main/_images/2025-05-01-jetkvm.png
---
<h2 id="heading">The JetKVM</h2>
I don't even have a good title for this article because I couldn't think of anything short and to the point for how good the JetKVM is.
It is one of the most useful little tech gadgets I think I have ever had the privilege of owning, and I will be buying more promptly.  

<br>
<h3 id="heading">What is it?</h3>
The JetKVM is an IP-KVM, which is a device that streams a KVM connection over the network. KVM, meaning keyboard-video-mouse, is a way to control a computer, remotely or locally.
You might have heard of a KVM Switch, which is similar, however where a KVM switch allows multiple computers to be controlled using one keyboard-monitor-mouse pair, the JetKVM connects to one computer and allows you to control it from another computer on the network via a handy web interface.
<br><br>
Starting with the hardware, it has a little color touchscreen on the front, which displays the IP, USB and HDMI status, number of active connections, and device MAC address for DHCP reservations. Currently the device only runs on DHCP, but there is a <a href="https://github.com/jetkvm/kvm/issues/37#issuecomment-2622197252" target="_blank" rel="noopener noreferrer">script-y workaround</a>.
On the back, there is an RJ-45 port for networking, a mini-HDMI port for video in, an RJ-12 expansion port (which I will discuss later), and a USB-C port for power in and USB out to the remote host. If the remote host can supply a good, steady voltage through USB, you can connect the JetKVM with a single cable, but if you are performing power operations that could cause the port to turn off, or the device doesn't supply enough power, the JetKVM comes with a USB-C splitter cable, which will split the port into separate data and power ports for you to connect external power.
<br><br>
Moving on to the software, it runs a custom version of Linux with BusyBox, and a DropBear SSH server for interacting directly with the OS, which is also available through the Web Console developer feature.  

<br>
<h3 id="heading">Features, Features, Features!</h3>
The JetKVM isn't a feature-loaded gizmo, but it does have some very good ones. I'll look at each one in turn, going down the list of major ones:
* Remote Disk Mount
* BIOS Entry
* JetKVM Cloud
* Extension Boards
* Wake-on-LAN

<br>
<h3 id="heading">Remote Disk Mount</h3>
The JetKVM has the ability to mount a virtual disk onto the host through the 'Mount Drive' feature. It allows the user to use a pre-existing disk image, a url for a disk image (currently the only supported option), or stream a local disk image directly from the user's browser, and mount it onto the remote host as if a flash drive or CD/DVD drive were present.
It can emulate either a USB storage device such as a flash drive, or a CD/DVD drive for legacy boot images like Windows XP that require boot from a CD or DVD.
This has incredible implications that I have tested, such as being able to boot live images like GParted or live Linux from across the network without being physically interacting with the server. 
It also means you can plug a single USB device in, and have access to an infinite number of bootable images, rather than the one that burning a disk or flash drive would get you.  

<br>
<h3 id="heading">BIOS Entry</h3>
Since the JetKVM is a device independent from the remote host, it can be used to enter and edit BIOS settings, which would usually need to be done when physically connected to the server.
I can't even say how many times I have had to wait days before I was able to get in front of a physical server to edit the BIOS settings, while this device allows me to do it remotely.  

<br>
<h3 id="heading">JetKVM Cloud</h3>
This feature is my favorite of the JetKVM. You might be thinking, "If it's accessible through the LAN, won't I need to do some annoying port-forwarding or tunnelling to access it outside the local network?"
Well, you're wrong! The JetKVM team has made what they call the 'Cloud Dashboard', which is a place you can register your JetKVM to your account, and access it from anywhere, no tunnelling or port-forwarding required!
After rigorous testing, I can say it is one of the best-running remote-access-through-the-internet applications I have ever used, running at a consistent 60fps, and giving me the ability to adjust the video stream quality manually or automatically.
The latency isn't much of a problem, which greatly surprised me, as it is usually a gigantic problem with remote access systems that go through the Internet.  

<br>
<h3 id="heading">Extension Boards</h3>
The JetKVM team added an expansion port in the form of an RJ-12 port, the pinout of which is listed <a href="https://jetkvm.com/docs/peripheral-devices/extension-port" target="_blank" rel="noopener noreferrer">on their website</a>.
They're going to make the source core open-source in December when the devices start to ship for production, but they have made 3 of their own boards:<br>
<h4 id="heading">The ATX Power Control Board</h4>
This board has a pin header at the end of the PCB which connect to the front-panel pins on a computer's motherboard so the JetKVM can control power functions such as pressing the power button.
I didn't get one of these, but I will as soon as I remember to do so, as this board alone makes it the best IP-KVM I have ever heard of, and before I heard of the JetKVM, I was thinking of making my own remote power-control system with relays and complicated electronics, but this greatly simplifies it.
<h4 id="heading">The DC Power Control Board</h4>
This board has a DC jack for power in, and one for power out, and can control a DC power supply for things such as mini-PCs, and also supplies power to the JetKVM itself.
<h4 id="heading">The Serial Console Board</h4>
One of the newer boards, it connects to the JetKVM and provides access to a serial console connection, allowing remote control of devices such as network switches, enterprise servers, microcontrollers, etc.  

<br>
<h3 id="heading">Wake-on-LAN</h3>
The JetKVM has the ability to send a Wake-on-LAN packet to any device on the same network, allowing a single JetKVM to wake any number of devices. I can't say I've tested or used this feature because I don't have any WoL devices, but it seems like it could be useful in a number of different scenarios.  

<br>
<h3 id="heading">Conclusion</h3>
The Kickstarter project has gained so much support that they have plenty of money to move forward with full production, keeping the same price of $69(nice), which is, in my opinion, a perfectly fine price for such a good piece of tech.
All in all, the small form factor paired with the incredible build quality and functionality, this device is already pulling its weight in my homelab, and I love it. My recommendation: buy one, if you need one.
&nbsp;  
&nbsp;  

I don't have a witty remark for the end of this post,  
<img src="https://github.com/ZirconiaCubed3v2/ZirconiaCubed3v2.github.io/blob/main/_images/sig.png?raw=true" alt="signature" style="width:250px;"/>
