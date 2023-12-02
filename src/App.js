// import React from "react";
import React from "./react";

const App = React.createElement(
  "div",
  {
    style: { color: "red" },
    className: "container",
  },
  "hello",
  " ",
  React.createElement(
    "span",
    {
      style: { color: "green" },
    },
    "world"
  )
);

export default App;
