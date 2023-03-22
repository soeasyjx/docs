/*
 * @Author: jiangxin
 * @Date: 2023-03-22 09:35:24
 * @Company: orientsec.com.cn
 * @Description:
 */

import React from "react";

function saveTextAsFile(textToWrite, fileNameToSaveAs, fileType) {
  let textFileAsBlob = new Blob([textToWrite], { type: fileType });
  let downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";

  if (window.webkitURL != null) {
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

export const DownloadFile = () => {
  const downloadTextHandle = () => {
    saveTextAsFile("Hello World!", "hello.txt", "text/plain");
  };

  const downloadJsonHandle = () => {
    saveTextAsFile('{"hello": "world"}', "hello.json", "application/json");
  };
  return (
    <div>
      <button onClick={downloadTextHandle}>点击下载 txt</button>
        <br/>
        <br/>
      <button onClick={downloadJsonHandle}>点击下载 Json</button>
    </div>
  );
};

