---
title: "An introduction to UNIX pipes"
preview: "Pipes are a way for two ore more processes to communicate data. Let's see how to use them in C!"
date: "2021-07-23"
author: "Aurélien Brabant"
---

![](mario_pipes.png)

Communication between programs is crucial, and is one of the topic any novice
programmer needs to face at some point. On an UNIX system, one easy way of
sharing data is to use pipes.

Pipes are often considered as a difficult topic when tackled by beginners, but
in fact this is probably the easiest way to do inter-process communication on an UNIX based operating system.

This article aims to explain clearly what pipes are and how to use them in C, in a concise and clear way.
First we're going to talk about what pipes are and why they are useful (which problem do they solve?), and we'll
finally implement a really simple C program making use of these.

# Inter process communication

## What is Inter Process Communication (IPC)

In computer science, a *process* is an instance of a program which is executed
by the CPU, making use of several pieces of the computer's hardware.

For example, when you run any command from a terminal, such as, let's say,
`ls`, then a process is created and the code written for the `ls` utility
is executed, inside a process that has a given identifier (PID).

In the case of `ls`, the code is really short, so the process does not have
a really long lifetime, but most processes on your computer are actually
constantly running, performing tasks that are essential to the operating
system.

Sometimes, different processes that are part of a single application (but not necessarily) may want to communicate
informations to each other. However, because the code and memory section of each process is absolutely separated from each other,
this communication can't be achieved naturally. This is the problem of *inter communication* between processes.

## Forms of inter process communication

Fortunately, operating systems provides ways to actually perform IPC without any problem.
Below are some of them:

- sockets
- shared memory
- pipes

These different ways all have their pros and cons, but in this post, we'll
concentrate on pipes which are really handy for doing simple IPC.

# The pipe IPC mechanism

## A quick reminder about file descriptors

When using pipes on an UNIX system, we'll need to manipulate what we refer to as
file descriptors. File descriptors, often abbreviated **fd**, are small integer
values that are **local to a process** and that **refer** to a file or a special device
on the operating system.

As you may know, each time a process is created when running a command from the command line,
three of them are automatically bound to the process:

![](fd_inheritance.png)

As we said before, file descriptors are local to a process, which means
that each process has its own set of file descriptors. However, it is perfectly
possible and expected that these file descriptors refer to the same underlying
operating system object (which is, in most cases, either a file or the terminal emulator device itself).

### More about default file descriptors

Default file descriptors automatically made available to any program are usually
0 (standard input), 1 (standard output) and 2 (standard error).

Each one of these refer to the terminal emulator object, allowing to interact with it in a special way.
Because they are bound to it, any write operation performed on fd 1 or 2 is going to print output on
the terminal, while any read operation done on fd 0 will ask input to be provided from the terminal.

### File descriptor limit per process

The number of file descriptors a process can open through the `open` system
call is limited to a given number. It is therefore really important to **never
waste any file descriptor** as it is a limited resource on the system.

The number of file descriptor a process can open on an UNIX based operating
system can usually be obtained using the `ulimit -n` command.

```bash
$ ulimit -n
256
```
Note that this number **includes** the three default file descriptors, therefore
a program can generally open `n - 3` file descriptors, where `n` is the result
given by `ulimit -n`.
