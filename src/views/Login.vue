<template>
  <div class="login">
    <div class="login-index d-flex" v-show="pageShow[0]">
      <div class="login-logo"></div>
      <div class="login-chooses">
        <div class="login-choose-btn login-use-mobile" @touchstart.stop="btnMouseStart($event)" @touchend.stop="btnMouseEnd($event, 1)">手机号登陆</div>
        <div class="login-choose-btn login-use-email" @touchstart.stop="btnMouseStart($event)" @touchend.stop="btnMouseEnd($event, 2)">网易邮箱</div>
      </div>
    </div>
    <div class="login-mobile" v-show="pageShow[1]"></div>
    <div class="login-email" v-show="pageShow[2]"></div>
    <div class="login-footer d-flex">
      <i class="iconfont">&#xe60f;</i><span>superFatDu &copy;2019</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      pageShow: [true, false, false], // index/mobile/email
      titleText: ""
    }
  },
  methods: {
    btnMouseStart(e) {
      let ele = e.target;
      ele.style["color"] = "#fff";
      ele.style["background"] = "#c20c0c";
    },
    btnMouseEnd(e, idx) {
      let ele = e.target;
      ele.style["color"] = "#c20c0c";
      ele.style["background"] = "#fff";

      if (idx === 1) {
        console.log("toMobile");
      } else if (idx === 2) {
        console.log("toEmail");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  .login-index {
    width: 100%;
    height: 100%;
    position: relative;
    align-items: center;
    .login-chooses {
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.3rem;
      .login-choose-btn {
        width: 100%;
        line-height: 0.35rem;
        color: #c20c0c;
        border: 0.01rem solid #c20c0c;
        border-radius: 20px;
        text-align: center;
      }
      .login-use-email {
        margin-top: .2rem;
      }
    }
  }
  .login-footer {
    width: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0.1rem;
    i {
      color: #c20c0c;
      font-size: 0.27rem;
      margin-right: 0.1rem;
    }
    span {
      font-size: .12rem;
      color: #666;
    }
  }
}
</style>