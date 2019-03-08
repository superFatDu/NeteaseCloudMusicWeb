import ajaxRequest from "../utils/httpConfig/httpConfig";

const LOGIN = {
  loginPhone: params => ajaxRequest("POST", "/api/login/cellphone", 1, params, false).then(),
  loginEmail: params => ajaxRequest("POST", "/api/login", 1, params, false).then(),
  getStatus: params => ajaxRequest("post", "/api/login/status", 1, params, false).then()
}

export {
  LOGIN
}