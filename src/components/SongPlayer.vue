<template>
  <div class="player d-flex" ref="playerBox">
    <div class="player-title d-flex">
      <i class="iconfont" @touchend="goBackList">&#xe6a9;</i>
      <div class="audio-info d-flex">
        <p class="audio-name">{{ audioInfo.name || "" }}</p>
        <p class="audio-al">{{ audioInfo.ar[0].name || "" }}<i class="iconfont">&#xe610;</i></p>
      </div>
    </div>
    <div class="audio-player">
      <audio
        ref="audioMedia"
        autoplay
        :src="audioSrc"
        @ended="playJudge"
        @loadedmetadata="audioLoadInfo"
        @timeupdate="audioTimeUpdate"
        @play="audioPlay"
        @pause="audioPause"
      ></audio>
    </div>
    <div class="player-pic">
      <img :src="audioInfo.al.picUrl" alt="" class="picAnimation" ref="playerPic">
    </div>
    <div class="player-footer d-flex">
      <div class="progress-bar d-flex">
        <div class="update-time">{{ progressBar.updateMS }}</div>
        <div class="drag-bar">
          <div class="progress-line" ref="progressLine">
            <div class="current-line" ref="currentLine"></div>
          </div>
          <div class="drag-btn" ref="dragBtn"></div>
        </div>
        <div class="total-time">{{ progressBar.durationMS }}</div>
      </div>
      <div class="operate-btn d-flex">
        <div class="operate-loop">
          <i class="iconfont" :class="{iconliebiaoxunhuan: whetherLoop, icondanquxunhuan: !whetherLoop}" @touchend="loopOrSingle"></i>
        </div>
        <div class="operate-prev">
          <i class="iconfont" @touchend="playPrevSong">&#xe60e;</i>
        </div>
        <div class="operate-play">
          <i class="iconfont" :class="{iconbofang: !whetherPause, iconzanting: whetherPause}" @touchend="pauseOrPlay"></i>
        </div>
        <div class="operate-next">
          <i class="iconfont" @touchend="playNextSong">&#xe614;</i>
        </div>
        <div class="operate-like">
          <i class="iconfont">&#xe665;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SONG } from "../api/songList";

