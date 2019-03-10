import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import Hello from "./views/Hello";
import HomeIndex from "./views/HomeIndex";
import Home from "./views/Home";
import HomeSearch from "./views/HomeSearch";
import SongList from "./views/SongList";

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
      path: "/home",
      name: "Home",
      component: Home,
      children: [
        {
          path: "index",
          name: "HomeIndex",
          component: HomeIndex
        },
        {
          path: "search",
          name: "HomeSearch",
          component: HomeSearch
        }
      ]
    },
    {
      path: "/songlist",
      name: "SongList",
      component: SongList
    }
  ]
});
