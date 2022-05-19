export default {
  restaurants(state) {
    return state.restaurants;
  },
  isEmpty(state) {
    return state.restaurants.length == 0;
  },
};
