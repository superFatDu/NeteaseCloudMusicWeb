<template>
  <div class="hello">
    <div class="count-down">
      {{time}}S
    </div>
    <p>
      那些记忆喂了狗的青春，<br />
      一首首有故事的歌，<br />
      说再见的人。
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
      time: 3
    }
  },
  methods: {
    async getStatus() {
      let res = await LOGIN.getStatus();
      res.code === 200 ? this.status = true : this.status = false;
    },
    turnPage() {
      let _this = this;
      setTimeout(function () {
        //_this.status === true ? _this.$router.push("/index") : _this.$router.push("/login");
      }, 3000)
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
    height: .37rem;
    width: .6rem;
    color: #333;
    background: #fff;
    border-radius: 5px;
    font-size: .2rem;
    text-align: center;
  }
  p {
    width: 100%;
    font-size: 0.22rem;
    color: #fff;
    letter-spacing: .02rem;
    line-height: .4rem;
    text-align: center;
    position: absolute;
    top: 25%;
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