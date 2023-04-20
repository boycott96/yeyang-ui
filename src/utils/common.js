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
      el.click();
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
