# A Running Log of Problems and Fixes

Meta: This post records problems I run into day to day, along with their solutions.

## Miscellaneous
### Running scheduled commands with Linux crontab + Django commands
#### The problem
While building an archive management system, I had a task that needed to periodically pull data from a DB2 database, process it, and store it in MySQL. That meant running a standalone script inside Django that uses Django's environment.

#### The solution
Django provides user-defined custom commands for exactly this:

> [Writing custom django-admin commands¶](https://docs.djangoproject.com/en/1.9/howto/custom-management-commands/)

And Linux provides a handy tool for scheduling tasks:

> [linux crontab](https://linuxtools-rst.readthedocs.io/zh-cn/latest/tool/crontab.html)

### Error 2006 'mysql server has gone away' when writing large amounts of data to MySQL
#### The problem
While building an archive management system with Django + MySQL, this error appeared when I wrote nearly 30,000 rows into MySQL in one go.

#### The solution
It turned out MySQL has a default limit on the size of data written. Just add the following to `/etc/my.cnf` (create the file yourself if it doesn't exist):

```conf
[mysqld]
max_allowed_packet = 16M
```

Of course, you can also solve this by limiting how much data you write to MySQL at a time.

### Vim split screens and the Ctrl P plugin
I'd always heard how great the `ctrl p` plugin was. But when I first tried it, I really didn't see what was so powerful about it, until I later discovered Vim's split-screen feature.

Using Vim's split screens together with Ctrl P lets me open multiple files without leaving Vim, which saves a huge amount of time spent cd-ing around directories on the command line.

Reference: [Vim's split-screen feature](https://coolshell.cn/articles/1679.html)

### Basic regular expressions
Once I needed to pad a bunch of short lines of text with trailing spaces so that every line had the same width.
At first I tried all kinds of column editing and block editing, and none of it worked. Did I really have to write a program just for this?

Later I found that a regular expression pretty much does the job:

```shell
%s/$/ n_spaces /g
```    

In Vim, the $ symbol has a rich set of meanings; here it refers to the character just before the end of the line.

## Front end
Mainly notes on things that are easy to confuse while learning front-end development. Personally, among HTML, CSS, and JavaScript, CSS is by far the hardest to pin down. Because of browser default styles and constraints, CSS inheritance, cascading rules, and so on all acting together, CSS often doesn't behave the way I expect. So there may be more CSS content here.
These are just scattered notes; for now I don't have the energy to organize them into standalone posts. Maybe later I'll expand some of the expandable bits into proper articles.

### The difference between CSS pseudo-classes and pseudo-elements
Pseudo-classes
Pseudo-elements

#### Telling the concepts apart
An answer on Stack Overflow:
[What is the difference between a pseudo-class and a pseudo-element in CSS?](https://stackoverflow.com/questions/8069973/what-is-the-difference-between-a-pseudo-class-and-a-pseudo-element-in-css)

The explanation on W3C:
[pseudo-elements](https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#pseudo-elements)
[pseudo-classes](https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#pseudo-classes)

### Inheritance of relative font-size values in CSS
When font-size uses relative units like em, the calculations compound.

> From *Stylin' with CSS* (quoted from the Chinese edition)
> 
> Generally, em uses the browser default as its base unit, that is, 1em = 16px. If you want to use em but also need to set specific pixel sizes, you can set the body's font-size to 62.5%. That changes the base size from 16 pixels to 10 pixels (16 × 62.5% = 10). Then the correspondence between em and pixels becomes very clear: 1em equals 10 pixels, 1.5em equals 15 pixels, 2em equals 20 pixels, and so on.
> 
> The p element's text is 12 pixels (the body's 16-pixel base × .75 = 12px). strong is a child of p, so its relative text size compounds level by level, and it should be 16px × 0.75 × 0.75 = 9px.

**Note the difference from text-indent:** font-size compounds, whereas with text-indent a later value overrides the earlier one.

> text-indent is inherited by child elements. If you set text-indent on a div, all paragraphs in the div inherit that indent value. However, as with all inherited CSS values, the indent value is not the value set on the ancestor but the computed value. Here is an example.
> 
> Suppose a 400-pixel-wide div contains text indented 5%; the indent is then 20 pixels (5% of 400). Inside this div is a 200-pixel-wide paragraph. As a child element it inherits its parent's text-indent value, so its text is indented too. But what is the inherited indent value? Not 5%, but 20 pixels. That is, the child inherits the indent value computed from the parent's width. As a result, even though the paragraph is only half as wide as its parent, its text is still indented 20 pixels. This ensures that paragraphs are indented by the same distance no matter how wide they are. Of course, setting text-indent on the child element overrides the inherited value.

### How inline-block behaves

> This value causes an element to generate an inline-level block container. The inside of an inline-block is formatted as a block box, and the element itself is formatted as an atomic inline-level box.
> 
> Put more plainly: an inline-block element has both the block element's ability to have its width and height set and the inline element's default behavior of not breaking onto a new line. And that's not all; for example, an inline-block element can also take the vertical-align property. In short:
> an inline-block element is a block container formatted as an inline element.

Open question:

Does an inline-block's margin push out the parent's height, while an ordinary block's margin collapses with the parent's margin?


References:
[The past and present of inline-block](http://ued.taobao.org/blog/2012/08/inline-block/)

[w3c: the ‘display’ property](https://www.w3.org/TR/CSS2/visuren.html#display-prop)

[mozilla: vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)

### Using rem
Today I experimented with the rem relative unit in Chrome. My initial test code was:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>test rem</title>
	<style type="text/css">
		html{
			font-size: 62.5%;  // the behavior here is a bit odd
		}
		body{
			font-size: 1.2rem;
		}
		div{
			width: 300px;
			height: 300px;
			background-color: red;
			padding: 1rem;
		}
	</style>
</head>
<body>
	<p>测试字体大小</p>
	<div></div>
</body>
</html>
```

But at this point font-size was not 10px. I'd seen online that people set the root element's font-size to 10px to make later calculations easier, but here it didn't seem to take effect.

The reason is that Chrome's default minimum font size is 12px; any value set below that gets reset to 12px. In that case `1rem=12px`. On Chrome's minimum font size limit,

see: [What happened after Chrome dropped -webkit-text-size-adjust](https://banri.me/web/webkit-text-size-adjust.html)

### Block-level and inline elements
* Block-level elements
  * Take up a whole line
  * width and height can be set
  * Default
* Inline elements
  * Setting width and height has no effect

Reference: [The few most essential concepts in CSS](https://geekplux.com/posts/several_core_concepts_of_css.html)

### width and height
Defines the width of an element's "content area." The default value is auto, and it is not inherited. The browser computes the actual width.

When height and width use percentage relative units, they are calculated relative to the parent element's width (the parent's width works the same way). If not specified, the default is the image's own width and height; if the image fails to load, the alt attribute value is shown, or the browser's built-in broken-image display.

### When to use each centering method
```css
// Horizontal centering
// When using margin to center an element horizontally,
// you need to specify the width of the element being centered (it has nothing to do with the parent's width)
// Obviously this only applies to block-level elements
// It centers the element the property is set on, not its children or its parent
margin: 0, auto;   
text-align： center
```

### How things behave when an inner box is bigger than its outer box can contain

## Tools I've used
* reactjs react router
* underscore
* project-path (npm module)
* fixed-data-table (React component)

## Over-engineering in code
### What is over-engineering in code
Over-design, or over-engineering, means exactly what it says: when writing code, imagining too many scenarios that don't actually exist and designing for those imagined scenarios, such as constantly accounting for changes that might come in the future. In reality, the code at that point is still a long way from needing to consider any of that.

### Over-engineering I've run into
When we were building a product before, we actually overemphasized possible future risks or changes in some places. For example, the product stored images on Qiniu cloud storage (a Chinese cloud storage provider), and at first everything was stored as URLs. But then an engineer imagined a scenario: "What if Qiniu's domain changes someday, or we stop using Qiniu?" So he set about changing the URLs to keys, only to find that the rewrite wasn't easy at all, and in the end it was abandoned.

The other case was over-design at the product level. While we were developing a product, the product manager's prototype changed countless times, and some of the last changes even altered the most basic data, rendering all the code we'd written completely useless. And this was precisely a product that needed fast iteration; to this day the first version still isn't done. Strictly speaking this example isn't over-design, but I'll put it here for now.

I don't understand how we, who are always going on about the MVP (minimum viable product), completely ignored it when building our own product.

Of course, for someone like me without much programming experience, it's still too early to be thinking about this. I'm just writing it down for now, to reflect on later.

## Product experience
### First impressions of iOS
My Nexus, after three years of service, finally got too old and decrepit and was honorably discharged. Torn by Android's endless variety, I ended up just getting an iPhone. Right away a few things felt really awkward. Some of that is naturally the unfamiliarity that comes with switching systems, but some of it is clearly bad design.

#### The useless pull-down menu
Compared with Android's powerful pull-down menu, iOS's pull-down menu is only used for notifications or recently used app features, and part of the settings is placed in a menu that slides up from the bottom. Even those settings are incomplete. Take Wi-Fi: you can only toggle it on and off, and can't use it as an entry point to configure Wi-Fi further. To configure Wi-Fi you have to go dig through the Settings app.

Now look at Android's pull-down menu: whether it's Wi-Fi or the flashlight, it's incredibly practical and convenient, and used very frequently.

#### The infuriating alarm settings
This one is even more obvious. On Android, setting an alarm takes one step. On the iOS alarm page, you first tap Edit in the top left to enter edit mode, then tap the time before you can choose it. A feature that could be done in one step gets stubbornly split into several. Using it is incredibly frustrating.

#### The baffling keyboard and system-wide copy and paste
The key proportions on the 9-key input layout are a real pain: the main area doesn't get enough space, while a big confirm button sits on the right, taking up a ton of room.

And the behavior of the keyboard and system-wide copy and paste is simply bewildering; there's no discernible pattern to any of it. It feels like one thing one moment and something else the next.

#### A messaging screen that doesn't make full use of the touchscreen
Editing on the iOS Messages screen still means an Edit button in the top left that you have to tap first. Tapping a message only opens its details, and a long press does nothing.

This "Edit button" pattern is everywhere in iOS, like the alarm editing mentioned above. It's very different from Android, where a long press generally means editing the item you pressed. iOS doesn't assign any action to a long press, which adds yet another step. It really doesn't make full use of the interaction advantages of the touchscreen itself.

### The soy sauce bottle in the kitchen
There's a soy sauce brand called Haitian with an incredibly annoying seal design. You open the cap, pull the ring tab, pour out the rich soy sauce, and then you discover the cap won't close anymore! Soy sauce is something you use over a long time; I have no idea what a one-time design like a soda-can pull tab is for.

Compare that with another condiment bottle in the kitchen, the white vinegar, and the gap in design is obvious. The vinegar has a big cap that's easy to twist open, and to help control the flow when pouring, there's a narrow slit inside that regulates it. Convenient in the extreme.
