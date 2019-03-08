//request.js
import axios from "axios";
import qs from "qs";


/********** request拦截器 ********/
axios.interceptors.request.use( config => {
  return config;
}, error => {
  return Promise.reject(error);
});

/********** response拦截器 ********/
axios.interceptors.response.use(response => {
  let responseData = response.data;
    return responseData;
}, error => {
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    throw new Error(error.response.data.msg)
  } else {
    // 由于设置请求发生错误而触发的错误
    throw new Error(error.message)
  }
  return Promise.reject(error)
});


/*
method: 请求方式get,post
url:    请求地址
type:   请求类型 0为"application/x-www-form-urlencoded", 1为"application/json", 2为"multipart/form-data"
params: 请求参数{key:value}
token:  是否需要添加token,true为添加，false为不添加
*/
function ajaxRequest(method, url, type, params, token){
  let contentType = [ "application/x-www-form-urlencoded", "application/json", "multipart/form-data"],
    headers = { "content-type": contentType[type] };
  if(token === true){
    headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }
  if(type === 0){
    params = qs.stringify(params);
  }
  return axios({
    method: method,
    url: url,
    headers: headers,
    data: params
  });
}


export default ajaxRequest;