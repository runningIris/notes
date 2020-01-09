# Directed Graphs

Set of vertices connected by directed edges.

## Some Digraph Problems

- Path. Is there a directed path from s to t
- Shortest Path. What is the shortest directed path from s to t ?
- Topological Sort. Can you draw a digraph that all edges point upwards?
- Strong Connectivity. Is there a directed path between all pairs of vertices?
- Transitive closure. For which vertices v and w is there a path for v to w?

## Digraph API
``` java
public class Digraph {
    Digraph(int v)
    Digraph(In in)
    void addEdge(int v, int w)
    Iterable<Integer> adj(int v)
    int V()
    int E()
    Digraph reverse()
    String toString()
}
```

### Java Implementation

``` java
public class Digraph {
    private final int V;
    private final Bag<Integer>[] adj;

    public Digraph(int V) {
        this.V = V;
        adj = (Bag<Integer>[]) new Bag[V];
        for (int v = 0; v < V; v++) {
            adj[v] = new Bag<Integer>();
        }
    }
    public void addEdge(int v, int w) {
        adj[v].add(w);
    }
    public Iterable<Integer> adj(int v) {
        return adj[v];
    }
}
```

## Reachability application

### program control-flow analysis

- Every program is a digraph.
    * vertex: basic block of instructions(straight-line program)
    * edge: jump

- Dead code elimination.
    Find and remove unreachable codes

- Infinite-loop detection.
    Determine whether exit is reachable

### mark-sweep garbage collector

- Every data structure is a digraph.
    * vertex: Object
    * edge: Reference

- Roots. Object known to be directly accessible by program (eg: stack)

- Reachable Objects.
    Objects indirectly reachable by programs(starting at the root and following by a chain of pointers).

- Mark-sweep Algorithm
    * Mark. Mark all reachable objects.
    * Sweep. If an object is not marked, it is garbage(so add to free list).

- Memory Cost.
    Uses 1 extra mark bit per object (plus DFS stack).

## Breadth-first search

### Multiple-source shortest paths

### Digraph application: web crawler

## Topological sort

### Precedence scheduling

任务的先后顺序有限制：有些任务必须在完成另一些任务后才能开启

- Goal. Given a set of tasks to be completed with precedence constraints, in which order should we schedule the tasks?

- Digraph model.
    * vertex = task
    * edge = precedence constraints

Example:

|Task | Course                  |
|-----|-------------------------|
|   0 | Algorithm               |
|   1 | Complexity Theory       |
|   2 | Artificial Intelligence |
|   3 | Intro to CS             |
|   4 | Cryptography            |
|   5 | Scientific Computing    |
|   6 | Advanced Programming    |

对 task 进行排序

### DAG. Directed Acyclic Graph 有向无环图

可以重绘 DAG, 以至所有的 edge 都朝上

### Depth-first search order
``` java
public class DepthFirstOrder {
    private int[] marked;
    private Stack<Integer> reversePost;
    public DepthFirstOrder(Digraph G) {
        reversePost = new Stack<Integer>();
        marked = new int[G.V()];
        for (int v = 0; v < G.V(); v++) {
            if (!marked[v]) dfs(G, v);
        }
    }
    private void dfs(Digraph G, int s) {
        marked[s] = true;
        for (int w: G.adj(v)) {
            if (!marked[w]) dfs(w);
        }
        reversePost.push(s); // 完成vertex的dfs之后再压入栈
    }
    public Iterable<Integer> reversePost() {
        return reversePost;
    }
}
```

### Directed Cycle Detection Applications

- cyclic class inheritance.
    The Java Compiler does cycle detection:
- spreadsheet recalculation.
    Microsoft Excel does cycle detection (and has a circular reference toolbar!)

## Strong Components

Definition.

Vertices v and w are strongly connected if there are a directed path from v to w and a directed path from w to v.

### Kosaraju-sharrir Algorithm

- Reverse Graph
- Kernel DAG. Contract each strong component into a single vertex
- Idea
    * Compute topological order (reverse postorder) in kernel DAG.
    * Run DFS, considering vertices in reverse topological order.
