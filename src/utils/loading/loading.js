import { Loading } from "element-ui";

let loading;
const startLoading = (opt = {}) => {
  let text = "加载中……";
  let target = "document";
  let optLen = Object.keys(opt).length;
  if (optLen) {
    if (opt.hasOwnProperty("text")) text = opt.text;
    if (opt.hasOwnProperty("target")) target = opt.target;
  }
  loading = Loading.service({
    lock: true,
    text,
    background: "rgba(255, 255, 255, 1)",
    target
  });
};

const endLoading = () => {
  loading.close();
};

export const SHOW_LOADING = (opt) => {
  startLoading(opt);
};
export const HIDE_LOADING = () => {
  endLoading();
}