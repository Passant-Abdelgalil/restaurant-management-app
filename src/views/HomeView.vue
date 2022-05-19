<template>
  <div class="home" v-if="!isLoading">
    <h1>Restaurants</h1>
    <ul v-if="hasRestaurants">
      <restaurant-card
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </ul>
    <div v-else>
      <p>No restaurants yet!</p>
    </div>
  </div>
</template>

<script>
import RestaurantCard from "@/components/Restaurant.vue";
export default {
  name: "HomeView",
  components: { RestaurantCard },
  data() {
    return {
      isLoading: true,
      error: null,
    };
  },
  computed: {
    restaurants() {
      return this.$store.getters.restaurants;
    },
    hasRestaurants() {
      return !this.$store.getters.isEmpty;
    },
  },
  mounted() {
    this.$store
      .dispatch("fetch_restaurants")
      .then(() => (this.isLoading = false))
      .catch(() => (this.error = "something went wrong"));
  },
};
</script>
