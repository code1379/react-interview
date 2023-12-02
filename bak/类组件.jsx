import React from "./react";

/**
 * 定义一个类组件集成自父类React.Component
 * 定义的类组件必须编写（实现）一个名为 render 的函数，负责返回要渲染的虚拟DOM
 */
class ClassComponent extends React.Component {
  constructor(props) {
    super(props); // this.props = props
    // 在内部会把收集到的属性对象放在自己的实例上，以后可以通过this.props访问
  }

  render() {
    const { name } = this.props;
    return <div>hello {name}</div>;
  }
}

// babel 会把属性收集起来变成一个props属性对象，并传递给类组件的构造函数
// const App = <ClassComponent name="zhangsan"/>
const App = React.createElement(ClassComponent, { name: "lisi" });
export default App;
