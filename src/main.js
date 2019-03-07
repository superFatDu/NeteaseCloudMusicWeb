import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./utils/px2rem/px2rem"

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
