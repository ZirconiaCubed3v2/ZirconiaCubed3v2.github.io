---
title: "The Problems with Linux"
date: 2026-02-06
description: "Linux is good in many ways, but I'm here to discuss why it isn't"
keywords: linux, switch, migrate, toxic, terminal, cachy, cachyos
thumbnail: https://raw.githubusercontent.com/ZirconiaCubed3v2/ZirconiaCubed3v2.github.io/main/_images/2026-02-06-tux-red-eyes.png
---
<h3 id="heading">What Even Is Linux?</h3>
Linux. It's what the Internet runs on. But what is Linux? According to Linus Torvalds, the credited creator of Linux,
> "Linux is just a kernel. It's the part of the operating system that handles the hardware and the resources. It's the part that makes everything else possible."

So, yes, the annoying jerks you find on forums babbling about "Erm, actually, it's Linux/GNU" are correct, but that's not the point. Nobody calls it Linux/GNU because it's implied that when you have Linux, it's paired with GNU tools.
<br><br>
Another often misinterpreted term is 'distribution' or the shortened 'distro'. A Linux distro is simply a set of configurations and extra packages stacked on top of a root version of Linux, such as Debian, Arch, Red Hat, etc.
<br><br>
Distros can even be based on other distros, for example, Mint is based on Ubuntu which is based on Debian. Sound complicated yet? If you really want to dig into the history and family tree of Linux, here's a <a href="https://en.wikipedia.org/wiki/List_of_Linux_distributions#/media/File:Linux_Distribution_Timeline.svg" target="_blank" rel="noopener noreferrer">timeline on Wikipedia</a> detailing just that.  

<br>
<h3 id="heading">'Normal' User Problems</h3>
When I say 'normal' users, I mean people who switch over from Windows or MacOS because they're tired of them, and want an operating system that just works. They're not the tinkering type, and they don't to spend hours modifying configuration files and creating custom scripts.
<br><br>
This user base has been steadily growing since the enshittification of Windows 11, and I think it's important to look at Linux from their point of view as well, not just the elites.
<h4 id="heading">The Choices</h4>
The sheer number of Linux distros is insane. There's a lot of debate as to exactly how many active distros there are, but it seems to be the consensus that there are at least 500, with new ones popping up every day, given that it's just a set of packages and configurations and literally anyone can make one.
<br><br>
This makes it incredibly difficult for the average user to choose one, and it's made even worse by the fact that the differences between some are on the more technical side, and don't actually affect the average user if they're not going to tinker with it. 
<br><br>
For example, one operating system often suggested for 'performance' is CachyOS. It uses specially-made kernels with small optimizations and tweaks, and uses high-performance components to squeeze as much speed out of the user's computer.
<br><br>
Benchmarks against CachyOS do show that, but 'faster' is a bit subjective. Sure, it goes faster, but in most use cases and to most users, it's so insignificant that it wouldn't be much of a loss to go with another distro instead.
YouTuber <a href="https://www.youtube.com/@PhazerTech" target="_blank" rel="noopener noreferrer">Phazer Tech</a> recently posted a <a href="https://youtu.be/Wc92Y9_90BI" target="_blank" rel="noopener noreferrer">video</a> benchmarking three popular distros said to have higher-than-average performance, CachyOS, EndeavourOS, and Kubuntu, against Windows 10 in different gaming scenarios.
<br><br>
In some situations, CachyOS did indeed edge ahead by 1-3 FPS, but that could be considered random unavoidable error, especially when the numbers were >100 FPS. Does that mean CachyOS lied? Absolutely not. Their optimizations do improve performance, but it's such a small bump most average users wouldn't notice.
<h4 id="heading">The Terminal</h4>
One of the major gripes about people wanting to migrate away from Windows or MacOS to Linux is their fear of the terminal. While the terminal can be difficult for some people to grasp, and others don't even want to touch it, there are many distributions actively trying to minimize that issue through handy GUI apps.
<br><br>
For example, Mint, which is very popular for people who want a stable experience, has apps such as a software center, system settings, and user management, all without even opening the terminal.
<br><br>
Don't misunderstand me, though, this is definitely not a non-issue. For some problems, like broken packages, the terminal is the only option, so someone who doesn't know how to use it or isn't very tech-savvy is stuck in the dark with a broken OS and has to turn to forums for help, which is one of the worst options for a new user.  

