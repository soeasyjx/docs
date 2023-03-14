---
title: 有用的代码片段
---

## 平滑的滚动到页面顶部

```js
const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
```

## 平滑的滚动到页面底部

```js
const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    left: 0,
    behavior: "smooth"
  });
};
```

## 将元素滚动到可见区域

```js
const smoothScroll = (element) => {
  element.scrollIntoView({
    behavior: "smooth"
  });
};
```

## 以全屏模式显示元素

```js
const goToFullScreen = (element) => {
  element = element || document.body;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
};
```

## 退出浏览器全屏状态

> 跟[以全屏模式显示元素](/toolFragment/javascript/jstool12#以全屏模式显示元素)一起使用

```js
const goExitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};
```

## 获取数据类型

```js
const getType = (value) => {
  const match = Object.prototype.toString.call(value).match(/ (\w+)]/);
  return match[1].toLocaleLowerCase();
};
```

## 停止冒泡事件

```js
const stopPropagation = (event) => {
  event = event || window.event;
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
};
```

## 深拷贝一个对象

### 方法 1

```js
const deepCopy = (obj, hash = new WeakMap()) => {
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    if (obj[key] && typeof obj[key] === "object") {
      cloneObj[key] = deepCopy(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
};
```

### 方法 2

```js
const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  let clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] =
        obj[key] instanceof Date
          ? new Date(obj[key].getTime())
          : deepClone(obj[key]);
    }
  }
  return clone;
};
```

## 确定设备类型

> 我们经常需要这样做，在手机上显示 A 逻辑，在 PC 上显示 B 逻辑。基本上，设备类型是通过识别浏览器的`userAgent`来确定的

```js
const isMobile = () => {
  return !!navigator.userAgent.match(
    /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
  );
};
```

## 判断设备是 Android 还是 IOS

> 除了区分是手机端还是 PC 端，很多时候我们还需要区分当前设备是 Android 还是 IOS

```js
const isAndroid = () => {
  return /android/i.test(navigator.userAgent.toLowerCase());
};

const isIOS = () => {
  let reg = /iPhone|iPad|iPod|iOS|Macintosh/i;
  return reg.test(navigator.userAgent.toLowerCase());
};
```

## 获取浏览器类型和版本

> 作为前端开发人员，您可能会遇到各种兼容性问题。这时候你可能需要获取浏览器的类型和版本

```js
const getExplorerInfo = () => {
  let t = navigator.userAgent.toLowerCase();
  return 0 <= t.indexOf("msie")
    ? {
        //ie < 11
        type: "IE",
        version: Number(t.match(/msie ([\d]+)/)[1])
      }
    : !!t.match(/trident\/.+?rv:(([\d.]+))/)
    ? {
        // ie 11
        type: "IE",
        version: 11
      }
    : 0 <= t.indexOf("edge")
    ? {
        type: "Edge",
        version: Number(t.match(/edge\/([\d]+)/)[1])
      }
    : 0 <= t.indexOf("firefox")
    ? {
        type: "Firefox",
        version: Number(t.match(/firefox\/([\d]+)/)[1])
      }
    : 0 <= t.indexOf("chrome")
    ? {
        type: "Chrome",
        version: Number(t.match(/chrome\/([\d]+)/)[1])
      }
    : 0 <= t.indexOf("opera")
    ? {
        type: "Opera",
        version: Number(t.match(/opera.([\d]+)/)[1])
      }
    : 0 <= t.indexOf("Safari")
    ? {
        type: "Safari",
        version: Number(t.match(/version\/([\d]+)/)[1])
      }
    : {
        type: t,
        version: -1
      };
};
```

## 设置 cookies

> cookie 可能是我见过的最糟糕的 API，它太难用了，我们不得不重新封装它以最大限度地提高我们的开发效率

```js
const setCookie = (key, value, expire) => {
  const d = new Date();
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`;
};
```

## 获取 cookies

> 除了写入 cookie 之外，我们还会参与到它的读取操作中

```js
const getCookie = (key) => {
  const cookieStr = unescape(document.cookie);
  const arr = cookieStr.split("; ");
  let cookieValue = "";
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].split("=");
    if (temp[0] === key) {
      cookieValue = temp[1];
      break;
    }
  }
  return cookieValue;
};
```

## 删除 cookie

> 删除 cookie 的想法是什么？其实只要把它的过期时间设置到这个时刻，它就会立即过期

```js
const delCookie = (key) => {
  document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`;
};
```

## 随机生成字符串

> 不知道大家有没有遇到过需要生成随机字符串的场景。遇到过很多次，每次都要重新 google 一遍，直到学会这个工具功能

```js
const randomString = (len) => {
  let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
  let strLen = chars.length;
  let randomStr = "";
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
};
```

## 将字符串首字母大写

```js
const fistLetterUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
```

## 生成指定范围内的随机数

```js
const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
```

## 打乱数组的顺序

```js
const shuffleArray = (array) => {
  return array.sort(() => 0.5 - Math.random());
};
```

## 从数组中获取一个随机值

```js
const getRandomValue = (array) =>
  array[Math.floor(Math.random() * array.length)];
```

## 格式化货币的方法

### 方法 1

```js
const formatMoney = (money) => {
  return money.replace(
    new RegExp(`(?!^)(?=(\\d{3})+${money.includes(".") ? "\\." : "$"})`, "g"),
    ","
  );
};
```

### 方法 2

```js
const formatMoney = (money) => {
  return money.toLocaleString();
};
```

## 判断是否为函数

```js
const isFunction = (obj) => {
  return (
    typeof obj === "function" &&
    typeof obj.nodeType !== "number" &&
    typeof obj.item !== "function"
  );
};
```

## 过滤字符串中特殊字符

### 方法

```js
function filterCharacter(str) {
  let pattern = new RegExp(
    "[`~!@#$^&*()=：”“'。，、？|{}':;'%,\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；]"
  );
  let resultStr = "";
  for (let i = 0; i < str.length; i++) {
    resultStr = resultStr + str.substr(i, 1).replace(pattern, "");
  }
  return resultStr;
}
```

### Demo
```jsx live noInline
const Demo2 = () => {
  function filterCharacter(str) {
    let pattern = new RegExp(
      "[`~!@#$^&*()=：”“'。，、？|{}':;'%,\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；]"
    );
    let resultStr = "";
    for (let i = 0; i < str.length; i++) {
      resultStr = resultStr + str.substr(i, 1).replace(pattern, "");
    }
    return resultStr;
  }
  return filterCharacter("gyaskjdhy12316789#$%^&!@#1=123,./[");
};

render(<Demo2 />);
```

