<template>
  <div class="index">
    <div class="top-title">
      <i class="iconfont top-title-menu" @touchend.stop="showMenuSetting">&#xe60b;</i>
      <div class="top-title-nav">
        <i class="iconfont" :class="{active: 1 === topNavActive}" @touchend.stop="topPlaylist">&#xe6e1;</i>
        <i class="iconfont" :class="{active: 2 === topNavActive}" @touchend.stop="topRecommend">&#xe650;</i>
      </div>
      <i class="iconfont top-title-search">&#xe607;</i>
    </div>
    <div class="menu-setting" ref="menuSetting" @touchstart.stop="menuMoveStar($event)" @touchend.stop="menuMoveEnd($event)">
      <div class="menu-setting-items d-flex">
        <div class="setting-title d-flex" ref="settingTitle">
          <div class="title-info d-flex">
            <img :src="profile.avatarUrl" alt="用户头像">
            <span class="d-flex">{{ profile.nickname }} <span class="user-level">Lv.{{userDtail.level}}</span></span>
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
    <div class="mask" ref="mask" @touchend.stop="closeMenuSetting"></div>
    <div class="index-main">
      <transition name="fade">
        <div class="playlist" v-show="navMainShow">
          <div class="create-list">
            <div class="list-title">
              <i class="iconfont">&#xe64a;</i>
              <span>创建的歌单({{ createList.length }})</span>
            </div>
            <div class="list-items d-flex" v-for="(item, index) of createList" :key="index" @touchend.stop="turnToSongList(item)">
              <div class="list-item-pic">
                <img :src="item.coverImgUrl" alt="">
              </div>
              <div class="list-item-info d-flex">
                <p class="item-info-name">{{item.name}}</p>
                <p class="item-info-count">{{item.trackCount}}首</p>
              </div>
            </div>
          </div>
          <div class="collect-list">
            <div class="list-title">
              <i class="iconfont">&#xe64a;</i>
              <span>收藏的歌单({{ collectList.length }})</span>
            </div>
            <div class="list-items">
              <div class="list-items d-flex" v-for="(item, index) of collectList" :key="index" @touchend.stop="turnToSongList(item)">
                <div class="list-item-pic">
                  <img :src="item.coverImgUrl" alt="">
                </div>
                <div class="list-item-info d-flex">
                  <p class="item-info-name">{{item.name}}</p>
                  <p class="item-info-count">{{item.trackCount}}首&nbsp;by{{item.creator.nickname}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="recommend" v-show="!navMainShow">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div v-for='(item,index) in banners' :key='index' class="swiper-slide">
                <div class="iSlide">
                  <img class="img" :src="item.imageUrl">
                  <!--<span class="banner-type">{{ item.typeTitle }}</span>-->
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="top-choose d-flex">
            <div class="choose-item" v-for="(item, index) of chooseItems" :key="index">
              <div class="choose-item-icon">
                <i class="iconfont" :class="chooseIcons[index]"></i>
              </div>
              <div class="choose-item-name">{{ item}}</div>
            </div>
          </div>
          <div class="recommend-playlist">
            <div class="rec-list-title">
              <span>推荐歌单</span><i class="iconfont">&#xe610;</i>
            </div>
            <div class="rec-list-items d-flex">
              <div class="rec-list-item" v-for="(item, index) of recPlayList" :key="index">
                <div class="list-item-pic">
                  <img :src="item.picUrl" alt="">
                </div>
                <div class="list-item-name">{{ item.name.length > 18 ? item.name.slice(0, 15) + "..." : item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { SHOW_LOADING, HIDE_LOADING } from "../utils/loading/loading";
import { LOGIN } from "../api/login";
import { HOME_INDEX } from "../api/homeIndex";
import { HANDLE_TOUCH } from "../utils/handleTouch/handleTouch";
import Swiper from "swiper";
export default {
  name: "HomeIndex",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true,
        autoplay: true,
        effect : 'fade',
        fadeEffect: {
          crossFade: true
        }
      },
      topNavActive: 1,
      profile: {},
      userDtail: {},
      menuBg: "",
      starX: 0,
      endX: 0,
      navMainShow: true,
      createList: [],
      collectList: [],
      touchFlag: true,
      banners: [],
      chooseItems: ["私人FM", "每日推荐", "歌单", "排行榜"],
      chooseIcons: ["iconicon_live", "iconicon_calendar", "iconMusic", "iconicon_medal"],
      recPlayList: []
    };
  },
  methods: {
    userLogout() {
      LOGIN.logout();
    },
    topPlaylist() {
      this.topNavActive = 1;
      this.navMainShow = true;
    },
    topRecommend() {
      this.topNavActive = 2;
      this.navMainShow = false;
    },
    showMenuSetting() {
      this.$refs.menuSetting.style["left"] = "0";
      this.$refs.mask.style["z-index"] = 8;
      this.$refs.mask.style["opacity"] = 1;
    },
    closeMenuSetting() {
      this.$refs.menuSetting.style["left"] = "-100%";
      this.$refs.mask.style["z-index"] = -1;
      this.$refs.mask.style["opacity"] = 0;
      this.starX = 0;
      this.endX = 0;
    },
    menuMoveStar(e) {
      this.starX = e.touches[0].clientX;
      console.log(this.starX);
    },
    menuMoveEnd(e) {
      this.endX = e.changedTouches[0].clientX;
      if ((this.starX - this.endX) > 60) {
        this.closeMenuSetting();
      }
    },
    getUserDetail() {
      HOME_INDEX.userDetail({
        uid: this.profile.userId
      }).then(res => {
        res = res.data;
        this.userDtail = res;
      })
    },
    getPlayLists() {
      let _this = this;
      HOME_INDEX.getPlayList({
        uid: this.profile.userId
      }).then(res => {
        res = res.data;
        if (res.code === 200) {
          _this.createList = [];
          _this.collectList = [];
          for(let i = 0; i < res.playlist.length; i++) {
            if (res.playlist[i].subscribed === false) {
              _this.createList.push(res.playlist[i]);
            } else {
              _this.collectList.push(res.playlist[i]);
            }
          }
          HIDE_LOADING();
        }
      });
    },
    turnToSongList(val) {
      if (this.touchFlag) {
        let opt = this.$Base64.encode(JSON.stringify(val));
        this.$router.push({ name: "Song", params: { songInfo: opt } });
      }
    },
    getBanner() {
      HOME_INDEX.getBanner().then(res => {
        res = res.data;
        this.banners = res.banners;
        this.$nextTick(() => {
          this.initSwiper();
        })
      })
    },
    getRecPlayList() {
      HOME_INDEX.recommentPlayList().then(res => {
        res = res.data;
        if (res.code === 200) {
          res = res.result;
          for(let i = 0; i < 6; i++) {
            this.recPlayList.push(res[i]);
          }
        }
      })
    },
    initSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        loopAdditionalSlides: 1,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        },
        observer: true,
        observeParents: true
      });
    }
  },
  mounted() {
    this.$refs.settingTitle.style["background"] = `url(${this.menuBg}) 50% 50% no-repeat`;
    this.$refs.settingTitle.style["background-size"] = "cover";
  },
  created() {
    SHOW_LOADING();
    let _this = this;
    this.profile = JSON.parse(localStorage.getItem("profile"));
    this.menuBg = this.profile.backgroundUrl;
    this.getUserDetail();
    this.getPlayLists();
    this.getBanner();
    this.getRecPlayList();
    HANDLE_TOUCH(_this);
  }
}
</script>

