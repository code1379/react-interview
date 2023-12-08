import { REACT_TEXT } from "../constants";
import { isUndefined, wrapToArray } from "../utils";
import { setupEventDelegation } from "./event";
/**
 * 创建DOM容器
 * @param {*} container
 * @returns
 */
function createRoot(container) {
  return {
    // 把虚拟DOM变成真实DOM，并且插入容器container
    render(rootVdom) {
      mountVdom(rootVdom, container);
      setupEventDelegation(container);
    },
  };
}
/**
 * 1. 虚拟DOM生成真实DOM
 * 2. 挂在到父容器中
 * @param {*} vdom
 * @param {*} parentDOM
 */
function mountVdom(vdom, parentDOM) {
  // 把虚拟DOM变成真实DOM
  const domElement = createDOMElement(vdom);
  // 如果没有从虚拟DOM得到真实DOM，则不需要添加到容器里
  if (!domElement) return;
  // 将真实DOM添加到容器中
  parentDOM.appendChild(domElement);
}

function createDOMElementFromTextComponent(vdom) {
  const { props } = vdom;
  return document.createTextNode(props);
}

function createDOMElementFromClassComponent(vdom) {
  const { type, props } = vdom;
  // 把属性对象传递给类组件的构造函数，返回类组件的实例
  const classInstance = new type(props);
  // 调用实例上的render方法，返回将要渲染的虚拟DOM
  const renderVdom = classInstance.render();
  // 将虚拟DOM传递给createDOMElement返回真实DOM
  return createDOMElement(renderVdom);
}

function createDOMElementFromFunctionComponent(vdom) {
  const { type, props } = vdom;
  // 把属性对象传递给函数组件这个函数，返回一个React元素(vdom) => 函数的执行的结果是vdom
  const renderVdom = type(props);
  // 把函数组件返回的React元素传递给createDOMElement，创建真实DOM
  return createDOMElement(renderVdom);
}

/**
 * 根据属性更新DOM元素
 * @param {*} domElement 真实DOM元素
 * @param {*} oldProps 老属性
 * @param {*} newProps 新属性
 */
function updateProps(domElement, oldProps = {}, newProps) {
  Object.keys(newProps).forEach((key) => {
    // 1. children
    // 2. style
    // 3. others

    // 后面单独处理儿子
    if (key === "children") return;
    // 如果是行内样式属性的话，则直接覆盖到真实DOM的style上
    if (key === "style") {
      Object.assign(domElement.style, newProps.style);
    } else if (key.startsWith("on")) {
      // 在 domElement 上添加自定义的React事件对象 reactEvents，用来存放 react 事件
      if (isUndefined(domElement.reactEvents)) {
        domElement.reactEvents = {};
      }
      // { onClick: () => {}, onClickCapture: () => {}}
      domElement.reactEvents[key] = newProps[key];
    } else {
      // 先暂时不处理事件绑定
      domElement[key] = newProps[key];
    }
  });
}

/**
 * 把所有的子节点也从虚拟DOM变成真实DOM，并且挂载到父节点上
 * @param {*} vdom 虚拟dom
 * @param {*} domElement 父元素
 */
function mountChildren(vdom, domElement) {
  const { props } = vdom;
  const children = wrapToArray(props.children);

  // 遍历children数组
  children.forEach((childVdom) => {
    // 将每个儿子都从虚拟DOM（vdom）变成真实DOM，并插入到父节点中
    mountVdom(childVdom, domElement);
  });
}

function createDOMElementFromNativeComponent(vdom) {
  const { type, props } = vdom;
  // 根据type创建真实DOM
  const domElement = document.createElement(type);
  // 根据属性更新DOM元素
  // 处理属性 ['style', 'className', 'children']
  updateProps(domElement, {}, props);

  mountChildren(vdom, domElement);

  return domElement;
}
/**
 * 将虚拟DOM转换为真实DOM
 * @param {*} vdom 可能是一个对象 {type, props} 可能是一个字符串或数字 “xxx” 1（还有可能是数组？）
 */
function createDOMElement(vdom) {
  // 1. 如果传递的vdom是空，则直接返回null
  if (isUndefined(vdom)) return null;
  // ! 这里是因为后面走的都是babel的transform，但是在 vite 里面我不知道怎么关闭。 当是文本类型的时候 vdom 还是文本。没有走我们 React.createElement 把这个vdom包裹

  // 取出元素类型和属性对象
  // type 可能的类型 1. 原生DOM标签 2.函数（类和函数）
  const { type } = vdom;

  // 2. 文本节点
  //* 如果 vdom 是一个数字或者一整个字符串，则创建一个文本节点并返回
  // 如果虚拟DOM 是一个文本节点
  if (type === REACT_TEXT) {
    return createDOMElementFromTextComponent(vdom);
  } else if (typeof type === "function") {
    // 如果元素/虚拟DOM的类型是一个函数的话
    // 类组件
    if (type.isReactComponent) {
      return createDOMElementFromClassComponent(vdom);
    } else {
      // 处理函数组件
      return createDOMElementFromFunctionComponent(vdom);
    }
  } else {
    // 原生节点
    return createDOMElementFromNativeComponent(vdom);
  }
}

const ReactDOM = {
  createRoot,
};

export default ReactDOM;
