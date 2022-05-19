import { createStore } from "vuex";
import authModule from "./auth/index";
import restaurantsModule from "./restaurant";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { authModule, restaurantsModule },
});
