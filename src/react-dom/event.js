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
          // 根据原生事件创建合成事件
          const syntheticEvent = createSyntheticEvent(nativeEvent);
          // console.log("nativeEvent", nativeEvent);
          // 模拟事件传播顺序，把事件传播路径上所有DOM元素绑定的 React事件取出来按顺序执行
          const composedPath = syntheticEvent.composedPath(); // 默认是冒泡顺序
          // console.log("path", path);
          const elements =
            phase === "capture" ? composedPath.reverse() : composedPath;

          // 拼出来方法名 onClick/onClickCapture
          const methodName = eventTypeMethods[eventType][phase];
          // 遍历所有的 DOM 元素，执行它身上绑定的Rect事件监听函数
          for (let element of elements) {
            // 如果某个方法执行的时候已经调用了e.stopPropagation，则表示阻止传播了，跳出循环即可
            if (syntheticEvent.isPropagationStopped()) {
              break;
            }
            element.reactEvents?.[methodName]?.(syntheticEvent);
          }
        },
        phase === "capture"
      );
    });
  });
}

/**
 * 根据原生事件对象创建合成事件对象
 * @param {*} nativeEvent
 */
function createSyntheticEvent(nativeEvent) {
  // 当前事件是否已经阻止传播了
  let isPropagationStopped = false;
  // 当前事件是否已经阻止默认行为
  let isDefaultPrevented = false;
  const target = {
    nativeEvent,
    preventDefault() {
      if (nativeEvent.preventDefault) {
        nativeEvent.preventDefault();
      } else {
        // IE
        nativeEvent.returnValue = false;
      }
      isDefaultPrevented = true;
    },
    stopPropagation() {
      if (nativeEvent.stopPropagation) {
        nativeEvent.stopPropagation();
      } else {
        // IE
        nativeEvent.cancelBubble = true;
      }
      isPropagationStopped = true;
    },
    isDefaultPrevented() {
      return isDefaultPrevented;
    },
    isPropagationStopped() {
      return isPropagationStopped;
    },
  };
  const handler = {
    get(target, key) {
      // 如果此属性是 target 上自己定义的属性，则返回重写后的方法和属性
      if (target.hasOwnProperty(key)) {
        // 直接返回被代理对象的属性
        // return target[key];
        return Reflect.get(target, key);
      } else {
        // return nativeEvent[key]
        // 先取出属性上的值
        const value = Reflect.get(nativeEvent, key);
        // 如果是函数的话，绑定一下 this，保证在调用函数的时候 this 指向原生的事件对象 nativeEvent
        if (typeof value === "function") {
          return value.bind(nativeEvent);
        } else {
          return value;
        }
      }
    },
  };
  // 根据原生事件创建代理对象
  const syntheticEvent = new Proxy(target, handler);
  return syntheticEvent;
}
