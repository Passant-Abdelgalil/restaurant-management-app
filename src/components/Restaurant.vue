<template>
  <div class="restaurant-card" v-if="restaurant">
    <h2 class="restaurant-card__title">{{ title }}</h2>
    <p class="restaurant-card__contact">{{ contact }}</p>
    <p class="restaurant-card__address">{{ address }}</p>
  </div>
</template>

<script>
export default {
  props: ["restaurant"],
  name: "RestaurantCard",
  computed: {
    title() {
      return this.restaurant.name;
    },
    contact() {
      return this.restaurant.contact;
    },
    address() {
      return this.restaurant.address;
    },
  },
};
</script>

<style lang="scss" scoped>
.restaurant-card {
  padding: 20px;
  background-color: #eee;
  border: 1px solid #888;
  border-radius: 12px;
}
</style>
