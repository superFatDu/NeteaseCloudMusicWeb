<template>
  <div class="song-list d-flex">
    <div class="song-list-title">
      <div class="back-title">
        <i class="iconfont" @touchend.stop="goBack">&#xe6a9;</i>
        <span>{{ backTitle }}</span>
      </div>
      <div class="song-info d-flex">
        <div class="info-img">
          <img :src="parentInfo.coverImgUrl" alt="">
        </div>
        <div class="info-list">
          <p class="lsit-name">{{parentInfo.name}}</p>
          <div class="user-info d-flex">
            <img :src="parentInfo.creator.avatarUrl" alt="">
            <span>{{parentInfo.creator.nickname}}</span>
            <i class="iconfont">&#xe610;</i>
          </div>
        </div>
      </div>
    </div>
    <div class="song-list-items">
      <div class="song-items-title">播放全部<span>(共{{originList.songCount}}首)</span></div>
      <div class="song-item d-flex" v-for="(item, index) of originList.songList" :key="index" @touchend="turnToPlayer(index)">
        <div class="song-item-num">{{ index + 1 }}</div>
        <div class="song-item-info d-flex">
          <p class="info-name">{{ item.name }}</p>
          <p class="info-al">{{ item.ar[0].name || "网易云音乐" }}-{{ item.al.name || "网易云音乐" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HANDLE_TOUCH } from "../utils/handleTouch/handleTouch";

export default {
  props: {
    propList: Object,
    propInfo: Object
  },
  name: "SongList",
  data() {
    return {
      parentInfo: this.propInfo,
      originList: this.propList,
      backTitle: "歌单",
      touchFlag: true
    };
  },
  methods: {
    goBack() {
      history.back();
    },
    turnToPlayer(idx) {
      if (this.touchFlag) {
        this.$emit("turnToPlayer", idx);
      }
    }
  },
  created() {
    let _this = this;
    HANDLE_TOUCH(_this);
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  height: 100%;
  background: #a7a0b5;
  position: relative;
  flex-direction: column;
  .song-list-title {
    .back-title {
      width: 100%;
      line-height: 0.5rem;
      position: fixed;
      top: 0;
      left: 0;
      background: #a7a0b5;
      i {
        display: inline-block;
        box-sizing: border-box;
        height: 100%;
        padding: 0 0.15rem 0 0.15rem;
        font-size: 0.22rem;
        color: #fff;
        line-height: 0.5rem;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        height: 100%;
        line-height: 0.5rem;
        font-size: 0.19rem;
        color: #fff;
        vertical-align: middle;
      }
    }
    .song-info {
      width: 100%;
      height: 1.6rem;
      box-sizing: border-box;
      margin-top: 0.6rem;
      padding: 0 0.15rem;
      .info-img {
        height: 1.3rem;
        img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 0.05rem;
        }
      }
      .info-list {
        height: 1.3rem;
        flex: 1;
        margin-left: 0.15rem;
        p {
          color: #fff;
          font-size: 0.19rem;
          line-height: 0.23rem;
          margin-top: 0.05rem;
        }
        .user-info {
          align-items: center;
          margin-top: 0.25rem;
          img {
            width: 0.3rem;
            height: 0.3rem;
            border-radius: 50%;
          }
          span {
            font-size: 0.13rem;
            color: #fff;
            margin-left: 0.05rem;
          }
          i {
            font-size: 0.12rem;
            color: #fff;
          }
        }
      }
    }
  }
  .song-list-items {
    flex: 1;
    background: #fff;
    border-top-left-radius: .1rem;
    border-top-right-radius: .1rem;
    .song-items-title {
      box-sizing: border-box;
      padding-left: 0.15rem;
      line-height: 0.5rem;
      font-size: 0.16rem;
      border-bottom: 0.01rem solid #f1f1f1;
      span {
        color: #999;
      }
    }
    .song-item {
      height: 0.6rem;
      /*padding-left: 0.15rem;*/
      .song-item-num {
        box-sizing: border-box;
        line-height: 0.6rem;
        padding-left: 0.05rem;
        width: 0.6rem;
        text-align: center;
        color: #999;
        font-size: 0.16rem;
      }
      .song-item-info {
        flex: 1;
        border-bottom: 0.01rem solid #f1f1f1;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .info-name {
          font-size: 0.16rem;
        }
        .info-al {
          font-size: 0.13rem;
          color: #999;
        }
      }
    }
  }
}
</style>