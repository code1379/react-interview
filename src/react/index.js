/**
 *
 * @param {*} type DOM类型
 * @param {*} config 配置对象，也就是属性
 * @param {*} children 儿子或儿子们
 */
function createElement(type, config, children) {
  // 创建 props对象，也就是属性对象
  const props = { ...config };

  // children 可能有一个也可能有多个
  // 如果参数数量大于 3 个，说明不止一个儿子
  if (arguments.length > 3) {
    // 多个儿子
    // 以arguments作为this指针，调用数组上的 slice 方法，把第三个参数开始的实参都放到数组里
    props.children = Array.prototype.slice.call(arguments, 2);
  } else {
    // 如果没有儿子（没有传递默认为 undefined），或者只有一个儿子，那么直接把children赋值给props.children就可以
    // 我看官方是 没有儿子，props 上就没有 children 属性。一个儿子的话，就是 children 本身
    props.children = children;
  }

  return {
    type,
    props,
  };
}

// 在 ES6 中，类其实是一个语法糖，本质上是一个函数
class Component {
  // 给类上添加静态属性，用来判断是类组件还是函数组件
  static isReactComponent = true;
  constructor(props) {
    // 将收到属性保存到自己的实例上
    this.props = props;
  }
}

const React = {
  createElement,
  Component,
};

export default React;
