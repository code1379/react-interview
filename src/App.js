import React from "react";
// import React from "./react";

// import { removePrivateProps } from "zhang-utils";
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

console.log("%c Line:4 🍕 App", "color:#3f7cff", App);
// console.log(JSON.stringify(removePrivateProps(App, ["key", "ref"], null, 2)));
/* 
vdom 结构
{
	"type": "div",
	"props": {
		"style": {
			"color": "red"
		},
		"className": "container",
		"children": ["hello", " ", {
			"type": "span",
			"props": {
				"style": {
					"color": "green"
				},
				"children": "world"
			}
		}]
	}
}
*/

export default App;
