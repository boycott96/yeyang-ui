export function focusAndOpenKeyboard(el, timeout) {
  if (!timeout) {
    timeout = 100;
  }
  if (el) {
    // Align temp input element approximately where the input element is
    // so the cursor doesn't jump around
    var __tempEl__ = document.createElement("input");
    __tempEl__.style.position = "absolute";
    __tempEl__.style.top = el.offsetTop + 7 + "px";
    __tempEl__.style.left = el.offsetLeft + "px";
    __tempEl__.style.height = 0;
    __tempEl__.style.opacity = 0;
    // Put this temp element as a child of the page <body> and focus on it
    document.body.appendChild(__tempEl__);
    __tempEl__.focus();

    // The keyboard is open. Now do a delayed focus on the target element
    setTimeout(function () {
      el.focus();
      if (el.click) {
        el.click();
      }
      // Remove the temp element
      document.body.removeChild(__tempEl__);
    }, timeout);
  }
}
/**
 * 获取浏览器的类型
 * 0: chrome
 * 1: firefox
 * 2: safari
 * 3: IE
 * 4: edge
 * 5: opera
 */
export function getBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") == -1) {
    return 0;
  } else if (userAgent.indexOf("Firefox") > -1) {
    return 1;
  } else if (
    userAgent.indexOf("Safari") > -1 &&
    userAgent.indexOf("Chrome") == -1
  ) {
    return 2;
  } else if (userAgent.indexOf("MSIE") > -1 || !!document.documentMode == true) {
    return 3;
  } else if (userAgent.indexOf("Edg") > -1) {
    return 4;
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    return 5;
  }
}
export function getSystemOs() {
  const userAgent = navigator.userAgent;
  console.log(userAgent);
}

export function getScreenWidth() {
  var screenWidth = window.innerWidth;
  return screenWidth;
}
// 防抖函数
export function debounce(func, delay) {
  let timeoutId;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}
// 严格匹配URL格式
export function isValidURL(url) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // 协议
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // 域名
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // IP 地址
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // 端口和路径
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // 查询参数
    '(\\#[-a-z\\d_]*)?$', 'i'); // 锚点

  return pattern.test(url);
}
// 获取网页内容
export function fetchHTML(url) {
  // 创建一个 script 元素
  const scriptElement = document.createElement('script');
  // 设置 script 元素的 src 属性为目标 URL，并将回调函数名作为查询参数添加到 URL 中
  scriptElement.src = `${url}?callback=handleHTMLResponse`;
  scriptElement.id = 'url_info_html';
  // 将 script 元素添加到页面中
  document.body.appendChild(scriptElement);
  console.log(scriptElement);
  if (scriptElement) {
    const scriptData = scriptElement.innerHTML;
    console.log(scriptData);
  }
}

// 全局回调函数
export function handleHTMLResponse(response) {
  // 处理 HTML 响应
  console.log(response);
}
