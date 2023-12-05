import React from "./react";
class ClassComponent extends React.Component {
  parentBubble = () => {
    console.log("父节点 冒泡阶段执行");
  };

  childBubble = () => {
    console.log("子节点 冒泡阶段执行");
  };

  parentCapture = () => {
    console.log("父节点 捕获阶段执行");
  };

  childCapture = () => {
    console.log("子节点 捕获阶段执行");
  };
  render() {
    return (
      <div
        id="parent"
        onClick={this.parentBubble}
        onClickCapture={this.parentCapture}
      >
        <button
          id="child"
          onClick={this.childBubble}
          onClickCapture={this.childCapture}
        >
          click
        </button>
      </div>
    );
  }
}

setTimeout(() => {
  const root = document.getElementById("root");
  // 不能直接使用 parent.addEventListener 因为 window 上有 默认的 parent 属性
  const parent = document.getElementById("parent");
  const child = document.getElementById("child");

  root.addEventListener("click", () => {
    console.log("  原生的 根节点 冒泡阶段执行");
  });

  parent.addEventListener("click", () => {
    console.log("  原生的 父节点 冒泡阶段执行");
  });

  child.addEventListener("click", () => {
    console.log("  原生的 子节点 冒泡阶段执行");
  });

  root.addEventListener(
    "click",
    () => {
      console.log("  原生的 根节点 捕获阶段执行");
    },
    true
  );

  parent.addEventListener(
    "click",
    () => {
      console.log("  原生的 父节点 捕获阶段执行");
    },
    true
  );

  child.addEventListener(
    "click",
    () => {
      console.log("  原生的 子节点 捕获阶段执行");
    },
    true
  );
}, 500);
/**
  父节点 捕获阶段执行
  子节点 捕获阶段执行
    原生的 根节点 捕获阶段执行
    原生的 父节点 捕获阶段执行
    原生的 子节点 捕获阶段执行
    原生的 子节点 冒泡阶段执行
    原生的 父节点 冒泡阶段执行
  子节点 冒泡阶段执行
  父节点 冒泡阶段执行
    原生的 根节点 冒泡阶段执行
 */

// const App = <ClassComponent />;
const App = React.createElement(ClassComponent);
console.log("App", App);

export default App;
