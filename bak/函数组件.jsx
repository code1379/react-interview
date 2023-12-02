import React from "./react";
/**
 * 函数组件就是一个函数,可以返回一个虚拟DOM
 * @param {*} props 代表传递给此组件的属性对象
 * @returns
 */
const FunctionComponent = (props) => <div>hello {props.name}</div>;

// 下面两种方法等价
// 这是 JSX 写法
// const App = <FunctionComponent name="zhangsan" />;
/**
 * 上面代码 babel 解析完为
  React.createElement(FunctionComponent, {
    name: "zhangsan"
  });
 */

// 这是普通JS写法
// 其实最终JSX在webpack打包编辑的时候会使用babel编译成普通JS（ babel 解析后就变为普通JS写法）
const App = React.createElement(FunctionComponent, { name: "lisi" });
export default App;
