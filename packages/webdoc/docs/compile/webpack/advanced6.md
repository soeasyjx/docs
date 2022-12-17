---
title: 进阶-实战4(环境切换组件)
---

这里我们还是接着[上一篇](/compile/webpack/advanced5)来说，其实这篇主要介绍的是环境切换组件的开发，首先对于这个组件我们有怎样的要求呢：

1. 浮动在页面最上层
2. 用户可拖动组件到任意位置，这样可以避免遮挡一些主要的信息
3. 可切换环境选择

## RegisterElementMove

根据上面的要求，并考虑到组件的通用性，我们首先要创建一个可让任何 DOM 元素能移动的服务，入参为 DOM 元素，将其传入，就可使获得可移动的能力，好了，要求明确了，就开干吧

以下只是我的实现逻辑，并不是标准，直接上代码，没啥好讲解的，都是一些最基础的 js 知识

```js title=RegisterElementMove
class RegisterElementMove {
  // 位置属性
  #switchPos = {
    hasMoved: false, // exclude click event
    x: 0, // right
    y: 0, // bottom
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  };

  #btnSwitch = null;

  constructor(ele) {
    this.#btnSwitch = ele;
    const switchX = this.#getStorage("switch_x") * 1;
    const switchY = this.#getStorage("switch_y") * 1;
    this.#initState(switchX, switchY);
    this.#setSwitchPosition(switchX, switchY);
  }

  #initState(switchX, switchY) {
    if (switchX !== 0 && switchY !== 0)
      this.#btnSwitch.style = `right:${switchX}px; bottom: ${switchY}px`;
    this.#btnSwitch.addEventListener("touchstart", this.#onTouchStart);
    this.#btnSwitch.addEventListener("touchmove", this.#onTouchMove);
    this.#btnSwitch.addEventListener("touchend", this.#onTouchEnd);
  }

  #setStorage(key, value) {
    if (!window.localStorage) {
      return;
    }
    key = "vConsole_" + key;
    localStorage.setItem(key, value);
  }
  #getStorage(key) {
    if (!window.localStorage) {
      return;
    }
    key = "vConsole_" + key;
    return localStorage.getItem(key);
  }

  #getSwitchButtonSafeAreaXY = (x, y) => {
    const docWidth = Math.max(
      document.documentElement.offsetWidth,
      window.innerWidth
    );
    const docHeight = Math.max(
      document.documentElement.offsetHeight,
      window.innerHeight
    );
    // check edge
    if (x + this.#btnSwitch.offsetWidth > docWidth) {
      x = docWidth - this.#btnSwitch.offsetWidth;
    }
    if (y + this.#btnSwitch.offsetHeight > docHeight) {
      y = docHeight - this.#btnSwitch.offsetHeight;
    }
    if (x < 0) {
      x = 0;
    }
    if (y < 20) {
      y = 20;
    } // safe area for iOS Home indicator
    return [x, y];
  };

  #setSwitchPosition = (switchX, switchY) => {
    [switchX, switchY] = this.#getSwitchButtonSafeAreaXY(switchX, switchY);
    this.#switchPos.x = switchX;
    this.#switchPos.y = switchY;
    this.#btnSwitch.x = switchX;
    this.#btnSwitch.y = switchY;
    this.#setStorage("switch_x", switchX + "");
    this.#setStorage("switch_y", switchY + "");
  };
  #onTouchStart = (e) => {
    this.#switchPos.startX = e.touches[0].pageX;
    this.#switchPos.startY = e.touches[0].pageY;
    this.#switchPos.hasMoved = false;
  };
  #onTouchEnd = (e) => {
    if (!this.#switchPos.hasMoved) {
      return;
    }
    this.#switchPos.startX = 0;
    this.#switchPos.startY = 0;
    this.#switchPos.hasMoved = false;
    this.#setSwitchPosition(this.#switchPos.endX, this.#switchPos.endY);
  };
  #onTouchMove = (e) => {
    if (e.touches.length <= 0) {
      return;
    }
    const offsetX = e.touches[0].pageX - this.#switchPos.startX,
      offsetY = e.touches[0].pageY - this.#switchPos.startY;
    let x = Math.floor(this.#switchPos.x - offsetX),
      y = Math.floor(this.#switchPos.y - offsetY);
    [x, y] = this.#getSwitchButtonSafeAreaXY(x, y);
    this.#btnSwitch.style = `right:${x}px; bottom: ${y}px`;
    this.#switchPos.endX = x;
    this.#switchPos.endY = y;
    this.#switchPos.hasMoved = true;
    e.preventDefault();
  };
}
```

## web component

我的想法是，使用 web component 定义一个外层容器，它的作用就是给我们里面的 DOM 添加可移动的能力，至于里面的 DOM 是啥，这个可以完全自定义

```js
class EnvSwitch extends HTMLElement {
  constructor() {
    super();
    this.#createDom();
    console.log(this.setAttribute("class", "sss"));
  }
  #createDom() {
    const templateElem = this.#createTemplate();
    var content = templateElem.content.cloneNode(true);

    var shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(content);

    new RegisterElementMove(this);
  }
  #createTemplate() {
    const tempalte = document.createElement("template");
    const style = document.createElement("style");
    const slot = document.createElement("slot");
    style.innerHTML = `
          :host {
                    display: block;
                    position: fixed;
                    right: 20px;
                    bottom: 20px;
                    border: 1px solid #d9d9d9;
                    padding: 10px 12px;
                    background: white;
                    border-radius: 6px;
                    opacity: 0.8;
                    z-index: 10000;
                }
          `;

    tempalte.content.appendChild(style);
    tempalte.content.appendChild(slot);
    //   new RegisterElementMove(div);
    return tempalte;
  }
}

window.customElements.define("env-switch-button", EnvSwitch);
```

上面其实主是 webcomponent 知识点了，有兴趣的小伙伴可以自行查找资料学习

## 使用

```html
<env-switch-button>
  <select>
    <option>sit</option>
    <option>dev</option>
  </select>
</env-switch-button>
```

## 打包发布

我们通过father编译工具，先将组件打包，然后发布到Npm 上

[father 使用](/compile/father/base)

```bash
npm login
npm publish
```

### 源码
[father-simple-demo](https://gitee.com/soeasyjx/father-simple-demo)


## webpack中使用

那们应该通过webpack将上面的组件引用到页面中呢
1. 将其发布到npm 上通过`<script>` 引用cdn链接的方式将其引入到我们的index.html中
2. 自定义webpack插件，完成第1步 **我们使用了`html-webpack-plugin`插件，该插件提供了很多hook供我们使用**

好了，我们再开启新的一篇文章吧

