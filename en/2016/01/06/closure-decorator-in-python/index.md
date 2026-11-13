# Closures and Decorators in Python

First version created: 2016-01-06

## Closures
Let's start with the definition from Wikipedia:
> In programming languages, closures (also lexical closures or function closures) are a technique for implementing lexically scoped name binding in languages with first-class functions. Operationally, a closure is a record storing a function together with an environment: a mapping associating each free variable of the function (variables that are used locally, but defined in an enclosing scope) with the value or storage location to which the name was bound when the closure was created. A closure—unlike a plain function—allows the function to access those captured variables through the closure’s reference to them, even when the function is invoked outside their scope

## Then let's examine the definition:
There are a few key points in the passage above:

* A closure is a technique.
* A closure is a record made up of a function and the environment it lives in.
* When a closure, i.e. the record above, is created, it binds the free variables used in the function (variables defined in an enclosing lexical scope but used locally in the function) to their values.
* Unlike a plain function, a closure lets the function use the variables it has captured (bound), even when those variables are defined outside its scope.
Looking only at the definition, plus whatever intuition the word "closure" gives you, you end up with a fuzzy idea at best: this thing is roughly some enclosed structure that contains a function and variables defined outside the function. To understand it more deeply, you have to look at real code.

An example of a closure in Python:
```python
# function that creates the closure
def counter(start_at=0):
	count = [start_at]
	def incr():
		count[0] += 1
		return count[0]
	return incr
# assign the closure to another variable
counter1 = counter()
# assign it to yet another variable
counter2 = counter(5)
```

In the code above, counter is a function that creates closures, and the next two lines assign its results to two different variables. This actually produces two closures, counter1 and counter2, each consisting of the function itself plus a scope attached to it from outside the function.

These two closures are a lot like two instantiated objects: the scopes attached to them outside the function are independent and don't affect each other.

## Decorators
First, the literal meaning.
The word "decorator" literally means "a tool for decorating some particular thing." Implicit in the word is the idea that the thing being decorated is the core, while the decorating tool is just an embellishment that adds a little something extra.

Take a metaphor: at Christmas we hang little ornaments on the Christmas tree. Each ornament is a small decorator, and the core being decorated is the tree. This also implies that the tree is what matters; the ornaments merely give it some extra fun features.

It's similar in Python. Python doesn't actually have an object type called "decorator" the way it has functions, dicts and lists. Rather, Python lets you build a certain kind of callable (usually a function or a class) that can be used to decorate other objects, and we call any object with this decorating ability a decorator. At bottom, it's just a callable that plays a decorating role.

That raises two questions:

What does it decorate?
And how does it do the decorating?
Again, let's look at code. An example of a Python decorator:

```python
import time
from functools import wraps
# the main function being decorated
def foo():
	# do whatever we actually want to do
	# ...
	# ...
	# and finally print something
	print 'in foo()'
# the decorator	
def timeit(func):
	'''
	Decorator that reports the execution time.
   '''
   @wraps(func)
	def wrapper(*args, **kwargs):
		start  = time.clock()
		result = func(*args, **kwargs)
		end = time.clock()
		print 'used: {0}'.format(end-start)
		return result
	return wrapper
```

First we need to be clear about what the core of our program is. We want the foo function to carry out some specific task and print something at the end, so our core function is foo.

At the same time, we'd also like to know how long the task takes, which is exactly something a decorator can do. So we build a function, timeit, as a decorator to decorate foo.

One point worth stressing again: the decorator timeit exists to decorate foo. It only adds the ability to report execution time; it doesn't change what foo was meant to do. It has no effect whatsoever on foo's original job.

If you look closely, though, you'll notice that the decorator above uses closures (just not very visibly, since it doesn't carry an extra scope along, though adding one would be fine). More precisely, both closures and decorators rest on the fact that callables in Python can be passed around.

## The Decorator Pattern
So where do decorators come from? The idea comes from the decorator pattern in design patterns: without changing the core object being called, add some interesting and possibly useful features to it. That is exactly what "decorating" means.

You don't have to touch the original core object at all, and you still get what you want. Pretty clever.

Huilongguan, Beijing, January 2016
