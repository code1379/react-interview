# React 面试

## 1. 什么是React

React 是由 Facebook 开发维护的 JavaScript 库，用于构建用户界面，特别是单页面应用

它的主要特点

1. 虚拟DOM
2. 声明式编程
3. JSX
4. 组件化
5. 单向数据流
6. 生态丰富

## 2. 什么是虚拟DOM

虚拟DOM
因为直接操作DOM代价是高昂的，可能会引起浏览器的重排和重绘
虚拟DOM其实是一个真实DOM的轻量级表示，本质上是一个JS对象，映射成为真实DOM的结构和属性
引入虚拟DOM的目的是为了最小化 真实DOM操作次数，从而提升性能

### 工作机制

1. 当初次渲染的时候，会先创建一个描述UI的虚拟DOM，然后由React负责把此虚拟DOM变成真实DOM并且渲染到页面
2. 当某个部分发生变化时，比如说用户输入或者数据变化，React会创建一个 新的虚拟DOM 并与 老的虚拟DOM 进行对别，找出二者的参与，这就是所谓的 DOM-DIFF
3. 找到后确定应该如何最小化的修改真实DOM，以反应UI的变化。最后React会负责把这些更新映射到真实DOM上，让界面上的真实DOM和胸的虚拟DOM一致

### 优势

1. 性能提升了，批量修改真实DOM，另外只会进行最小化的更新，只修改必要的部分，可以避免昂贵的DOM操作和不必要的重排和重绘
2. 简化编程，开发者不需要关心如何操作DOM，只需要声明UI外观就可以。
3. 跨平台，因为虚拟DOM只是普通的JS对象，这样就可以在不同的环境复用相同的逻辑 ReactNative、React360（VR）

## 3. 为什么React要使用JSX

JSX是为了提供一种更直观的方式，以声明式的方式来描述UI，并且在编写UI代码的时候保持 JS 的功能

1. **声明式的语法** JSX 提供了一种看起来很像HTML的语法，能够直观的描述 UI的外观和结构 ，这样可以让代码更易读和易于维护
2. **组件化** 通过JSX，我们可以直接在JSX中定义组件，这使得UI的服用、测试和关注点的分离更简单
3. **整合能力** 鱿鱼JSX本质上还是JS，所以我们可以在其中插入人以有效的JS表达式，也可以把JS当作还书的参数或返回值，这样的话为UI组件的创建提供了灵活性

### 除了JSX还有别的方案吗？其他的方案为啥React没有选择呢？

1. **纯JS** React.createElement就是纯JS写法，但是使用纯JS会让代码变得冗长并难以阅读，尤其是在UI特别复杂的情况下，与此相反，JSX更简洁，更直观
2. **模版语言** 在传统的前端框架中经常会使用模版来定义描述UI，比如angular、vue，虽然模版是声明式的，但是它会带来额外的学习成本，需要学习模板的编写方法，比如Vue里的指令。另外使用模版的话无法使用全量的JS功能，无法使用完整的JS功能
3. **字符串的拼接** 直接使用字符串拼接最大的问题就是不安全，容易受到XSS也就是跨站脚本攻击。而JSX会自动进行安全转译，可以从根本上防止这种攻击

  ```js
  let data = ['a', 'b', 'c'];
  let html = '';
  for(let i = 0; i < data.length; i++) {
    html += `<li>${data[i]}</li>`
  }
  container.innerHTML = html;
  ```

  ```js
  const title = '<script>while(){}</script>'
  ```
