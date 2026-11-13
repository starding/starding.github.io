# Python Pitfalls I Fell Into: Import Paths, try/finally, and Dict Comprehensions

> Past experience, if not forgotten, is a guide for the future. (前事不忘，后事之师) — *Strategies of the Warring States*, "Strategies of Zhao I"

## Module Imports in Python
### Package Imports
This one is fairly simple, so a single example will do. Still, it did trip me up when I was starting out…

```python
# File structure:
packages
├── __init__.py
└── my_module.py
# This is a package import
import packages
# What follows is obtained from attributes defined in __init__.py
packages.some_module.some_method
# This treats the package as one step on the search path
from packages import some_module
some_module.some_method
```

### The Module Search Path
Consider the following scenario:

```python
# Django has a common app, and it has been added to the installed apps list
# File structure of the common app
common
├── __init__.py
├── common.py
├── others.py
└── somethings.py
# somethings.py contains this import statement
from common.others import some_func   # raises an error
```

In the code above, because the names are the same and the search path by default starts from the directory of the code currently being executed, the `common` file is found before the `common` package, so it shadows the package on the search path. Once `common` is found, Python looks for `some_func` in the `common` file, can't find it, and raises an error.

## Execution Order in try-except-finally
In Python exception handling, the `finally` clause is always executed, whether or not an exception is raised in the `try` clause. Because of this, `finally` is often used for cleanup, such as closing files or database connections.

If an exception occurs in try-except-finally and is not properly handled, Python first stashes the exception, and after the actions in `finally` have finished, it passes the stashed exception up to the caller. This execution order is what creates some potential traps.

Look at this example:

```python
def finallyTest():
    print 'start------'
    while  True:
        try:
            print "running------"
            raise IndexError("r")   # raise an IndexError
        except NameError as e:
            print 'NameError happended {0}'.format(str(e))
            break
        finally:
            print 'finally executed'
            break # there is a break statement in finally
            
# run the test function
FinallyTest()
# output:
start------
running------
finally executed
```

In this example, the `try` clause raises an `IndexError`, and the `except` clause doesn't catch it. You would normally expect the error to propagate up to the caller (here, to the interpreter) and trigger an `IndexError`. But after the whole function runs, no exception appears.

The reason is that when an exception occurs in the `try` block and no matching handler is found in the `except` clauses, the exception is "stashed temporarily." When `finally` finishes, the stashed exception is "raised again." But if `finally` raises a new exception or executes a `return` or `break` statement, the stashed exception is lost, which leads to "exception masking."

Another, slightly more complicated example:

```py
import logging
logger = logging.Logger(__name__)
def returnTest(a):
    try:
        if a == False:
            raise ValueError("data can not be False")
        else:
            return a  
    except ValueError as e:
        logger.exception("exception!, {detail}").fomat(detail)
        return "return exception in except statement" 
    finally:
        return "return in finally statement"
print returnTest(False)
print returnTest(True)
```

You would normally expect the first `print` to trigger the error, enter the `except` clause and log the exception, and since the statements in `finally` always run, it returns 'return in finally statement'. The second should return `True`. In fact, both return 'return in finally statement'.

The reason is the same as in the previous example. Whether in the `try` suite or the `except` suite, a `return` or `break`, any statement that makes the program jump, is saved first. Then the statements in `finally` are executed, and as soon as `finally` contains a jump statement, the program jumps right away, so the saved state above simply disappears.

## The Limits of Dict Comprehensions
On one project I ran into an operation that had to query the database many times. Specifically, there were companies, each with attributes such as a name and a company code. Fetching company information from the database every time caused performance problems, so I decided to cache it in a dictionary and wanted to use a dict comprehension. I found that each iteration of a comprehension can only produce a single entry. I had never noticed this before, so I'm writing it down here.

```py
# This works
>>>{model.key: model.value for Modle in models }
# The result is an ordinary dictionary
>>>{key1: value1, key2: value2, ...}
# But using it like this is not supported
>>>{model.key1: model.value1, moedel.key2: model.value2 for model in models}
# The workaround is to make the value above a dictionary, or to use a list comprehension and wrap it in one more list
>>>{model.key1: {models.key1: models.value1, model.key2: model.value2, ...} for model in models}
```
Here is the real example. The branch-related parts are branch company information, and the subbranch-related parts are sub-branch company information. The goal is to build a dictionary whose keys are branch company names and whose values are the branch's primary key, its number, and the sub-branches under it. The sub-branches are themselves a dictionary, keyed by sub-branch name with the sub-branch's other information as values. Together this forms a two-level dictionary cache of company data.

```py
companys_by_name = {
        branch.name: {
            "pk": branch.pk,
            "number": branch.number,
            "subbranch": {
                subbranch.name: {"pk":subbranch.pk, "number":subbranch.number} for subbranch in SubbranchCompany.objects.filter(branch_company=branch)
            } for branch in BranchCompany.objects.all()
}
# In detail, the meaning is as follows; sub-branches are companies under a branch
company_info_dict = {
     branch_name:{
        "primary key": primary key of the current branch,
        "company number": company number of the current branch,
        "sub-branches":{
            sub_branch_name:{
                "primary key": primary key of the current sub-branch,
                "sub-branch number": number of the current sub-branch,
            } for sub_branch in sub-branches under the current branch
        }
     } for branch in all branches
}
```
