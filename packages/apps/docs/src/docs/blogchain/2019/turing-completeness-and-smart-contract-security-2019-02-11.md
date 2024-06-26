---
title: Turing Completeness and Smart Contract Security
description:
  At Kadena, we talk a lot about blockchain design decisions. One particularly
  profound design decision that I’ve come across recently revolves around the
  property of Turing completeness, which sparked debate in a recent post by one
  of our developers. As a non-technical member of the team, I wanted to learn
  what Turing completeness actually means, why the blockchain community seems to
  be divided on the matter, and why our engineers are working hard to educate
  others on its drawbacks for safe smart contract programming.
menu: Turing Completeness and Smart Contract Security
label: Turing Completeness and Smart Contract Security
publishDate: 2019-02-11
headerImage: /assets/blog/1_c2IEMI9RU0GCsulsUkl-8w.webp
tags: [smart contract, pact]
author: Taylor Rolfe
authorId: taylor.rolfe
layout: blog
---

# Turing Completeness and Smart Contract Security

At Kadena, we talk a lot about blockchain design decisions. One particularly
profound design decision that I’ve come across recently revolves around the
property of **Turing completeness**, which sparked debate in a
[recent post](/blogchain/2018/the-evm-is-fundamentally-unsafe-2018-12-13) by one
of our developers. As a non-technical member of the team, I wanted to learn what
Turing completeness actually means, why the blockchain community seems to be
divided on the matter, and why our engineers are working hard to educate others
on its drawbacks for safe smart contract programming.

What follows is a brief summary of my exploration to demystify and understand
this core property of smart contract security. So if you’re somebody like me who
is captivated by the development of blockchain systems, and particularly smart
contract languages, then hopefully this story will improve your understanding of
how Turing completeness impacts smart contract security.

### The Turing Machine Leads to Turing Completeness

In the 1930’s, Alan Turing built the concept of a Universal Turing Machine. Note
that the Turing machine is different from the device used to solve the Enigma
code during WWII. That was called the Bombe machine. The Turing machine is
actually a theoretical device, a mathematical model of computation that
describes the most powerful mechanical computer that we know how to build to
this day.

So what is the relationship between the Universal Turing Machine and smart
contracts?

It comes down to something called “Turing completeness,” which is a property
used to describe programming languages that can be used to simulate a Turing
machine. In fact, the vast majority of programming languages that exist are
Turing complete. The most well-known example of a Turing complete smart contract
machine is the Ethereum Virtual Machine
([EVM](https://github.com/ethereum/wiki/wiki/Ethereum-Virtual-Machine-EVM-Awesome-List)).

> “A programming language that is Turing complete is theoretically capable of
> expressing all tasks accomplishable by computers; nearly all programming
> languages are Turing complete if the limitations of finite memory are
> ignored.” -Wikipedia, Turing Machine

So what does this actually mean in practice? Is it good or bad for a programming
language to be able to express every computable algorithm?

At first, this sounds like a great and powerful property. There are certainly
benefits to a smart contract language being universally applicable and flexible
for building any type of application. Let us consider the implications.

### Turing Completeness Applied to Blockchain Smart Contracts

Unfortunately, I am not a thought leader in the field of smart contract design,
so I turned to the internet for guidance. Preliminary research returned wholly
unhelpful answers from StackOverflow like
[this](https://stackoverflow.com/questions/7284/what-is-turing-complete) or
in-depth papers on Turing machines like
[this](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf). Neither of
which examine the property in question through the context of programming smart
contracts.

Fortunately, I had the privilege of asking a highly qualified and leading
resource on the subject, [Emily Pillmore](https://twitter.com/emi1ypi) who is a
senior programmer with Kadena. I asked her, “**What is the difference between
Turing completeness and Turing incompleteness in the context of blockchain?**”
Her response:

> “Turing incompleteness doesn’t really have much to do directly with
> blockchains. It is a property of abstract rewrite systems in computer science
> that ensures that all expressions in the system can be expressed in a normal
> form (i.e. can be reduced)… Turing incompleteness manifests as expressions in
> a language which are irreducible.”

And that’s only a fraction of the full answer! The remainder of the response is
equally impenetrable to someone like me. I asked a “How-does-this-thing-work”
question and got a comprehensive and technical answer. Fair enough. So I thought
I’d come at the problem from a different angle. Maybe if I ask a
“What-can-this-thing-do” question, then I’ll get a more concrete picture of its
behaviors.

I asked, “**Are there examples of things you can do with Turing completeness
that would be useful on the blockchain?**” Emily’s answer:

> “No. **I cannot come up with a single use-case for the blockchain that
> requires Turing completeness**. The EVM does not use any of the properties of
> Turing completeness because it restricts all recursion via the gas model
> anyway, which enforces that recursion either terminate prior to gas running
> out, or terminate the program _when_ gas runs out. So in effect, the EVM’s gas
> model sort of simulates Turing incompleteness, but not really. This is why I
> say they adopt all the flaws of Turing completeness (side effecting, illegible
> and unreasonable code, arbitrary looping), but use none of its benefits (no
> infinite recursion allowed).”

Aha, this I can follow! When you have the power to do more things, it also means
that more things can go wrong. Turing completeness is inherently more powerful,
but if you can’t utilize the benefits of that power, then you’re needlessly
exposing yourself to more attack vectors due to the increased surface area that
comes with so many additional features.

To further clarify the distinguishing characteristic:

- Turing complete languages always have a form of conditional repetition or
  conditional jump (while, for, goto)

- By their design, blockchains will always stop these endless loops with
  mechanisms like gas.

- Therefore, Turing completeness carries with it an unnecessary and burdensome
  attack surface. It is high risk, with low reward, as illustrated below.

![Approximation of the “dead weight” attack surface inherited when using Turing complete languages for smart contract programming.](/assets/blog/1_FcimFYnyvEeK8wULm3lCkg.webp)

At the time of publishing, there are 16 known
[attack vectors](https://github.com/sigp/solidity-security-blog) on Solidity,
the most popular domain-specific programming language for smart contracts, which
happens to be Turing complete. If Solidity were Turing incomplete, then the most
costly of these attacks would not even be possible. Most notably, the
[DAO attack](https://medium.com/swlh/the-story-of-the-dao-its-history-and-consequences-71e6a8a551ee)
in 2016 — a reentrancy attack, enabled by Turing completeness — drained 3.6M ETH
(~$50M USD) from the fund, resulting in the Ethereum community hard-forking the
entire network to restore their preferred version of history. More recently in
2019, there was a pause on the Constantinople upgrade as it introduced a
[new form of reentrancy attacks](https://medium.com/chainsecurity/constantinople-enables-new-reentrancy-attack-ace4088297d9).

When designing a risk-averse technology like smart contracts, it is best to
avoid exposing developers and users to an unnecessary amount of potential risks
just so they might be able to perhaps someday come up with a use case to enjoy
its perceived benefits. After all, smart contracts are nothing more than
computer programs that run on a blockchain. They do what they’re told to do. In
using them, you are exposing yourself to the risk of trusting someone else’s
sound logic for all possible inputs. Instead of trusting an unknown programmer’s
logic, consider trusting a Turing incomplete programming language with which
several dangerous bugs & exploits are not even possible. For even more safety
consider trusting a Turing incomplete language
[designed with smart contract security in mind](https://kadena.io/download/88/).

As I continue to learn about this subject, I would love to hear whether you
think there are key implications of Turing completeness that I failed to
address. Have you found benefits from using a Turing complete language in your
smart contracts? Share your thoughts below!
