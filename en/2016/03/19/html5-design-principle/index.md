# HTML5 Design Principles — notes on Jeremy Keith's talk

The grand title comes from a talk. I find the way Jeremy Keith reasons in his keynote very close to how I like to think, and at the time there was no good Chinese version online, so I collected and tidied up a Chinese translation and reposted it on this blog.

A while ago our team kept arguing about whether an API should return UTC time strings or Unix timestamps. My position was "design for people first, then for machines", so I argued for the more readable UTC time.

The point of that example is that when we make a decision, we shouldn't just go with a passing thought and assume things should be a certain way. We should follow design principles that have clearly stood the test of time — especially when facing a hard trade-off.

Likewise, when we look at something new — HTML5, say (not that new anymore) — we shouldn't only look at its new elements and new APIs. We should think about the design philosophy and history behind it, and the pain points it solves. That's how we come to understand where these things come from.

<br/>

## The talk

The Chinese version of this post is a reposted translation of Jeremy Keith's keynote **HTML5 Design Principles** at Fronteers 2010 (October 21, 2010). Since the original is in English, read it in his own words: [HTML5 Design Principles, by Jeremy Keith](http://adactio.com/articles/1704/).

The talk walks through the principles behind HTML5:

- Avoid needless complexity
- Support existing content
- Pave the cowpaths
- Degrade gracefully
- Priority of constituencies: put end users first
