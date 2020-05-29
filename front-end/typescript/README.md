# TypeScript

## **.d.ts 声明文件

参考资料：[声明文件 - TypeScript 入门教程](https://ts.xcatliu.com/basics/declaration-files)

### 作用

- 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
- 在项目中声明全局变量的类型、声明全局接口等(如语法部分所示)

### 如何使用声明文件

因为ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。

- 来自第三方库的声明文件：`npm i @types/xxx`
- 自定义的声明文件建议和其他源码一起放到 src 目录下（或者对应的源码目录下）

### 语法

- `declare var` 声明全局变量
- `declare function` 声明全局方法
- `declare class` 声明全局类
- `declare enum` 声明全局枚举类型
- `declare namespace` 声明（含有子属性的）全局对象
- `interface` 和 `type` 声明全局类型
- `export` 导出变量
- `export namespace` 导出（含有子属性的）对象
- `export default ES6` 默认导出
- `export = commonjs` 导出模块
- `export as namespace UMD` 库声明全局变量
- `declare global` 扩展全局变量
- `declare module` 扩展模块
- `/// <reference />` 三斜线指令

## 在 React 项目中使用 TypeScript

[优雅的在 react 中使用 TypeScript](https://juejin.im/post/5bed5f03e51d453c9515e69b)

- ECMAScript 的内置对象，Boolean、Error、Date、RegExp 等。
  参考：[Standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
- DOM 和 BOM 的内置对象，Document、HTMLElement、Event、NodeList 等。
  参考：[TypeScript 核心库的定义文件](https://github.com/microsoft/TypeScript/tree/master/src/lib)
- 使用组件声明时的 class App extends Component<IProps, IState> 泛型参数声明，来代替PropTypes！
- 全局变量或者自定义的window对象属性，统一在项目根下的global.d.ts中进行声明定义
- 对于项目中常用到的接口数据对象，在types/目录下定义好其结构化类型声明
- 函数式组件的声明 `const List: React.FC<IProps> = props => null`
- 只要在组件内部使用了props和state，就需要在声明组件时指明其类型

