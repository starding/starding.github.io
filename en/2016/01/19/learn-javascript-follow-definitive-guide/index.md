# Reading Notes on JavaScript: The Definitive Guide (6th Edition, the Rhino Book)

Notes from reading *JavaScript: The Definitive Guide*, on the parts I consider core or easy to get confused about.
I'll also add some good articles I read along the way that expand on them.

**Changelog**
> 2016-01-18 Updated up to the try-except-finally statement
> 2016-04-07 Renamed the post. Split its structure into core parts and fuzzy points

**What I consider the core of the book**
> 1. The core of the language
> 2. Variable types
> 3. Strict mode
> 4. Lexical scope, functions, closures, this, call, apply, bind
> 5. The prototype system

## Core parts
### The language core
#### Variables and their types
Variables in JavaScript have no type of their own. When you assign a value to a variable, the variable is really just referencing that value. This is the same as in Python.

Both differ from fixed-type variables in languages like C. In C, when you declare a variable you have to specify its type, and the variable is actually a fixed-size chunk of space that holds the value directly. Arrays are the same: an array can only store values of a single type, and C decides how much memory to allocate based on the type, for example 4 bytes for an int.

In JavaScript and Python you don't declare a variable's type. A variable is just a reference to data, and the type is determined by the data itself: whatever type of value the variable references, that's the variable's type. Data types in JavaScript fall into two groups (apparently borrowed from Java):

#### Primitive types
* Primitive types (5 of them)
  * Numbers
  * Strings
  * Booleans
  * null
  * undefined

**Note:** primitives are not objects, but you may have seen calls of the form APrimitiveType.method. That's because numbers, strings and booleans have the concept of "wrapper objects".

#### Object types
* Object types (object) (every data type other than the 5 primitives is an object type)
  * Plain objects (name-value pairs)
  * Arrays
  * Functions - JavaScript can treat function objects like ordinary objects

#### Strict mode: use strict
If you know a bit of JavaScript history, you'll know Brendan Eich designed it in ten days, drawing mainly on Scheme, Self, C, Java and other languages. Even with existing languages to borrow from, a really rigorous design in that little time wasn't realistic, so JavaScript carried some hidden flaws from the very start. Add the rapid spread during the browser wars, and these flaws never had enough time to be fixed before becoming part of the standard, which is why they have stuck around.

For a quick look at these flaws, see Ruan Yifeng's (a well-known Chinese tech blogger) article [Ten design flaws of JavaScript](https://www.ruanyifeng.com/blog/2011/06/10_design_defects_in_javascript.html), and the book *JavaScript: The Good Parts*.

use strict is actually a directive added in ECMAScript 5. It's very close to a statement but differs from one: it contains no keyword, is just a string literal, and can only appear in particular positions.

The purpose of use strict is to make the code after it run in JS's "strict mode", a subset of the language that fixes some important flaws and provides robust error checking and stronger security. Strict and non-strict mode differ in some important ways:

* The with statement can't be used in strict mode
* In strict mode every variable must be declared with var first (in non-strict mode, using an undeclared variable adds a new property to the global object)
* In strict mode, the this value in a function call is undefined rather than the global object.

## Fuzzy points
### Wrapper objects
Primitives are not objects, but you may have seen calls of the form APrimitiveType.method. That's because numbers, strings and booleans have the concept of "wrapper objects". In other words, when you use the . operator on one of them, JavaScript automatically calls new String(s) | new Number(s) | new Boolean(s) to temporarily convert these three primitive types into objects that inherit the methods of the corresponding type.

```javascript
// A classic example
var s = "test";
s.len = 4;  // Because of the dot operator, a temporary String object is created here, but it is destroyed right away
var t = s.len; // A String object is created here too, but it is not the one above, hence undefined
```

* null and undefined have no wrapper objects
* You can construct wrapper objects explicitly with the constructors.

### Variable hoisting and variable configurability
* Hoisting
  * A variable declared with var is moved up to the top of the scope it lives in
* Configurability
  * Global variables are properties of the global object; local variables have no such rule
  * Global variables declared with var are non-configurable and can't be removed with the delete operator

### The eval operator
eval() is actually a function, but it has long been treated as an operator. ECMAScript tries to constrain how eval() behaves so that it looks like an expression.

That's because treating eval as an ordinary function without any restrictions has many drawbacks. First, eval() executes code dynamically, which breaks the original code structure and is hard for the interpreter to optimize. Second, if eval were an ordinary function, it could be assigned to another name, say g = eval, so anywhere g is used would have the same problem, making JavaScript code hard to optimize and performance worrying.

In short, if eval behaves like an operator, these serious problems go away. So the ECMAScript grammar keeps constraining it to make it behave more like an operator.

### Labeled statements
Mainly used together with continue and break to allow more flexible jumps.

### throw/try/catch/finally statements
I wrote an earlier post, [Python Pitfalls I Fell Into](/en/2016/01/10/traps-in-python/), which covered an easy trap with try/except/finally in Python.

JavaScript has the same trap. As that post explains, since finally is designed to run no matter what, once a jump statement appears in finally, whatever the other blocks return is ignored.

```javascript
function finallyTest(){
    var x = 'catch', y = 'except', z = 'finally';
    try {
        k = x + y;
        a = b;
        console.log("here is try------------");
    } catch(e) {
        console.log("here is catch----------");
        return x;
    } finally{
        console.log("here is finally---------");
        return z;
    }
}
// Run
finallyTest()
// Return value
here is catch----------
here is finally---------
'finally'
```

### Function names
```js
// A function declared directly has a function name
function foo(){}
foo.name  // the function name is foo
var bar = foo
bar.name  // assigning a function to a variable just points the variable at the function structure; it does not change the structure itself
// A function expression produces an anonymous function
var foo = function(){}
foo.name // "" (empty string)
// The function name exists only inside the function's own structure, and passing it around does not change that structure
function foo(){}
var o ={
    a: 'a',
    bar: foo
};
o.bar.name // foo
```

### Losing the this reference
```js
// Can happen when a function is passed around several times
function foo(){
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo;
var a="oops, global";
bar(); //"oops, global"
// Can happen in callbacks (async)
// same code as above
setTimeout(obj.foo, 100); // "oops, global"
```
