<template>
  <div class="player">
    <audio :src="audioSrc" autoplay controls @ended="playJudge"></audio>
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
      index: this.playIndex
    };
  },
  methods: {
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
      debugger
      this.index += 1;
      this.playIndex = this.index;
      this.getSongInfo(this.index);
    }
  },
  mounted() {
    //this.getAllSrc();
  },
  watch: {
    playIndex(idx) {
      this.index = idx;
      this.getSongInfo(idx);
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  width: 100%;
  height: 100%;
}
</style>