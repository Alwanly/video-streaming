<template>
  <router-link :to="url">
    <div class="card">
      <img :src="getImage(data.poster)" alt="test" />
      <div class="card-body">
        <p>Name : {{ data.name }}</p>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "Item-Videos",
  props: {
    data: Object,
  },
  data() {
    return {
      url: { name: "player", params: { id: this.data.id } },
    };
  },
  methods: {
    getImage(url) {
      return process.env.VUE_APP_API + url;
    },
    toPlayer() {
      this.$router.push({ name: "player", params: { id: this.data.id } });
    },
  },
};
</script>