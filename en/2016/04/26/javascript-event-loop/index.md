# What Is the JavaScript Event Loop?

The Chinese version of this post is my translation of an English article, Altitude Labs' "[What is the JavaScript Event Loop?](https://altitudelabs.com/blog/what-is-the-javascript-event-loop/)"[^1]. Please read the original for the full walkthrough: it uses a few short code examples and step-by-step diagrams to show how the call stack, the event table, the event queue and the event loop cooperate when `setTimeout` schedules a callback.

What follows are only the parts I added myself.

## A Different Analogy for the Call Stack
To explain the call stack, the original compares it to people getting in and out of an elevator. I didn't find that very vivid, so in my translation I replaced it with a human pyramid: the first person to climb on can only come down last, and the last person to climb on is the first to come down.

## A Follow-Up Question
Question: is the delay you set in `setTimeout` exact?

[^1]: As of 2024, the author's blog can no longer be reached. Fortunately there's a backup on Medium: https://medium.com/@fay_jai/what-is-the-javascript-event-loop-98707ed20a90
