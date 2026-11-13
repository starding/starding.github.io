# Iterators and Generators in Python

Just a quick write-up, since producing something is a better test of how well you understand it. Also, I feel a lot of articles online aren't very reliable. Quite obviously their authors haven't even read the official documentation and just write summaries from experience, which can easily mislead people.

## Iterator Types

### First, the part on iteration in the official Python 2.7 documentation
The passages below are quoted from the official documentation, [Iterator Types](https://docs.python.org/2.7/library/stdtypes.html#iterator-types). Before reading, it helps to be clear on what a few words mean:

- "iterator"
- "iteration"
- "iterable"
- "container": an object that can hold other objects, such as a list or a dictionary

> New in version 2.2.
> Python supports a concept of iteration over containers. This is implemented using two distinct methods; these are used to allow user-defined classes to support iteration. Sequences, described below in more detail, always support the iteration methods.

> One method needs to be defined for container objects to provide iteration support:
> `container.__iter__()`
> Return an iterator object. The object is required to support the iterator protocol described below. If a container supports different types of iteration, additional methods can be provided to specifically request iterators for those iteration types. (An example of an object supporting multiple forms of iteration would be a tree structure which supports both breadth-first and depth-first traversal.) This method corresponds to the tp_iter slot of the type structure for Python objects in the Python/C API.

> The iterator objects themselves are required to support the following two methods, which together form the iterator protocol:

> `iterator.__iter__()`
> Return the iterator object itself. This is required to allow both containers and iterators to be used with the for and in statements. This method corresponds to the tp_iter slot of the type structure for Python objects in the Python/C API.


> `iterator.next()`
> Return the next item from the container. If there are no further items, raise the StopIteration exception. This method corresponds to the tp_iternext slot of the type structure for Python objects in the Python/C API.
> Python defines several iterator objects to support iteration over general and specific sequence types, dictionaries, and other more specialized forms. The specific types are not important beyond their implementation of the iterator protocol.
> The intention of the protocol is that once an iterator’s next() method raises StopIteration, it will continue to do so on subsequent calls. Implementations that do not obey this property are deemed broken. (This constraint was added in Python 2.3; in Python 2.2, various iterators are broken according to this rule.)

### Sorting out the concepts
That's roughly the core of what Python 2.7 says about iteration. To sum it up:

For a container object to support iteration, it needs to implement an `__iter__()` method. This method returns an "iterator object" (iterator). If a container implements this method, we call the container "iterable".

An iterator also needs an `__iter__()` method, which returns the iterator itself, plus a `next()` method that returns the next item. An iterator is, of course, itself "iterable". Together, these two methods of an iterator are called the "iterator protocol".

In `for` and `in` statements, whether you use a container object (such as a list) or an iterator object, it has to support the `__iter__()` method. For a container, this method returns an iterator; for an iterator, it returns itself. That is then used for the iteration. In other words, even a container object is first turned into an iterator object before it's iterated over. Python's documentation says so too, in [The for statement](https://docs.python.org/2.7/reference/compound_stmts.html#the-for-statement):

### The for statement
> The for statement is used to iterate over the elements of a sequence (such as a string, tuple or list) or other iterable object:
> 
> ```py 
> for_stmt ::=  "for" target_list "in" expression_list ":" suite ["else" ":" suite]
> ```
> The expression list is evaluated once; it should yield an iterable object. An iterator is created for the result of the expression_list. The suite is then executed once for each item provided by the iterator, in the order of ascending indices. Each item in turn is assigned to the target list using the standard rules for assignments, and then the suite is executed. When the items are exhausted (which is immediately when the sequence is empty), the suite in the else clause, if present, is executed, and the loop terminates.

## Generator Types

### The official documentation's definition
From [Generator Types](https://docs.python.org/2.7/library/stdtypes.html#generator-types):

> Python’s generators provide a convenient way to implement the iterator protocol. If a container object’s `__iter__()` method is implemented as a generator, it will automatically return an iterator object (technically, a generator object) supplying the `__iter__()` and next() methods. More information about generators can be found in the documentation for the yield expression.

### Sorting out the concepts
What this means is that a generator object is just a shortcut for implementing the iterator protocol. Normally, when we need a custom iterator, we have to implement the required `__iter__()` and `next()` methods by hand; with a generator object, you automatically get back an iterator that supports the iteration protocol. And to create a generator, all you need is to use a yield expression in a function. That creates a generator function, and when it's called, it returns an iterator (usually called a generator) that controls the execution of the generator function.

From [Yield expressions](https://docs.python.org/2.7/reference/expressions.html#yield-expressions):

> The yield expression is only used when defining a generator function, and can only be used in the body of a function definition. Using a yield expression in a function definition is sufficient to cause that definition to create a generator function instead of a normal function.
> 
> When a generator function is called, it returns an iterator known as a generator. That generator then controls the execution of a generator function. The execution starts when one of the generator’s methods is called. At that time, the execution proceeds to the first yield expression, where it is suspended again, returning the value of expression_list to generator’s caller. By suspended we mean that all local state is retained, including the current bindings of local variables, the instruction pointer, and the internal evaluation stack. When the execution is resumed by calling one of the generator’s methods, the function can proceed exactly as if the yield expression was just another external call. The value of the yield expression after resuming depends on the method which resumed the execution.
>
> All of this makes generator functions quite similar to coroutines; they yield multiple times, they have more than one entry point and their execution can be suspended. The only difference is that a generator function cannot control where should the execution continue after it yields; the control is always transferred to the generator’s caller
