import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
export default {
  state() {
    return { username: null, email: null };
  },
  getters,
  mutations,
  actions,
};
