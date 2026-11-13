# Topological Sort: Resolving JavaScript Module Dependency Order

## Topological Sort
When I first heard the term "topological sort", I drew a complete blank. I ran through everything in my head and found nothing related to it. I'd studied graph algorithms as an undergraduate, but that mostly focused on graph connectivity, spanning trees, depth-first search, breadth-first search and so on. There didn't seem to be any "topological sort".

Only after learning what it basically is and where it's used did I realize that it had been there all along; I just hadn't clearly recognized the concept or its importance.

### Module Dependencies in JavaScript
Anyone who writes JavaScript has probably run into the concept in the title. For example, there's a module A that depends on modules B, C and D; module B in turn depends on C, E and F; module C depends on D, E, F and G.

Put another way:

```javascript
// module: {dependencies}
A: {B, C, D}
B: {C, E }
C: {D, E}
D: {E}
E: {}
```

If you're asked to write a program that computes the dependencies of every module in a system of interdependent modules, with the final output shown in the figure, how should you go about it?

### Traversing the Graph Directly
Clearly, the module dependencies need to be converted into a graph data structure. Before I learned about topological sort, my instinct was that once the graph was built, I'd just pick a node, say A, start traversing from it, add every path A can reach, and merge them into A's dependencies. This could be optimized with DFS or BFS.

### Topological Sort
See [Topological Sorting](https://songlee24.github.io/2015/05/07/topological-sorting/) directly.

## The Heap Data Structure
