import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import Index from "./views/Index";
import Hello from "./views/Hello";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Hello",
      component: Hello
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/index",
      name: "Index",
      component: Index
    }
  ]
});
