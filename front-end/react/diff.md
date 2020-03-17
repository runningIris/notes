# React Diff 算法原理

将 Virtual DOM 树转换成 Actual DOM 树的最少操作的过程称为调和。diff算法是调和的具体实现。

## diff策略

React 用三大策略将 O(n^3) 复杂度转化为 O(n) 复杂度

- tree diff
  * Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。
  * React 通过 updateDepth 对 Virtual DOM 树进行层级控制。
  * 对树分层比较，两棵树只对同一层次节点进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较。
  * diff 只简单考虑同层级的节点位置变换，如果是跨层级的话，只有创建节点和删除节点的操作。
    当某个节点看起来好像被“移动”到另一个节点下面的时候，实际上的操作并不是移动，而是销毁当前节点，并创建新的节点，append到另一个节点下。
  * 因此官方建议不要进行 DOM 节点跨层级操作，可以通过 CSS 隐藏、显示节点，而不是真正地移除、添加 DOM 节点。
  
- component diff
  * 拥有相同类的两个组件 生成相似的树形结构，然后继续对比子组件。
  * 拥有不同类的两个组件 生成不同的树形结构。Two elements of different types will produce different trees.
    ``` html
    <div>
      <Counter />
    </div>

    <span>
      <Counter />
    </span>
    ```
    比如在上面代码的对比中，直接删除前面的节点，然后创建并插入新的节点，`<Counter />`会被 destroyed 。
    
    需要注意的是，删除节点意味着彻底销毁该节点，而不是再后续的比较中再去看是否有另外一个节点等同于该删除的节点。
    如果该删除的节点之下有子节点，那么这些子节点也会被完全删除，它们也不会用于后面的比较。这也是算法复杂能够降低到 O（n）的原因。

- element diff 列表节点的对比
  
  对于同一层级的一组子节点，通过唯一id区分。The developer can hint at which child elements may be stable across different renders with a key prop.




