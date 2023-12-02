/**
 * 创建DOM容器
 * @param {*} container
 * @returns
 */
function createRoot(container) {
  return {
    // 把虚拟DOM变成真实DOM，并且插入容器container
    render(vdom) {
      // 把虚拟DOM变成真实DOM
      const domElement = renderElement(vdom);
      // 将真实DOM添加到容器中
      container.appendChild(domElement);
    },
  };
}
/**
 * 将虚拟DOM转换为真实DOM
 * @param {*} vdom 可能是一个对象 {type, props} 可能是一个字符串或数字 “xxx” 1（还有可能是数组？）
 */
function renderElement(vdom) {
  //* 如果 vdom 是一个数字或者一整个字符串，则创建一个文本节点并返回
  if (typeof vdom === "string" || typeof vdom === "number")
    return renderText(vdom);

  // 取出元素类型和属性对象
  // type 可能的类型 1. 原生DOM标签 2.函数（类和函数）
  const { type, props } = vdom;

  // 如果元素/虚拟DOM的类型是一个函数的话
  if (typeof type === "function") {
    // 类组件
    if (type.isReactComponent) {
      // 把属性对象传递给类组件的构造函数，返回类组件的实例
      const instance = new type(props);
      // 调用实例上的render方法，返回将要渲染的虚拟DOM
      const classVdom = instance.render();
      // 将虚拟DOM传递给renderElement返回真实DOM
      return renderElement(classVdom);
    } else {
      // 处理函数组件
      // 把属性对象传递给函数组件这个函数，返回一个React元素(vdom) => 函数的执行的结果是vdom
      const functionVdom = type(props);
      // 把函数组件返回的React元素传递给renderElement，创建真实DOM
      return renderElement(functionVdom);
    }
  }

  // 根据type创建真实DOM
  const domElement = document.createElement(type);
  // 处理属性 ['style', 'className', 'children']
  Object.keys(props).forEach((key) => {
    // 1. children
    // 2. style
    // 3. others

    // 后面单独处理儿子
    if (key === "children") return;
    // 如果是行内样式属性的话，则直接覆盖到真实DOM的style上
    if (key === "style") {
      Object.assign(domElement.style, props.style);
    } else {
      // 先暂时不处理事件绑定
      domElement[key] = props[key];
    }
  });

  // 将children格式化为数组
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  // 遍历children数组
  children.forEach((child) => {
    // 将每个儿子都从虚拟DOM（vdom）变成真实DOM，并插入到父节点中
    const childrenDomElement = renderElement(child);
    domElement.appendChild(childrenDomElement);
  });

  return domElement;
}

function renderText(vdom) {
  return document.createTextNode(vdom);
}

const ReactDOM = {
  createRoot,
};

export default ReactDOM;
