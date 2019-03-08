// const PROXY_TARGET = "http://10.0.5.23:3000";
const PROXY_TARGET = "http://192.168.0.103:3000";
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    open: true,
    proxy: {
      "/api": {
        target: PROXY_TARGET,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  productionSourceMap: false
}