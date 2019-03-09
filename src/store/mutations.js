export default {
  storeUserInfo(state, param) {
    state.profile = JSON.stringify(param);
    localStorage.profile = JSON.stringify(param);
  }
}