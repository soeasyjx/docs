---
title: http头信息
---

## 前言

http 头信息想必大伙都非常的清楚，清楚我也要讲一讲，本着好记性不如烂笔头原则，记录一些常见，但概念比较模糊的头字段

## [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)

Content-Type 指定 Body 的媒体资源类型，如果是请求头，则代表请求体的资源类型，如果是响应头，则代表响应体的资源类型。

### request

当请求头中含有 `Content-Type` 时，它指明 Request Body 的媒体资源类型，此时一般为 `POST`请求。

当前端向后端请求 API 接口时，请求体一般为 `JSON`数据类型，此时需要配置 `Content-Type: application/json`

除此之外，在 API 中常见以下几种请求头中的 Content-Type：

- aplication/json：请求体为 JSON
- application/x-www-form-urlencoded：请求体为以 & 分割的字符串，如 a=3&b=4
- multipart/form-data：请求体以 Boundary 分割

### response

当响应头中含有 Content-Type 时，它指明 Response Body 的媒体资源类型。

因为我们可以通过 HTTP 去请求各种各样的资源，因此 Content-Type 基本上可以是所有 MIME 类型。

而在前端中，涉及到的响应头中的 Content-Type 为以下几种：

- application/json
- text/html
- text/css
- application/javascript
- image/png
- image/jpeg
- image/webp
- image/svg+xml

## [Accept](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)

Accept 请求头用来告知（服务器）客户端可以处理的内容类型，这种内容类型用 MIME 类型来表示，也就是告诉服务端我希望你返回怎样的数据类型给我。

只会出现在请求标头中，响应标头是不会有这个字段的  
一般情况下不需要设置此字段

### request

```http
Accept: */*
```

