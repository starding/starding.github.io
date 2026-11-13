# Why We Should Ask "Why" When Learning Computer Science

Recently, while using Bootstrap, I ran into a design question about dropdown menus. Bootstrap's default dropdown component is built on a list as its HTML base rather than on `<select></select>`. I figured there must be some intent on the designers' part behind this, but for someone like me who has just started with front-end work, it was hard to dig into. After asking around, though, I found that people didn't seem to pay much attention to the design intent behind these implementations.

In an earlier post, [open questions](/en/2016/01/10/open-questions/), I raised a question that went roughly like this: in the field of computing, why should we ask about the motivation behind something? Learning front-end development lately has given me a deeper feel for this question, so I'm pulling it out to discuss on its own.

## The "Four Causes" in the Philosophy of Science
As early as ancient Greece, philosophers began pondering the nature of things. One very famous philosopher put forward a set of arguments explaining motion and change in things, and the core idea is what the heading above describes: the ["four causes"](https://en.wikipedia.org/wiki/Four_causes). And, as you'd expect, the philosopher's name is Aristotle.

To save time explaining the concept of the four causes, I'll excerpt a few paragraphs from Professor Wu Guosheng's (a Chinese historian and philosopher of science) blog post [Heidegger's Philosophical Reflections on Technology](https://blog.sina.com.cn/s/blog_51fdc06201009s7z.html). Of course, you can also consult the English Wikipedia entry, or more specialized books on the philosophy of science:

> What brings a thing into appearance is called the cause of that thing. Aristotle held that there are four kinds of cause: the "material cause", the "formal cause", the "final cause", and the "efficient cause". Take the making of a crown: gold is its material cause; the shape of the crown is its formal cause; the emperor's use of it to hold grand ceremonies and display his majesty and splendor is its final cause; and the craftsman, who gathers all the requirements and preparations and does his part to finally bring the crown forth, is its efficient cause.
> 
> Today we don't really understand the doctrine of the four causes. We don't know why four causes were proposed, much less why exactly these four. Because when we speak of a "cause", what we usually mean is only the thing that acts directly and produces and brings about the final result, which is only the efficient cause in Aristotle's sense (it can also be called the "proximate cause" —note by the quoter). For the crown as something made, from our point of view today, the craftsman is its only cause.
> 
>  The efficient cause became the decisive one among the four, and ultimately determined how causality is defined. This happened after the 16th and 17th centuries (that is, the years when the mechanical view of nature was taking shape —note by the quoter), and it was extraordinary: it contained modern thought's exclusion of the final cause. The appearance of a thing came to be described as the result of another, earlier thing plus some acting force; in a sense, the thing became something ready-made, so-called "matter". Things no longer "come to" appear; they are simply present, permanently present. Causality no longer speaks of what makes a thing "appear", but of quantitative changes in matter that is fundamentally present.
>  This definition of causality makes it impossible for us to understand the Greek doctrine of the four causes. In particular, it stamps our understanding of the efficient cause in the Greek doctrine with the brand of our own era: acting on a thing so as to change it. But the inner connection among the four causes in the Greek sense is completely lost. Heidegger reminds us that understanding the essence of instruments depends on understanding the essence of causality, and we remain utterly ignorant of the essence of causality to this day, an ignorance shown especially in our misunderstanding of the Greek four causes.

Professor Wu's text above already explains quite clearly what the four causes are, and why today, when we mention the "cause" of something, the implied context is "one cause" rather than "four causes". This comes from the paradigm shift in the view of nature that took place in the 16th and 17th centuries. That shift treated the "efficient cause" among the four (which can also be called the proximate cause) as the primary factor in how things change, while the other causes faded into the background.

## The Efficient (Proximate) Cause: An Effective Way of Inquiry in Traditional Natural Science
In traditional science, when we talk about the cause of something, we usually mean its proximate cause. Take a question I once answered on Zhihu (a Chinese Q&A site similar to Quora): [Why is ethanol non-toxic, while methanol, propanol and butanol are all toxic?](https://www.zhihu.com/question/30546364/answer/50020320)

Then look at the answers below it. The top-voted answer describes the molecular structure of alcohols and their corresponding chemical properties, as well as the different effects that different alcohols have inside the human body, and gives a quite professional answer. What it sets out from this angle is "the proximate cause of alcohol toxicity", that is, "how things currently are".

Since the Scientific Revolution, the thinking reflected in that answer has been the guiding idea of research in the natural sciences. This mode of inquiry, asking after the "proximate cause", has an enormous advantage: it leads humanity to set aside the most fundamental questions for the time being, concentrate on what can be studied at the current stage, and stay silent about what can't be studied or is temporarily out of reach. For example, to study the motion of objects, the most direct approach is to study the forces that push them and the different effects produced under different forces, while setting aside what Newton called the first mover and not considering it for now. It is precisely by advancing step by step, precisely, according to an internal logic, and accumulating continuously, that this form of research has achieved major results, as we can see.

But this doesn't give "our expectation" an explanation that feels more fundamental. Yes, the answer is very accurate and fits very well with the physiological and chemical knowledge humans currently have, but on that basis one can still ask: why is it like this? What caused this physiological and chemical state of affairs?

## The Final Cause: Our Expectation
As the question at the end of the previous section suggests, we humans always psychologically want a "more fundamental" explanation, and somewhat stubbornly believe that "a more fundamental explanation ought to exist", even though for now many of these are just "illusions of causality". This shows up even more clearly in Darwin's theory of evolution, as in my answer to the question "Why is ethanol non-toxic, while methanol, propanol and butanol are all toxic?":

> This is obviously a question of physiology plus evolution, and once evolution is involved, "causality" gets subtle.
> 
> When we say something is "toxic", there's an implied context: toxic to living things. Methanol, ethanol, propanol and butanol are structurally similar, so why is ethanol the least toxic? Answering from physiology and chemistry can only tell you "what" this toxicity looks like. In terms of causality, reasoning this way finds the "proximate cause" of "being toxic".
> 
> The "proximate cause" is the cause most directly related to the thing being studied. Looking for proximate causes is also the most common form of research in physics and chemistry. Its origin has a lot to do with the Scientific Revolution of the 16th and 17th centuries; the details are complicated, so I won't go into them here.
> 
> But in biology, studying only proximate causes explains "how it manifests, what it is like" well, but doesn't explain "why it is like this" well. In answering "what it is like", physiology and chemistry have done a fine job. As for "why it is like this", we can only turn to evolution.
> 
> My bold guess is this: ethanol occurs more readily under natural conditions (why it occurs more readily is another question), so living things have had more opportunities to come into contact with ethanol than with other alcohols. This has made life less sensitive to ethanol.
> 
> As for evidence, all I can say is that this guess is consistent with the logic of evolution. Producing concrete data would be hard.
> 
> Setting aside for now whether this answer is correct, and also not worrying about the headache-inducing causality in evolution, what I want to say is that even a "half-baked final-cause answer" like the one above gives us a feeling of "Ah, that's it!", as if it satisfied some longing deep in our souls.
> 
> This is in fact the charm of the "final cause": it satisfies a certain mysterious human craving for the truth, even when the final cause is sometimes illusory.

## The "Final Cause" in Computer Science
The above describes the way of researching or learning in the traditional natural sciences. But computer science is different. In nature, all kinds of things exist independently of humans, and most of them existed countless years before humans did. It is hard, one could even say basically impossible, for us to trace back and see what things looked like when they first appeared, and where they sat within the complex system of nature.

In computing it's a completely different story. A great deal of it is "created by humans". These things were built out of certain motives, which matches human intuition very well: if it's done this way, there must be a "more fundamental reason" behind it, and that fundamental reason is the creator's purpose and intent.

This can basically be generalized to everything related to man-made things. Whenever we design or create something, there is some purpose in it rooted in the environment of the time. Take ordinary tables and chairs: every design carries the purpose its creator wanted to express. None of them appeared out of nowhere; they come accompanied by the intentions the creator planted in them. With a folding chair, the designer may have been thinking about saving space. With a chair built purely with mortise-and-tenon joints, the creator may have been after naturalness and environmental friendliness, or nostalgia for days gone by.

In computing, we should likewise ask about the "final cause" of something, that is, the original intention of the creator behind it. By asking about these original intentions, we can better understand the intent built into a thing and deepen our understanding of it. Take design patterns: why do these design patterns exist, and are there others? Once we understand this, we realize these things aren't set in stone, and that frees up our creativity.

## Front-End Development
This is even more true in front-end development. The front end is purely a human construction, so there are many things we can ask about. For example, what is HTML5 for? Why was HTML5 proposed, and what were its proposers thinking?

Asking these questions lets us trace a problem back to the designers' intent and understand the original purpose, which in turn gives us a deeper understanding and a better grasp of what's to come.
