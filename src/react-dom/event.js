// 定义事件类型的方法字典
const eventTypeMethods = {
  // key 原生的事件名，值是一个对象
  //                 key 是 事件阶段，值是对应的绑定元素上的方法
  click: {
    capture: "onClickCapture",
    bubble: "onClick",
  },
};

// 事件传播的两个阶段
const phases = ["capture", "bubble"];
/**
 * 设置事件委托，把所有事件都绑定在容器 container 上
 * @param {*} container root 根节点
 */

export function setupEventDelegation(container) {
  // 遍历所有的事件
  Reflect.ownKeys(eventTypeMethods).forEach((eventType) => {
    // 遍历两个阶段，capture、bubble
    phases.forEach((phase) => {
      // 给容器添加事件监听
      // eventType click， nativeEvent 原生的事件对象
      container.addEventListener(
        eventType,
        (nativeEvent) => {
          // console.log("nativeEvent", nativeEvent);
          // 模拟事件传播顺序，把事件传播路径上所有DOM元素绑定的 React事件取出来按顺序执行
          const composedPath = nativeEvent.composedPath(); // 默认是冒泡顺序
          // console.log("path", path);
          const elements =
            phase === "capture" ? composedPath.reverse() : composedPath;

          // 拼出来方法名 onClick/onClickCapture
          const methodName = eventTypeMethods[eventType][phase];
          // 遍历所有的 DOM 元素，执行它身上绑定的Rect事件监听函数
          elements.forEach((element) => {
            element.reactEvents?.[methodName]?.(nativeEvent);
          });
        },
        phase === "capture"
      );
    });
  });
}
