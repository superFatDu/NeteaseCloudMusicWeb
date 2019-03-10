import { Loading } from "element-ui";

let loading;
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(255, 255, 255, 1)"
  });
};

const endLoading = () => {
  loading.close();
};

export const SHOW_LOADING = () => {
  startLoading();
};
export const HIDE_LOADING = () => {
  endLoading();
}