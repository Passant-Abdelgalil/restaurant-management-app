<template>
  <header>
    <nav class="header__links">
      <router-link :to="{ name: 'home' }"> Home</router-link>
      <router-link :to="{ name: 'add' }"> Add Restaurant</router-link>
      <router-link :to="{ name: 'update' }"> Update Restaurant</router-link>
      <li @click.prevent="logout"><a href="#">Logout</a></li>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.removeItem("user-email");
      localStorage.removeItem("user-username");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #333;
}
.header__links {
  list-style: none;
  display: flex;
  align-items: flex-end;
  a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 20px;
    &:visited {
      color: white;
    }
    &:hover {
      background-color: white;
      color: #333;
    }
  }
}
</style>
