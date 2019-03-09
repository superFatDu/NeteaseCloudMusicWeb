<template>
  <div class="login">
    <div class="login-index d-flex" v-show="pageShow[0]">
      <div class="login-logo">
        <img src="../assets/images/login_index_logo.png" alt="" />
      </div>
      <div class="login-chooses">
        <div
          class="login-choose-btn login-use-mobile"
          @touchstart.stop="btnMouseStart($event)"
          @touchend.stop="btnMouseEnd($event, 1)"
        >
          手机号登陆
        </div>
        <div
          class="login-choose-btn login-use-email"
          @touchstart.stop="btnMouseStart($event)"
          @touchend.stop="btnMouseEnd($event, 2)"
        >
          网易邮箱
        </div>
      </div>
    </div>
    <div class="login-mobile" v-show="pageShow[1]">
      <div class="login-page-title">
        <i class="iconfont" @touchend.stop="btnMouseEnd($event, 0)">&#xe6a9;</i
        ><span>手机号登陆</span>
      </div>
      <div class="mobile-form">
        <div class="mobile-form-item d-flex">
          <i class="iconfont">&#xe65f;</i>
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="loginForm.phone"
          />
        </div>
        <div class="mobile-form-item d-flex">
          <i class="iconfont">&#xe620;</i>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
          />
        </div>
      </div>
      <div class="login-page-submit">
        <span @touchend.stop="userLogin('mobile')">登录</span>
        <p class="login-err">{{ loginError.mobile }}</p>
      </div>
    </div>
    <div class="login-email" v-show="pageShow[2]">
      <div class="login-page-title">
        <i class="iconfont" @touchend.stop="btnMouseEnd($event, 0)">&#xe6a9;</i
        ><span>邮箱登录</span>
      </div>
      <div class="email-form">
        <div class="email-form-item d-flex">
          <i class="iconfont">&#xe643;</i>
          <input
            type="text"
            placeholder="请输入网易邮箱"
            v-model="loginForm.email"
          />
        </div>
        <div class="email-form-item d-flex">
          <i class="iconfont">&#xe620;</i>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
          />
        </div>
      </div>
      <div class="login-page-submit">
        <span @touchend.stop="userLogin('email')">登录</span>
        <p class="login-err">{{ loginError.email }}</p>
      </div>
    </div>
    <div class="login-footer d-flex">
      <i class="iconfont">&#xe60f;</i><span>Wrote by superFatDu in 2019</span>
    </div>
  </div>
</template>

<script>
import { LOGIN } from "../api/login";
export default {
  name: "Login",
  data() {
    return {
      pageShow: [true, false, false], // index/mobile/email
      loginForm: {
        phone: "",
        email: "",
        password: ""
      },
      loginError: {
        mobile: "",
        email: ""
      }
    };
  },
  methods: {
    btnMouseStart(e) {
      let ele = e.target;
      ele.style["color"] = "#fff";
      ele.style["background"] = "#d43c33";
    },
    clickPageShow(idx) {
      for (let i = 0; i < this.pageShow.length; i++) {
        this.pageShow.splice(i, 1, false);
        if (i === idx) this.pageShow.splice(i, 1, true);
      }
    },
    btnMouseEnd(e, idx) {
      if (idx !== 0) {
        let ele = e.target;
        ele.style["color"] = "#d43c33";
        ele.style["background"] = "#fff";
      }
      this.loginError.mobile = "";
      this.loginError.email = "";
      this.loginForm.password = "";
      this.clickPageShow(idx);
    },
    userLogin(opt) {
      if (opt === "mobile") {
        LOGIN.loginPhone({
          phone: this.loginForm.phone,
          password: this.loginForm.password
        }).then(
          res => {
            res = res.data;
            if (res.code === 200 && Object.keys(res.account).length !== 0) {
              this.$store.dispatch("storeUserInfo", res.profile);
              localStorage.setItem("phone", this.loginForm.phone);
              this.$router.push("/home/index");
            }
          },
          error => {
            this.loginError.mobile = error;
          }
        );
      } else if (opt === "email") {
        LOGIN.loginEmail({
          email: this.loginForm.email,
          password: this.loginForm.password
        }).then(
          res => {
            res = res.data;
            if (res.code === 200 && Object.keys(res.account).length !== 0) {
              this.$store.dispatch("storeUserInfo", res.profile);
              localStorage.setItem("email", this.loginForm.email);
              this.$router.push("/home/index");
            }
          },
          error => {
            this.loginError.email = error;
          }
        );
      }
    }
  },
  created() {
    if (localStorage.getItem("phone"))
      this.loginForm.phone = localStorage.getItem("phone");
    if (localStorage.getItem("email"))
      this.loginForm.email = localStorage.getItem("email");
  }
};
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
    background: url("../assets/images/login_index_bg.jpg") 50% 50% no-repeat;
    background-size: cover;
    .login-logo {
      width: 100%;
      position: absolute;
      top: 15%;
      left: 0;
      text-align: center;
      img {
        width: 20%;
        border-radius: 0.15rem;
      }
    }
    .login-chooses {
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.3rem;
      .login-choose-btn {
        width: 100%;
        box-sizing: border-box;
        height: 0.42rem;
        line-height: 0.42rem;
        color: #d43c33;
        background: #fff;
        border: 0.01rem solid #d43c33;
        border-radius: 20px;
        text-align: center;
      }
      .login-use-email {
        margin-top: 0.2rem;
      }
    }
  }
  .login-mobile {
    .mobile-form {
      margin-top: 0.3rem;
      box-sizing: border-box;
      padding: 0 0.15rem;
      .mobile-form-item {
        line-height: 0.42rem;
        border-bottom: 1px solid #777;
        margin-top: 0.15rem;
        align-items: center;
        i {
          font-size: 0.2rem;
        }
        input {
          font-size: 0.15rem !important;
          color: #333;
          text-indent: 0.1rem !important;
          flex: 1;
        }
      }
    }
  }
  .login-email {
    .email-form {
      margin-top: 0.3rem;
      box-sizing: border-box;
      padding: 0 0.15rem;
      .email-form-item {
        line-height: 0.42rem;
        border-bottom: 1px solid #777;
        margin-top: 0.15rem;
        align-items: center;
        i {
          font-size: 0.2rem;
        }
        input {
          font-size: 0.15rem !important;
          color: #333;
          text-indent: 0.1rem !important;
          flex: 1;
        }
      }
    }
  }
  .login-page-title {
    line-height: 0.5rem;
    background: #d43c33;
    i {
      display: inline-block;
      width: 0.45rem;
      box-sizing: border-box;
      padding-left: 0.15rem;
      color: #fff;
      font-size: 0.2rem;
      vertical-align: middle;
    }
    span {
      color: #fff;
      font-size: 0.16rem;
    }
  }
  .login-page-submit {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.15rem;
    margin-top: 0.4rem;
    span {
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
      height: 0.42rem;
      line-height: 0.42rem;
      color: #fff;
      background: #d43c33;
      border: 0.01rem solid #d43c33;
      border-radius: 20px;
      text-align: center;
    }
    .login-err {
      color: #d43c33;
      line-height: 0.42rem;
      text-align: center;
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
      color: #d43c33;
      font-size: 0.27rem;
      margin-right: 0.1rem;
    }
    span {
      font-size: 0.12rem;
      color: #444;
    }
  }
}
</style>
