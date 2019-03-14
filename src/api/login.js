import ajaxRequest from "../utils/httpConfig/httpConfig";

const LOGIN = {
  loginPhone: params => ajaxRequest("POST", "/api/login/cellphone", 1, params, false).then(),  // 电话号登录
  loginEmail: params => ajaxRequest("POST", "/api/login", 1, params, false).then(),  // 邮箱登录
  getStatus: params => ajaxRequest("post", "/api/login/status", 1, params, false).then(),  // 查询是否登录
  logout: params => ajaxRequest("post", "/api/logout", 1, params, false).then()  // 退出
};

export { LOGIN }