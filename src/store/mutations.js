export default {
  storeUid(state, param) {
    state.uid = param;
    sessionStorage.uid = param;
  }
}