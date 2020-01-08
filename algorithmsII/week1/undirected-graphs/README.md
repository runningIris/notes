# Undirected Graphs

### Introduction to Graphs

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

### Graph API

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
class Graph {
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
