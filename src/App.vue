<template>
  <Header />
  <router-view />
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  name: "app",
  components: { Header },
  mounted() {
    if (this.$store.dispatch("autoLogin")) {
      this.$router.push({ name: "home" });
    }
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
