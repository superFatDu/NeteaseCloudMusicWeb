/**
 * 适配设置(1rem = 100px)
 * @author duchengwu@ccx.cn
 * @date 2018/12/23
 */
(function(doc, win) {
  let docEl = doc.documentElement;
  /*let resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";*/
  let resizeEvt;
  if ("orientationchange" in window) {
    resizeEvt = "orientationchange";
  } else {
    resizeEvt = "resize";
  }
  let reCalc = function() {
    let clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = 100 * (clientWidth / 375) + "px";
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, reCalc, false);
  doc.addEventListener("DOMContentLoaded", reCalc, false);
})(document, window);
