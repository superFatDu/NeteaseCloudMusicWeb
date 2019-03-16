import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
/*import VueAwesomeSwiper from "vue-awesome-swiper";*/
import "swiper/dist/css/swiper.css";
import "../node_modules/element-ui/lib/theme-chalk/index.css"
import "./utils/px2rem/px2rem";

Vue.config.productionTip = false;
Vue.use(ElementUI);
/*Vue.use(VueAwesomeSwiper);*/
Vue.prototype.$Base64 = require("js-base64").Base64;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
