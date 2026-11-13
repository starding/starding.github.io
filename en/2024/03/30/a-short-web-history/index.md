# A Short History of the Web: The Key Threads

Over the past two or three years I have learned a lot from the history of the Web. It also fits the way I like to learn complex systems: understand the old paradigm and how it developed, then move on to the new paradigm and the problems at the frontier.


##  The Web's original paradigm metaphor: it started as "a hypertext application"

### 1980: Tim Berners-Lee and ENQUIRE

From June to December 1980, Tim Berners-Lee worked as an independent contractor at the vast CERN [^1].

While there, he learned that CERN had roughly 10,000 staff, each with different hardware, software and personal requirements, and that much of the work got done through email and file exchange.

He clearly saw a Tech Space here, that is, room to use technology to help researchers share and update information with one another. So he built a new hypertext prototype system called ENQUIRE[^2].

![CERN's location](image.6m3o5wuarl.webp)

Looking at it from today's vantage point:
1. This prototype was really a simple, app-level hypertext program, something like today's Wikipedia, or note-taking systems such as Notion, Flomo and Obsidian.
2. Any software designed at the app level is similar: the system defines too much around its particular use case and requires users to organize their content according to its rules, which means its extensibility is bound to be limited.
3. What the real Web needed was something that connects and organizes all these app-level things, Wikipedia, Notion, Flomo, Feishu, Google Docs, Obsidian and so on, at a higher level.

Clearly, only a higher degree of abstraction could deliver that more general capability.


### 1989: A higher abstraction

After leaving CERN at the end of 1980, Tim Berners-Lee spent three years in business related to computer networking (at the time the bottom layer of networks was TCP/IP, with various application-layer protocols such as FTP on top). As someone with deep technical understanding and real insight into how a business runs, and working on a real-time remote procedure call project at that, he evidently absorbed a great deal of network design thinking from that experience. In 1984 he returned to CERN.


More experience, and his years of work on computer networks, made him realize that hoping to unify CERN's documentation through one app-level tool was unrealistic. He needed some way to link different documentation systems (many of them coexisted at CERN, including his own ENQUIRE):

> Creating the web was really an act of desperation, because the situation without it was very difficult when I was working at CERN later. 
> Most of the technology involved in the web, like the hypertext, like the Internet, multifont text objects, had all been designed already. 
> I just had to put them together. It was a step of generalizing, going to a higher level of abstraction, thinking about all the documentation systems out there as being possibly part of a larger imaginary documentation system. 
> But then the engineering was fairly straightforward. It was designed in order to make it possible to get at documentation and in order to be able to get people — students working with me, contributing to the project, for example — to be able to come in and link in their ideas, so that we wouldn't lose it all if we didn't debrief them before they left. 
> Really, it was designed to be a collaborative workspace for people to design on a system together. That was the exciting thing about it.
> 
> —— Academy of Achievement interview with Tim Berners-Lee, 2007: Visionary of the Internet [^3] 

(By "the situation without it" he means the pain of working across many documentation systems at once. "The Internet" here is the underlying internet, which is not the same thing as the World Wide Web.)


Based on these ideas, he designed and submitted the Web proposal [^4], shown below:

![Photo of the Web proposal](image.969iheltq9.webp)

He also built humanity's first web browser, the first web server, and a prototype website, [http://info.cern.ch](http://info.cern.ch) [^5]


The earliest prototype contained three core technologies, and you can tell from the names alone that they were born to "link different hypertext systems":

1. HTML: HyperText Markup Language.
The markup (formatting) language for the web.

2. URI: Uniform Resource Identifier.
A kind of "address" that is unique and used to identify to each resource on the web. It is also commonly called a URL.

3. HTTP: Hypertext Transfer Protocol.
Allows for the retrieval of linked resources from across the web.


Again, looking at it from today:
1. These three elements are highly abstract. By following a few simple conventions, a user can run a documentation system entirely under their own control (rather than writing their documents inside a software structure someone else controls), or adapt an existing documentation system so that it can link to others. This forms the basic framework of the modern Web.
2. The first browser was already a container space that could hold many different websites.
3. The primary motivation at this point was linking different documentation systems. Unlike the operating systems of the day, it was not driven by heavier business-workflow needs, so naturally there was no CSS or JavaScript, which only came later.


All in all, the Web's basic architecture was settled from the very first version.
A highly abstract mechanism at the application layer (still far more concrete, of course, than lower-level abstractions like TCP/IP), plus a natural, distributed openness, formed an enormous space for collaboration.

Tim Berners-Lee's original top-down design had achieved its goal. What remained were larger forces of the era: the growth of personal computers, the businesses built on them, networks becoming a high-speed information medium for human activity, and so on. These began to drive the Web's development in the other direction, from the bottom up.

### 1991 – 2007: Three browsers, Mosaic, Netscape and IE

This was the early era of browsers. Its landmark events include:

1. 1993: CGI
The National Center for Supercomputing Applications (NCSA) released the NCSA HTTPd web server, which included an early version of CGI. This allowed server-side web programs to run in response to page requests, marking the birth of dynamic content on the web. Dynamic content was quite limited back then, of course: submitting a form, that kind of thing.

2. 1994: CSS is invented
CSS was first proposed by Håkon Wium Lie on October 10, 1994. In 1996 the W3C endorsed it as the CSS1 Recommendation. Its original goal was better typographic control over documents, mainly document layout; it didn't even have a well-defined "frame layout" mechanism.

3. 1995: JavaScript 
In 1995, Brendan Eich, working at Netscape, invented JavaScript, and it shipped in version 2.0 of the Netscape browser. There was clearly a business need here too, and as a new technical feature it helped Netscape's browser stay ahead.
 

Back to our present-day view again:
1. In this phase, the context of the time and concrete needs limited people's imagination. Many designs were driven bottom-up by business needs, with little forward-looking design.
2. CSS was originally aimed mostly at document typesetting (the way Word does it). It struggled when used for two-dimensional page layout, and many capabilities that are routine in graphic design had to be achieved by hacking a one-dimensional flow layout.
3. JavaScript was originally meant for small tasks inside web pages; it was not a carefully thought-out language. Fortunately, the requirements for a universal Turing machine are simple, and JavaScript is Turing complete too (it has sequential execution, conditional branching and loops). Given enough APIs, it can in theory do anything any other language can.
4. Because the Web is open, as the system grew, web developers and browser makers had to stay compatible with and accommodate one another. Every web developer wants their pages to render correctly in browsers, and every browser wants to render every page. Together this created strong path dependence on technologies already implemented: anything new had to be compatible with what already existed. That guaranteed openness and usability, but it also piled up a large historical debt for the Web.
5. Standards bodies with real authority began to emerge. The W3C, led by Tim Berners-Lee, has led the HTML and CSS specifications all along, and the venerable ECMA took over standardizing JavaScript[^6].


Personally, I think these three browsers and the new technologies they introduced all belong to one paradigm of thought: they kept moving forward along the path of Tim Berners-Lee's browser prototype.

In this period users had limited interaction with content; web pages were purely informational and static. But that was bound to be a short-lived phase.

Because the Web is public and easy to access, humanity had for the first time a shared information medium, a tool no earlier era ever had. Demand was simply enormous. Quantitative change, piling up, brings qualitative change: bottom-up demand kept pushing Web technology forward and placed ever higher demands on the engineering design of the Web as a whole.

Once people no longer wanted websites to be simple text pages but complete apps that could carry all kinds of business logic, what they wanted from the browser also shifted, from a single tool for displaying pages to an all-purpose, OS-like platform.


## The Web's paradigm shift: from "a hypertext application" to "an operating system platform"

From here on, we're back to things most of us know well.


### 2000 – 2010: The rise of Amazon's cloud services
This too is background from the era. The main story of this period was remote computer clusters and operating-system virtualization. The rapid growth of server-side capability laid the foundation for thin clients.


### 2008: The V8 engine
Chrome's V8 JavaScript engine[^7] greatly improved JavaScript's runtime capability and efficiency.


### 2009: ChromeOS
Google announced the project in July 2009, initially describing it as a cloud-first operating system in which applications and user data would live in the cloud. ChromeOS was mainly for running web applications.


### 2005 onward: The CSS3 standard
Work on CSS3 began as early as 2005.
It aimed to meet the need for more dynamic and interactive web design and layouts that adapt to all kinds of devices (responsive design), screens and user interactions. Concretely, this includes media queries, the Flexbox model, Grid layout, and richer animation.
On the engineering side, it also brought modularity into the CSS specification, allowing features to be developed and adopted independently.

In short: stronger layout and interaction across different devices, and a more engineering-oriented design, to cope with increasingly complex needs.


### 2015: ECMAScript 6 
Discussion of the next version began almost immediately after ES5 was released in 2009, and the ES6 standard was officially released in 2015.
ES6's biggest improvements were native support for modules, more convenient asynchronous calls, improved variable scoping, and a more object-oriented Class syntactic sugar.


### 2015: PWA
Alex Russell and Frances Berriman of Google coined the term "Progressive Web App" to describe applications that take advantage of new features supported by modern browsers, including service workers, manifests and other web platform features.

### 2018: Apple starts supporting PWAs
Of course, PWAs conflict with Apple's business ecosystem, and Apple's support for them is incomplete.


Likewise, looking at it from today:
1. The most fundamental paradigm became "treat the browser the way you treat an operating system." With that as the backdrop, the overall direction of engineering became very clear.
2. Standards actually lag behind real needs. Before new standards like CSS3 and ES6 were written, there were already countless similar engineering practices: all sorts of hacky layout techniques in CSS; module conventions like CommonJS and AMD in JavaScript; jQuery's wrapper around document selectors; and so on. CSS3 and ES6 borrowed heavily from and absorbed these practices. You could say these standards were the result of the whole Web community pushing.
3. Beyond the community push, a Web designed around the "operating system metaphor" could borrow more and more from OS app programming and absorb the more carefully considered language designs of Java, Python and others.


In short, as the underlying tech stack and engineering architecture matured, the Web became an operating system platform in the true sense. Web applications matured too, and came closer and closer to the experience of native apps.



## Some discussion from a WeChat group
The Web is the most far-reaching revolutionary technology of the information age (probably no need to say "one of the most"), and its inventor, Tim Berners-Lee, is still alive. His views on the Web are well worth following.

This post was originally prompted by a Web-related discussion in a WeChat group. Newcomers to the field always seem to have similar confusions (and this friend is fairly sensitive to certain phenomena).

Here is a brief record of the discussion (unrelated content is blurred out to keep the logic flowing), to show some concrete scenarios.

![Web App discussion 1](image.5fkcw5ryeo.webp)
![Web App discussion 2](image.4jnvgpe7v6.webp)
![Web App discussion 1](image.9nzk7j2rl1.webp)
![Web App discussion 1](image.58h529r57z.webp)

[^1]: European Organization for Nuclear Research, an intergovernmental organization of 23 member states founded in 1954, located in Meyrin, in the western suburbs of Geneva on the French–Swiss border
[^2]: https://www.w3.org/History/1980/Enquire/manual/. According to Berners-Lee, the name comes from a guidebook he read as a child that left a deep impression on him: *Enquire Within upon Everything*
[^3]: The original interview: https://achievement.org/achiever/sir-timothy-berners-lee/#interview
[^4]: The book *Weaving the Web* describes this period in detail
[^5]: Rebuilt for the Web's 20th anniversary, with the domain and content kept as they originally were
[^6]: Netscape submitted JavaScript to ECMA International in 1996, partly because ECMA was seen as having a faster standardization process and already had experience standardizing programming languages. The first edition of the ECMAScript standard was adopted by ECMA International in 1997
[^7]: The name comes from a particular car engine layout, the V8 engine, so it is not a version number