<style lang="scss" scoped>
@import "~swiper/dist/css/swiper.css";
.index {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding-top: 0.6rem;
  .top-title {
    line-height: 0.6rem;
    width: 100%;
    height: 0.6rem;
    background: #d43c33;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 7;
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
      height: 100%;
      text-align: center;
      i {
        color: rgba(255, 255, 255, 0.4);
        display: inline-block;
        height: 100%;
        padding: 0 0.15rem;
        font-size: 0.28rem;
        &:first-child {
          font-weight: bold;
          font-size: 0.26rem;
        }
      }
      .active {
        color: #fff;
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    transition: all linear 0.2s;
  }
  .menu-setting {
    width: 80%;
    height: 100%;
    position: absolute;
    top: 0;
    left: -100%;
    transition: all ease-in-out 0.2s;
    z-index: 9;
    .menu-setting-items {
      width: 100%;
      height: 100%;
      background: #fff;
      overflow: hidden;
      position: relative;
      flex-direction: column;
      .setting-title {
        height: 1.8rem;
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
            align-items: center;
            .user-level {
              display: inline-block;
              padding: 0 0.05rem;
              font-size: 0.1rem;
              border: 0.01rem solid #fff;
              border-radius: 0.09rem;
              font-weight: bold;
              margin-left: 0.1rem;
            }
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
  .index-main {
    width: 100%;
    height: 100%;
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .playlist, .recommend {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 0.6rem;
      overflow: scroll;
      position: absolute;
      top: 0;
      left: 0;
      .create-list {
        .list-title {
          width: 100%;
          height: 0.4rem;
          line-height: 0.4rem;
          background: #efefef;
          color: #666;
          box-sizing: border-box;
          padding-left: 0.12rem;
          i {
            vertical-align: middle;
            margin-right: 0.07rem;
            font-size: 0.22rem;
          }
          span {
            font-size: 0.12rem;
          }
        }
      }
      .collect-list {
        .list-title {
          width: 100%;
          height: 0.3rem;
          line-height: 0.3rem;
          background: #efefef;
          color: #666;
          box-sizing: border-box;
          padding-left: 0.12rem;
          i {
            vertical-align: middle;
            margin-right: 0.07rem;
            font-size: 0.22rem;
          }
          span {
            font-size: 0.12rem;
          }
        }
      }
      .list-items {
        box-sizing: border-box;
        padding: .07rem .07rem;
        height: 0.65rem;
        .list-item-pic {
          width: 0.55rem;
          height: 0.55rem;
          img {
            width: 0.55rem;
            height: 0.55rem;
            border-radius: .05rem;
          }
        }
        .list-item-info {
          flex: 1;
          margin-left: .1rem;
          flex-direction: column;
          justify-content: center;
          height: 0.55rem;
          padding-bottom: 0.05rem;
          border-bottom: 0.01rem solid #f1f1f1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item-info-name {
            font-size: 0.16rem;
          }
          .item-info-count{
            margin-top: 0.05rem;
            font-size: 0.12rem;
            color: #999;
          }
        }
      }
      .swiper-container {
        box-sizing: border-box;
        padding: 0 0.07rem;
        &::after {
          display: block;
          content: "";
          width: 100%;
          height: 1rem;
          position: absolute;
          top: 0;
          left: 0;
          background: #d43c33;
        }
        .iSlide {
          position: relative;
          .banner-type {
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }
      .top-choose {
        box-sizing: border-box;
        padding: 0.07rem 0.25rem 0.12rem 0.25rem;
        border-bottom: 1px solid #f1f1f1;
        justify-content: space-between;
        .choose-item {
          .choose-item-icon {
            width: 0.5rem;
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            border-radius: 50%;
            background: #d43c33;
            i {
              font-size: 0.25rem;
              color: #fff;
            }
          }
          .choose-item-name {
            margin-top: 0.05rem;
            font-size: 0.13rem;
            text-align: center;
          }
        }
      }
      .recommend-playlist {
        box-sizing: border-box;
        padding: 0.23rem 0.07rem 0.1rem 0.07rem;
        .rec-list-title {
          font-size: 0.17rem;
          font-weight: bold;
          margin-bottom: 0.12rem;
          i {
            font-weight: lighter;
            color: #bbb;
          }
        }
        .rec-list-items {
          width: 100%;
          flex-wrap: wrap;
          justify-content: space-between;
          .rec-list-item {
           width: 32.7%;
            margin-bottom: 0.1rem;
            .list-item-pic {
              img {
                width: 100%;
                height: auto;
                border-radius: 0.03rem;
              }
            }
            .list-item-name {
              font-size: 0.12rem;
            }
          }
        }
      }
    }
  }
}
</style>