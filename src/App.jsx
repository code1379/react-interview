// 1. 在 JSX 中读取变量，可以使用表达式
const title = "china";

// const App = (
//   <div style={{ color: "red" }} className="container">
//     hello {title} <span style={{ color: "green" }}>world</span>
//   </div>
// );

// 3. 可以进行循环迭代
const arr = ["1", "2", "3"];

const App = (
  <ul>
    {arr.map((item) => {
      return <li key={item}>item</li>;
    })}
  </ul>
);

// 2. 还可以作为函数的参数，还可以作为函数的返回值
// const FunctionApp = () => App;
// const HigherWrapperApp = (App) => App;

export default App;
