export default {
  async fetch_restaurants(context) {
    const result = await fetch("http://localhost:3000/restaurants");
    const data = await result.json();
    if (data.length === 0) return;
    let restaurants = [];
    data.forEach((restaurant) => {
      restaurants.push(restaurant);
    });
    context.commit("update_restaurants", { restaurants });
  },
};
