# Undirected Graphs

## Introduction to Graphs

- Path: Sequences of vertices connected by edges
- Cycle: path whose first vertice and last vertice are the same

### Some graph-processing programs
- Path: is there a path between s and t
- Shortest path
- Cycle: is there a cycle in the graph
- Euler tour: is there a cycle that uses each edges exactly once
- Hamilton tour: is there a cycle that uses each vertex exactly once
- Connectivity: is there a path that connects all vertices
- MST: what is the best way to connect all vertices
- Biconnectivity: is there a vertex whose removal disconnects the graph
- Planarity(平行): Can you draw the graph in the plane with no crossing edges
- Graph isomorphism: Do two adjacency lists represent the same graph?

## Graph API

```
class Graph {
               Graph(int V)
               Graph(In in)
          void addEddge(int v, int w)
 Iterable<int> adj(int v)
           int V()
           int E()
        String toString()
}
```

- Compute the degree of v
    ``` java
    public static int degree(Graph G, int v) {
        int degree = 0;
        for (int w: G.adj(v)) {
            degree++;
        }
        return degree;
    }
    ```
- Compute the maximum degree
    ``` java
    public static int maxDegree(Graph G) {
        int max = 0;
        for (int v = 0; v < G.V(); i++) {
            int current = degree(G, v);
            if (current > max) {
                max = current;
            }
        }
        return max;
    }
    ```
- Compute average degree
    ``` java
    public static int averageDegree(Graph G) {
        return 2.0 * G.E() / G.V();
    }
    ```
- Count self-loops
    ``` java
    public static int numberOfSelfLoops(Graph G) {
        int count = 0;
        for (int v = 0; v < G.V(); i++) {
            for (int w: G.adj(v)) {
                if (v == w) count++;
            }
        }
        return count / 2;
    }
    ```

### Java Implementation

``` java
public class Graph {
    private final int V;
    private Bag<Interger>[] adj;
    Graph(int V) {
        this.V = V;
        adj = (Bag<Interger>[])new Bag[V];

        for (int v = 0; v < V; v++) {
            adj[v] = new Bag<Interger>();
        }
    }
    void addEddge(int v, int w) {
        adj[v].add(w);
        adj[w].add(v);
    }
    Iterable<int> adj(int v) {
        return adj[v];
    }
    int V() {
        return V;
    }
}
```

## Depth First Search

- Trémaux Maze Exploration Algorithm
    * Unroll a ball of string behind you 探索迷宫时系一根绳子
    * Mark each visited intersection and each visited passage 记录每个经过的节点和每条路径
    * Retrace steps when no unvisited options 如果前面没有未走过的节点，则返回一步

- Goal: Systematically search through a graph

- idea: mimic maze exploration

- DFS(to visit a vertex v):
    * Mark v as visited
    * Recursively visit all unmarked vertices w adjacent to v

### Design pattern for graph processing

Design pattern. Decouple graph data type from graph processing

* Create a Graph object
* Pass the Graph to a graph-processing routine
* Query the graph-processing routine for information

API:
```
public class Paths {
    Path(Graph G, int s)
    boolean hasPathTo(int v)
    Iterable<Interger> pathTo(int v)
}
```

Usage:
``` java
Paths paths = new Paths(G, s);
for (int v = 0; v < G.V(); v++) {
    if (paths.hasPathTo(v)) {
        StdOut.println(v); // print all the vertices connected to s
    }
}
```

### Depth-first Search Demo: to visit a vertex v

* Mark vertex v as unvisited
* Recursively visit all unmarked vertices adjacent to v

- Goal: Find all vertices connected to s

- Algorithm
    * Use recursion(ball of string)
    * Mark each visited vertex(and keep track of edge taken to visit it).
    * Return(retrace steps) when no unvisited options

- Data Structures
    * `boolean[] marked`
    * `int[] edgeTo` to keep track of paths

- Implementation

    ``` java
    public class DepthFirstPaths {
        private boolean[] marked;
        private int[] edgeTo;
        private int s;
        public DepthFirstPaths(Graph G, int s) {
            this.s = s;
            marked = new boolean[G.V()];
            edgeTo = new int[G.V()];
            dfs(G, s);
        }
        private void dfs(Graph G, int v) {
            marked[v] = true;
            for (int w: G.adj(v)) {
                if (!marked[w]) {
                    dfs(G, v);
                    edgeTo[w] = v;
                }
            }
        }
        public boolean hasPathTo(int v) {
            return marked[v];
        }
        public Iterable<Interger> pathTo(int v) {
            if (!hasPathTo(v)) return false;
            Stack<Interger> path = new Bag();
            path.push(v);
            while (v != s) {
                int prev = edgeTo[v]
                path.push(prev);
                v = prev;
            }
            return path;
        }
    }
    ```

## Breadth-First Search

Repeat until the queue is empty:

- Remove vertex v from queue
- Add to queue all unmarked vertices adjacent to v, and mark them

### Java Implementation
``` java
public class BreadthFirstSearch {
    private boolean[] marked;
    private int[] edgeTo;
    private Queue<Interger> q;
    public BreadthFirstSearch(Graph G, int s) {
        marked = new boolean[G.V()];
        edgeTo = new int[G.V()];
        q = new Queue<Interger>();

        marked[s] = true;
        q.enqueue(s);

        while (!q.isEmpty()) {
            int v = q.dequeue();
            for (int w: G.adj(v)) {
                if (!marked[w]) {
                    edgeTo[w] = v;
                    marked[w] = true;
                    q.enqueue(w);
                }
            }
        }
    }
}
```

### Difference between Depth-First Search and Breadth-First Search

- Depth-First Search: put unvisited vertex in a stack
- Breadth-First Search: put unvisited vertex in a queue

### Shortest path

Find path from s to t using fewest number of edges

## Connected Components

``` java
public class CC {
    private boolean[] marked;
    private int[] id;
    private int count;
    public CC(Graph G) {
        marked = new boolean[G.V()];
        id = new int[G.V()];
        count = 0;
        for (int v = 0; v < G.V(); v++) {
            if (!marked[v]) {
                dfs(G, v);
                count++;
            }
        }
    }

    private void dfs(G, v) {
        marked[v] = true;
        id[v] = count;
        for (int w: G.adj(v)) {
            if (!marked[w]) dfs(G, w);
        }
    }
    public int count() {
        return count;
    }
    public int id(int v) {
        return id[v];
    }
}
```
