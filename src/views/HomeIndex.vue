<template>
  <div class="index">
    <div class="top-title">
      <i class="iconfont top-title-menu">&#xe60b;</i>
      <div class="top-title-nav">
        <i class="iconfont" :class="{active: 1 === topNavActive}" @touchend="topNavActive = 1">&#xe6e1;</i>
        <i class="iconfont" :class="{active: 2 === topNavActive}" @touchend="topNavActive = 2">&#xe63e;</i>
      </div>
      <i class="iconfont top-title-search">&#xe607;</i>
    </div>
    <div class="menu-setting">
      <div class="menu-setting-items d-flex">
        <div class="setting-title d-flex">
          <div class="title-info d-flex">
            <img :src="profile.avatarUrl" alt="用户头像">
            <span>{{ profile.nickname }}</span>
          </div>
        </div>
        <div class="setting-items">
          <div class="setting-items-wrap">
            <div class="setting-item">
              <i class="iconfont">&#xe643;</i><span>我的消息</span>
            </div>
            <div class="setting-item">
              <i class="iconfont">&#xe608;</i><span>听歌识曲</span>
            </div>
            <div class="setting-item">
              <i class="iconfont">&#xe65e;</i><span>扫一扫</span>
            </div>
            <div class="setting-item">
              <i class="iconfont">&#xe64c;</i><span>附近的人</span>
            </div>
            <div class="setting-item">
              <i class="iconfont">&#xe6df;</i><span>游戏推荐</span>
            </div>
            <div class="setting-item">
              <i class="iconfont">&#xe603;</i><span>商城</span>
            </div>
            <div class="setting-item">
              <i class="iconfont">&#xe669;</i><span>音乐闹钟</span>
            </div>
            <div class="setting-item">
              <i class="iconfont">&#xe63e;</i><span>加入网易音乐人</span>
            </div>
          </div>
        </div>
        <div class="setting-bottom">
          <span class="logout-btn d-flex" @touchend.stop="userLogout">
            <i class="iconfont">&#xe67d;</i>
            <span>退出</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN } from "../api/login";

export default {
  name: "HomeIndex",
  data() {
    return {
      topNavActive: 1,
      profile: "",
      menuBg: ""
    }
  },
  methods: {
    userLogout() {
      LOGIN.logout();
    }
  },
  created() {
    this.profile = JSON.parse(localStorage.getItem("profile"));
    this.menuBg = this.profile.backgroundUrl;
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  position: relative;
  .top-title {
    line-height: 0.6rem;
    height: 0.6rem;
    background: #d43c33;
    i {
      color: #fff;
      font-size: 0.26rem;
    }
    .top-title-menu {
      display: inline-block;
      height: 0.6rem;
      padding: 0 0.15rem;
      position: absolute;
      top: 0;
      left: 0;
    }
    .top-title-search {
      display: inline-block;
      height: 0.6rem;
      padding: 0 0.15rem;
      position: absolute;
      top: 0;
      right: 0;
    }
    .top-title-nav {
      width: 100%;
      text-align: center;
      i {
        color: rgba(255, 255, 255, 0.4);
        display: inline-block;
        height: 100%;
        padding: 0 0.15rem;
      }
      .active {
        color: #fff;
      }
    }
  }
  .menu-setting {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    .menu-setting-items {
      width: 80%;
      height: 100%;
      background: #fff;
      overflow: hidden;
      position: relative;
      flex-direction: column;
      .setting-title {
        height: 1.55rem;
        background: url("../assets/images/Hello_bg.jpg") 50% 50% no-repeat;
        background-size: cover;
        align-items: flex-end;
        .title-info {
          flex-direction: column;
          box-sizing: border-box;
          padding: 0 0 0.15rem 0.15rem;
          img {
            width: 20%;
            height: auto;
            border-radius: 50%;
            margin-bottom: 0.1rem;
          }
          span {
            color: #fff;
            font-size: 0.16rem;
          }
        }
      }
      .setting-bottom {
        height: 0.55rem;
        width: 100%;
        line-height: 0.55rem;
        box-shadow: 0 1px 2px #666;
        position: absolute;
        left: 0;
        bottom: 0;
        text-align: right;
        background: #fff;
        .logout-btn {
          display: inline-block;
          height: 0.55rem;
          line-height: 0.55rem;
          align-items: center;
          padding-right: 0.15rem;
          i {
            vertical-align: middle;
            margin-right: 0.03rem;
            font-size: 0.2rem;
            color: #777;
          }
          span {
            vertical-align: middle;
            font-size: 0.17rem;
          }
        }
      }
      .setting-items {
        flex: 1;
        overflow: auto;
        .setting-items-wrap {
          box-sizing: border-box;
          padding: 0 0 0.55rem 0;
          .setting-item {
            height: 0.47rem;
            line-height: 0.47rem;
            box-sizing: border-box;
            padding-left: 0.15rem;
            i {
              color: #999;
              vertical-align: middle;
              margin-right: 0.05rem;
              font-size: 0.17rem;
            }
            span {
              font-size: 0.15rem;
            }
          }
        }
      }
    }
  }
}
</style>