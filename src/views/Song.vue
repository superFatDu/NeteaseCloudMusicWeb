<template>
  <div class="song">
    <song-list :propList="originData" @turnToPlayer="toPlayer" v-show="!playerShow"></song-list>
    <song-player :propList="originData.tracks" :playIndex="playIndex" @showSongList="showSongList" v-show="playerShow"></song-player>
  </div>
</template>

<script>
import SongList from "../components/SongList";
import SongPlayer from "../components/SongPlayer";
import { SONG } from "../api/songList";

export default {
  name: "Song",
  components: {
    SongPlayer,
    SongList
  },
  data() {
    return {
      originData: {},
      playListInfo: {},
      playIndex: -1,
      playerShow: false
    };
  },
  methods: {
    getInit() {
      let params = {
        id: this.playListInfo.id
      };
      SONG.getList(params).then(res => {
        res = res.data;
        if (res.code === 200) {
          this.originData = res.playlist;
        }
      });
    },
    getParams() {
      if (this.$route.params.songInfo) {
        let res = this.$route.params.songInfo;
        sessionStorage.setItem("songInfo", res);
      }
      this.playListInfo = JSON.parse(this.$Base64.decode(sessionStorage.getItem("songInfo")));
    },
    toPlayer(idx) {
      this.playIndex = idx;
      this.playerShow = true;
    },
    showSongList() {
      this.playerShow = false;
    }
  },
  created() {
    this.getParams();
    this.getInit();
  }
};
</script>

<style lang="scss" scoped>
.song {
  width: 100%;
  height: 100%;
}
</style>