<br>
<h3 id="heading">The Community</h3>
Now for the worst part of Linux: the people. Having been in a lot of forums and observed live conversations through various Discord servers, I can say the Linux community is one of the most toxic and gate-kept groups of people I have ever had the displeasure of being a part of. Everyone has their own opinions, but it seems like with Linux nerds, their own opinions are the only ones that are correct, even if the issue is completely subjective.
<br><br>
Distro choice is one of the preferences that gets the most backlash, usually for completely unfounded reasons. Again, I will say that there are people who don't want to do the whole Linux thing: no fancy custom desktop environment configurations, no terminal, none of that. It seems like most elite Linux users don't seem to understand that, as I have seen many situations where a non-tech-savvy person wants to switch away from Windows, and the Linux bros tell them to use something like Arch and install it from scratch. This is probably the exact opposite answer they should be giving.
<br><br>
The other common aspect of the Linux kind is that they are constantly arguing about which thing is better. If one user has a package or program they like, then of course that means everything else sucks and people who think anything else is good are idiots. This is one of the driving forces of most debates in Linux forums and Discord channels, and is honestly very tiring to read. Most of the time, they involve people who either don't actually know why one thing is better than the other, or there isn't a reason one is better than the other and it just comes down to personal opinion, which, of course, yours is wrong.
<h4 id="heading">Side Quest: Bloat</h4>
I want to take a moment to discuss the word 'bloat'. So many people use this to refer to packages or programs that are not required for functioning, but often come pre-installed anyway. THIS IS NOT THE CORRECT DEFINITION.
<br><br>
A more correct definition is specifically unrequired and <strong>_unwanted_</strong> software that takes up system resources such as disk space, CPU cycles, or RAM, and comes pre-installed.
<br><br>
One outrageous statement I saw the other day was: 'Mint is too bloated'. I did a double-take there because I wasn't sure I read that correctly. Linux Mint, one of the foremost user-friendly and lightweight operating systems, was _BLOATED_?? Sure, it comes with some extra stuff like LibreOffice and HexChat, but they're fairly out of the way if you don't want to use them, and combined, they take up no more than 2GB of disk space out of 20GB recommended space, according to the <a href="https://linuxmint.com/faq.php" target="_blank" rel="noopener noreferrer">Linux Mint FAQ</a>.
<br>
<br>Keep in mind that Windows take up about 32GB of space with a fresh install.  

<br>
<h3 id="heading">Unjustly Hated Components and Distros</h3>
These are some distros, packages, programs, and system components that I've seen get a lot of flack for either user error or some other unjustified reason.
<h4 id="heading">SystemD</h4>
SystemD is one of the most hated init systems and service managers in my experience, and I've never known why. People have said that it's monolothic, which means if it fails basically the entire operating system fails, but that's not SystemD's problem, that's just how a service manager works.
<br><br>
There are distros that strive not to use it, such as Artix, Alpine, AntiX, and Slackware, opting for alternatives like OpenRC, runit, and SysVinit. The main problem comes back to the ideology that if one person likes something, everything else sucks. I have observed so many arguments that someone uses a SystemD system, and another person ridicules them for it because they think SystemD is bad. Mind your own damn business.
<h4 id="heading">Manjaro</h4>
Many people say that Manjaro is an unstable distro and breaks all the time. I am aware I am just one person, but I ran Manjaro for 2+ years with no problem, and I wasn't light with it either. I never had any package problems, file corruption, random breaks, nothing. I would love to know what some people are doing to their systems to cause frequency breaks of a perfectly stable system.
<h4 id="heading">Ubuntu</h4>
This one is a little more tentative, as I don't really like Ubuntu. Ubuntu is a perfectly fine distro, although it is going a little off the corporate deep end due to Canonical's attempt at monetization with Ubuntu Pro. The other problem with it is snap, but you can just evade that if you don't want to use it. A few system components run on it, but they'll stay out of your way if you don't touch it.
<h4 id="heading">GNOME</h4>
GNOME is a window manager that is often hated because of the simplicity. There isn't a task bar like most window managers, menus are extremely simplified, and the interface is often likened to a tablet UI rather than a desktop experience. I don't like GNOME either, but it isn't a hate more than an 'I don't like how it looks'. For the average user who wants something that just works, GNOME is perfectly fine.

<br>
<h3 id="heading">Final Thoughts</h3>
There are a lot of things that could deter the average person from using Linux, from the toxic user base to the daunting choices of distros, but I still think it's worth doing to get away from MacOS's hardware lock and Windows's growing AI push and monetization practices. To be frankly honest, in all my years using Linux, I find it's better to just ignore the suggestions of people and do your own research. There's tons of unbiased articles out there detailing the pros and cons of different distros and programs, so you don't ever have to talk head-on with a Linux cronie.
&nbsp;  
&nbsp;  

Good luck and happy Linux-ing,  
<img src="https://github.com/ZirconiaCubed3v2/ZirconiaCubed3v2.github.io/blob/main/_images/sig.png?raw=true" alt="signature" style="width:250px;"/>
