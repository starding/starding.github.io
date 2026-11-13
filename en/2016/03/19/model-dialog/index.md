# What Is a Modal Dialog? What "Modal" Actually Means

## Where the Question Came From
While learning front-end development, I ran into a puzzling term: 模态框 ("modal box"), the Chinese name for the modal dialog, a special kind of pop-up window. For a while it was hard to say what exactly was special about it, or what fundamentally set this kind of pop-up apart from other windows. Unlike plain words such as "dialog" or "panel," the Chinese word 模态 ("modal") feels mysterious through and through. It's hard to get an intuitive sense of what it is or what the word is trying to express, and you can't help being confused: what on earth does "modal" mean?

With computing vocabulary, I've always held this belief: if a term feels mysterious, there must be more hidden behind it, perhaps a metaphor, perhaps some deeper design principle. Either way, the meaning behind such terms is worth investigating properly; these small words may turn out to be doorways into one fascinating world after another.

## What Does "Modal" Mean?
To understand the modal dialog, besides looking at what the term actually refers to (you can try Bootstrap's modal component), the first thing to do is figure out what "modal" means.

**The Chinese 模态 translates the English word *modal*.**

First, the dictionary definitions of "modal": relating to mode, to modality, to form.

Then look at some baffling technical terms built from the word:

* Modal analysis
* Modal matrix
* Modal logic
* Modal dialog

Let's guess how the word was introduced, or rather how the English *modal* was rendered in Chinese. You want to express content in a particular state; how do you translate that? We know the word 模型 ("model") carries the sense of "a fixed abstraction of something," so it can express "a fixed pattern," and the word 状态 ("state") describes how something behaves in a given situation. Put the two together, and 模态 practically suggests itself. Of course, the actual translation and coinage must have been far more complicated than this, but the core idea is the same: how to express a concept faithfully, clearly and elegantly.

After this analysis, we can say we understand "modal" a little. It refers to **a particular state**.

Now look again at the technical terms above, and they become easier to understand: they all carry the sense of **"studying things in some particular state."**

## What Is a Modal Dialog?
With that understanding of the word, we can move on to the concept of the modal dialog. Literally, it should mean "a window in a particular state."

Seen only this way, it may still be a little hard to grasp. That's because we're missing something: the context in which modal dialogs are used. Only by adding that can our understanding be complete.

So what is that context? The term arose in software, so let's first look at how software is normally used. When we use software, we usually proceed step by step along our own line of thought. Say we're using a shopping system: we follow the process in our heads based on our existing understanding of the software, choosing products, adding them to the cart, placing the order and paying. These processes can be called the "normal state" of using software.

The modal dialog, a "window in a particular state," is defined relative to this normal state. A modal dialog is a window in a particular state that interrupts us out of the normal state and focuses our attention on handling that particular state. Look at how a modal dialog actually behaves: when it appears, it blocks all other operations, and what the user can attend to is limited to the inside of the current modal dialog, unless you deliberately close it, end the interruption, and return to the original normal flow.

That is the core idea of the modal dialog. Strictly speaking, the modal dialog is a concept from UI design. Wikipedia defines it as follows:

> **model window**
> 
> In user interface design, a modal window is a graphical control element subordinate to an application’s main window which creates a mode where the main window can’t be used. The modal window is a child window that requires users to interact with it before it can return to operating the parent application, thus preventing the workflow on the application main window. Modal windows are often called heavy windows or modal dialogs because the window is often used to display a dialog box.
> 
> Modal windows are commonly used in GUI systems to command user awareness and to display emergency states, although they have been argued to be ineffective for that use. Modal windows are prone to produce mode errors.

Of course, the modal dialog as a design idea implies coercion. It forces the user's attention out of their normal train of thought and onto the contents of the dialog, which amounts to forced thinking. This design is generally used for warnings about fairly dangerous operations.

But criticism of modal dialogs comes in many forms, mainly of this coercive design approach and of whether it should be replaced by better solutions. Some even declare modal dialogs "evil." For these criticisms, see the following:

* [Why are modal dialog boxes evil?](https://stackoverflow.com/questions/361493/why-are-modal-dialog-boxes-evil)
* [Never Use a Warning When you Mean Undo](https://alistapart.com/article/neveruseawarning/)

## "Modeless"
Where there is a concept of modal, there is of course a concept of modeless. I'll set modeless aside for now.
