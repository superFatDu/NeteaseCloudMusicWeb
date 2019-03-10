<template>
  <div class="song-list">
    <div class="song-list-title">
      <div class="back-title">
        <i class="iconfont" @touchend.stop="goBack">&#xe6a9;</i>
        <span>{{backTitle}}</span>
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

    </div>
  </div>
</template>

<script>
export default {
  name: "SongList",
  data() {
    return {
      parentInfo: {},
      backTitle: "歌单"
    };
  },
  methods: {
    getOpt() {
      this.parentInfo = JSON.parse(this.$Base64.decode(this.$route.query.songInfo));
    },
    goBack() {
      history.back();
    }
  },
  created() {
    this.getOpt();
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  height: 100%;
  background: #a7a0b5;
  position: relative;
  .back-title {
    width: 100%;
    line-height: 0.5rem;
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
    height: 1.5rem;
    box-sizing: border-box;
    margin-top: 0.1rem;
    padding: 0 0.15rem;
    .info-img {
      height: 1.3rem;
      img {
        width: 1.3rem;
        height: 1.3rem;
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
          font-size: 0.12rem;
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
</style>