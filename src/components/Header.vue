<template>
  <header>
    <nav class="header__links">
      <div class="control">
        <router-link :to="{ name: 'home' }"> Home</router-link>
        <router-link :to="{ name: 'add' }" v-if="isAuth">
          Add Restaurant</router-link
        >
        <router-link :to="{ name: 'update' }" v-if="isAuth">
          Update Restaurant</router-link
        >
      </div>
      <li @click.prevent="logout" v-if="isAuth" class="logout">
        <a href="#">Logout</a>
      </li>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {};
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      this.$store.dispatch("logout");
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
  justify-content: space-between;
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
  .control {
    display: flex;
  }
}
</style>
