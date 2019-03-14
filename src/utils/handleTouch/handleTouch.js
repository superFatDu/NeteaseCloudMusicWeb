export const HANDLE_TOUCH = (e) => {
  document.addEventListener("touchstart", () => {
    //e.preventDefault();
    e.touchFlag = true;
  });
  document.addEventListener("touchmove", () => {
    //e.preventDefault();
    e.touchFlag = false;
  });
};
