# Interview Questions

### 1. Nonrecursive depth-first search. Implement depth-first search in an undirected graph without using recursion.

``` java
public class DepthFirstSearchWithoutRecursion {
    private boolean[] marked;
    private int[] edgeTo;
    private Stack<Integer> stack;
    public DepthFirstSearchWithoutRecursion(Graph G, int s) {
        marked = new boolean[G.V()];
        edgeTo = new int[G.V()];
        stack = new Stack<Integer>();
        marked[s] = true;
        stack.push(s);
        while(!stack.isEmpty()) {
             int v = stack.pop();
             for (int w: G.adj(v)) {
                 if (!marked[w]) {
                     marked[w] = true;
                     edgeTo[w] = v;
                     stack.push(w);
                  }
             }
        }
    }
}
```

### Diameter and center of a tree. Given a connected graph with no cycles

- Diameter: design a linear-time algorithm to find the longest simple path in the graph.
- Center: design a linear-time algorithm to find a vertex such that its maximum distance from any other vertex is minimized.



### Euler cycle. An Euler cycle in a graph is a cycle (not necessarily simple) that uses every edge in the graph exactly one.

- Show that a connected graph has an Euler cycle if and only if every vertex has even degree.
- Design a linear-time algorithm to determine whether a graph has an Euler cycle, and if so, find one.
