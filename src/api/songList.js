import ajaxRequest from "../utils/httpConfig/httpConfig";

const SONG = {
  getList: params => ajaxRequest("post", "/api/playlist/detail", 1, params, false).then(),  // 获取歌单详情
  updateListInfo: params => ajaxRequest("post", "/api/playlist/update", 1, params, false).then(),  // 修改歌单信息
  getSongInfo: params => ajaxRequest("post", "/api/song/url", 1, params, false).then()  // 获取播放url
};

export { SONG }