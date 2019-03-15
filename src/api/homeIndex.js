import ajaxRequest from "../utils/httpConfig/httpConfig";

const HOME_INDEX = {
  userDetail: params => ajaxRequest("post", "/api/user/detail", 1, params, false).then(),  // 获取用户详细信息
  getPlayList: params => ajaxRequest("post", "/api/user/playlist", 1, params, false).then(),  // 获取用户歌单信息
  getPlayListDetail: params => ajaxRequest("post", "/api/playlist/detail", 1, params, false).then(),  // 获取歌单详细信息
  getBanner: params => ajaxRequest("post", "/api/banner", 1, params, false).then()  // 首页banner
}

export {
  HOME_INDEX
}