<template>
  <div>
    <video controls muted autoplay crossorigin="anonymous">
      <source :src="getVideo()" type="video/mp4" />
      <track
        label="English"
        kind="captions"
        srcLang="en"
        :src="getCaption()"
        default
      >
    </video>
  </div>
</template>
<script>
export default {
  name: "Player",
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    getVideo() {
      return process.env.VUE_APP_API + "video/" + this.id;
    },
    getCaption() {
      return process.env.VUE_APP_API + "video/" + this.id + "/caption";
    },
  },
};
</script>