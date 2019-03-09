<template>
  <div class="hello">
    <div class="count-down">
      {{time}}&nbsp;秒
    </div>
    <p>
      青春匆匆茫茫喂了狗，<br />
      唱首歌给夜归人。
    </p>
    <div class="hello-footer">
      <i class="iconfont">&#xe60f;</i><span>Wrote by superFatDu in 2019</span>
    </div>
  </div>
</template>

<script>
import { LOGIN } from "../api/login";

export default {
  name: "Hello",
  data() {
    return {
      status: false,
      time: 5
    }
  },
  methods: {
    async getStatus() {
      let res = await LOGIN.getStatus();
      // res.data.code === 200 ? this.status = true : this.status = false;
      if (res.data.code === 200) {
        this.status = true;
      } else {
        this.status = false;
        localStorage.removeItem("phone");
        localStorage.removeItem("email");
        localStorage.removeItem("profile");
      }
    },
    turnPage() {
      let _this = this;
      let timer = setInterval(function () {
        _this.time -= 1;
        if (_this.time === 0) {
          clearInterval(timer);
          _this.status === true ? _this.$router.push("/home/index") : _this.$router.push("/login");
        }
      }, 1000);
    }
  },
  mounted() {
    this.getStatus();
    this.turnPage();
  }
}
</script>

<style lang="scss" scoped>
.hello {
  width: 100%;
  height: 100%;
  background: url("../assets/images/Hello_bg.jpg") 50% 50% no-repeat;
  background-size: cover;
  position: relative;
  .count-down {
    height: .38rem;
    width: .75rem;
    line-height: .38rem;
    color: #fff;
    background: rgba(0, 0, 0, .3);
    border-radius: 5px;
    font-size: .17rem;
    text-align: center;
    position: absolute;
    top: .2rem;
    right: .2rem;
  }
  p {
    width: 100%;
    font-size: 0.22rem;
    color: #fff;
    letter-spacing: .02rem;
    line-height: .4rem;
    text-align: center;
    position: absolute;
    top: 27%;
    left: 0;
  }
  .hello-footer {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: .1rem;
    text-align: center;
    color: #fff;
    i {
      font-size: 0.27rem;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
    span {
      vertical-align: middle;
      font-size: .12rem;
    }
  }
}
</style>