export default {
  props: {
    playIndex: Number,
    propList: Array
  },
  name: "SongPlayer",
  data() {
    return {
      audioSrc: "",
      audioInfo: {
        name: "",
        ar: [{ name: "" }],
        al: {
          picUrl: ""
        }
      },
      index: this.playIndex,
      progressBar: {
        duration: 0,
        updateMS: "00:00",
        durationMS: "00:00"
      },
      whetherPause: false,
      whetherLoop: true,
      offsetX: 0,
      destinationX: 0
    };
  },
  methods: {
    goBackList() {
      this.$emit("showSongList");
      this.whetherPause = false;
      this.pauseOrPlay();
    },
    getSongInfo(idx) {
      let params = {
        id: this.propList[idx].id
      };
      SONG.getSongInfo(params).then(res => {
        res = res.data;
        this.audioSrc = res.data[0].url;
      });
    },
    playJudge() {
      if (this.whetherLoop) {
        this.index += 1;
        this.getSongInfo(this.index);
      } else {
        this.getSongInfo(this.index);
      }
    },
    audioLoadInfo(e) {
      this.progressBar.duration = e.target.duration;
      let durationS = parseInt(e.target.duration % 60);
      let durationM = parseInt(e.target.duration / 60);
      if (durationM < 10) durationM = "0" + durationM;
      if (durationS < 10) durationS = "0" + durationS;
      this.progressBar.durationMS = `${durationM}:${durationS}`;
    },
    audioTimeUpdate(e) {
      let currentTime = e.target.currentTime;
      let updateS = parseInt(currentTime % 60);
      let updateM = parseInt(currentTime / 60);
      if (updateS < 10) updateS = "0" + updateS;
      if (updateM < 10) updateM = "0" + updateM;
      this.progressBar.updateMS = `${updateM}:${updateS}`;
      let rate = currentTime / this.progressBar.duration;
      this.$refs.currentLine.style["width"] = rate.toFixed(2) * 100 + "%";
      let dragBarWidth = document.querySelector(".drag-bar").clientWidth;
      let offsetLeft = (dragBarWidth * rate.toFixed(2)).toFixed(0);
      this.$refs.dragBtn.style["left"] = offsetLeft + "px";
    },
    pauseOrPlay() {
      let Media = this.$refs.audioMedia;
      if (this.whetherPause) {
        this.whetherPause = false;
        Media.play();
        this.$refs.playerPic.style["animation-play-state"] = "running";
      } else {
        this.whetherPause = true;
        Media.pause();
        this.$refs.playerPic.style["animation-play-state"] = "paused";
      }
    },
    loopOrSingle() {
      if (this.whetherLoop) {
        this.whetherLoop = false;
      } else {
        this.whetherLoop = true;
      }
    },
    audioPlay() {
      this.whetherPause = false;
      this.$refs.playerPic.style["animation-play-state"] = "running";
    },
    audioPause() {
      this.whetherPause = true;
      this.$refs.playerPic.style["animation-play-state"] = "paused";
    },
    playPrevSong() {
      this.index -= 1;
      if (this.index < 0) this.index = this.propList.length - 1;
      this.getSongInfo(this.index);
    },
    playNextSong() {
      this.index += 1;
      if (this.index === this.propList.length) this.index = 0;
      this.getSongInfo(this.index);
    }/*,
    targetStart(e) {
      this.destinationX = (this.$refs.playerBox.clientWidth - this.$refs.progressLine.clientWidth) / 2;
      this.offsetX = e.touches[0].clientX;
    },
    targetMove(e) {
      let target = e.changedTouches[0];
      if (target.clientX < this.destinationX || target.clientX === this.destinationX) {
        target.target.style["left"] = "0";
        return false;
      } else if (target.clientX > this.$refs.progressLine.clientWidth + this.destinationX || target.clientX === this.$refs.progressLine.clientWidth + this.destinationX) {
        target.target.style["left"] = this.$refs.progressLine.clientWidth + this.destinationX +"px";
      } else {
        target.target.style["left"] = target.clientX + "px";
      }
    }*/
  },
  mounted() {

  },
  watch: {
    playIndex(idx) {
      this.index = idx;
      this.getSongInfo(idx);
      this.audioInfo = this.propList[idx];
    },
    index(idx) {
      this.audioInfo = this.propList[idx];
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: linear-gradient(to bottom, #b1aeb7, #a7a0b5 30%, #978dab 60%, #413063);
  background: -moz-linear-gradient(to bottom, #b1aeb7, #a7a0b5 30%, #978dab 60%, #413063);
  background: -webkit-linear-gradient(to bottom, #b1aeb7, #a7a0b5 30%, #978dab 60%, #413063);
  background: -ms-linear-gradient(to bottom, #b1aeb7, #a7a0b5 30%, #978dab 60%, #413063);
  position: relative;
  .player-title {
    width: 100%;
    height: 0.6rem;
    border-bottom: 0.01rem solid #afafaf;
    i {
      height: 0.6rem;
      display: inline-block;
      box-sizing: border-box;
      padding: 0 0.15rem 0 0.15rem;
      font-size: 0.22rem;
      color: #fff;
      line-height: 0.6rem;
      vertical-align: middle;
    }
    .audio-info {
      flex: 1;
      height: 0.6rem;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      .audio-name {
        font-size: 0.16rem;
        color: #f7f7f7;
      }
      .audio-al {
        font-size: 0.13rem;
        color: #ccc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 0.2rem;
        i {
          display: inline-block;
          font-size: 0.13rem;
          color: #ccc;
          height: 100%;
          line-height: 0.2rem;
          padding-left: 0.05rem;
        }
      }
    }
  }
  .player-pic {
    flex: 1;
    box-sizing: border-box;
    margin-bottom: 1.5rem;
    text-align: center;
    width: 100%;
    height: 100%;
    position: relative;
    img{
      width: 60%;
      height: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 16%;
      border-radius: 50%;
      margin: auto;
      padding: 4%;
      border: 1px solid #ccc;
    }
    .picAnimation {
      animation: circling 15s linear infinite;
    }
  }
  .player-footer {
    width: 100%;
    height: 1.5rem;
    position: absolute;
    bottom: 0;
    left: 0;
    flex-direction: column;
    .progress-bar {
      flex: 1;
      box-sizing: border-box;
      padding: 0 0.15rem;
      justify-content: space-between;
      align-items: center;
      font-size: 0.12rem;
      line-height: 0.3rem;
      .update-time {
        color: #fff;
      }
      .total-time {
        color: #aaa;
      }
      .drag-bar {
        margin: 0 0.17rem;
        width: 100%;
        position: relative;
        .progress-line{
          width: 100%;
          height: 0.02rem;
          border-radius: 0.03rem;
          background: #bbb;
          vertical-align: middle;
          position: relative;
          .current-line {
            height: 0.02rem;
            width: 0;
            background: #d43c33;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        .drag-btn {
          width: 0.14rem;
          height: 0.14rem;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          top: 50%;
          left: -0.07rem;
          margin-top: -0.07rem;
          &::after {
            display: inline-block;
            content: "";
            width: 0.03rem;
            height: 0.03rem;
            background: #bbb;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -0.015rem;
            margin-left: -0.015rem;
          }
        }
      }
    }
    .operate-btn {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      box-sizing: border-box;
      padding: 0 0.15rem;
      margin: 0 0 0.3rem 0;
      justify-content: space-between;
      div {
        i {
          font-size: 0.25rem;
          color: #bbb;
        }
      }
      .operate-play {
        i {
          font-size: 0.55rem;
          color: #fff;
        }
      }
      .operate-prev,
      .operate-next {
        i {
          font-size: 0.4rem;
          color: #fff;
        }
      }
    }
  }
}
</style>