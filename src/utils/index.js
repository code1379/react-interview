import { REACT_TEXT } from "../constants";

export function isUndefined(val) {
  return val === null || val === undefined;
}

export function isDefined(val) {
  return val !== undefined && val !== null;
}

function isNumber(val) {
  return typeof val === "number";
}

function isString(val) {
  return typeof val === "string";
}

/**
 * 味蕾更寓意话，也为了方便后面进行 DOMDIFF，我们把文本节点包装成虚拟DOM
 * @param {*} element
 * @returns
 */
export function wrapToVdom(element) {
  if (isNumber(element) || isString(element)) {
    return {
      type: REACT_TEXT,
      props: element,
    };
  } else {
    return element;
  }
}

/**
 * 把一个人一的值包装成一个数组
 * 如果是多维数组的话要打平成一维 [[a,b],[c,d]]
 * @param {*} val
 * @returns
 */
export function wrapToArray(val) {
  return Array.isArray(val) ? val.flat() : [val];
}
