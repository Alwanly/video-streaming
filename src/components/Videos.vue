<template>
  <div class="row">
    <div class="col-sm-4" v-for="item in videos" v-bind:key="item.id">
      <item-video :data="item" />
    </div>
  </div>
</template>
<script>
import ItemVideo from "../components/ItemVideo.vue";
import { ApiServices } from "../services/index";
export default {
  name: "videos",
  components: {
    ItemVideo,
  },
  data() {
    return {
      videos: [],
    };
  },
  methods: {
    async fetchVideo() {
      let data = await ApiServices.get("videos");
      this.videos = data.data;
    },
  },
  mounted() {
    this.fetchVideo();
  },
};
</script>