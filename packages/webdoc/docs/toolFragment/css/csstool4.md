---
title: css画圆
---

## 前言

有很多方法可以在 CSS 中制作圆圈，但这绝对是最简单的

```css
.circle {
  inline-size: 25ch;
  aspect-ratio: 1;
  border-radius: 50%;
}
```

## Demo

```jsx live noInline
const Demo = () => {
  return (
    <div>
      <div
        style={{
          display:"inline-block",
          inlineSize: "30vh",
          aspectRatio: '1',
          borderRadius: "50%",
          background: "Highlight"
        }}
      ></div>
    </div>
  );
};
render(<Demo />);
```
