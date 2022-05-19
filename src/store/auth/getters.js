export default {
  isAuth(state) {
    return state.username && state.email;
  },
  username(state) {
    return state.username;
  },
  email(state) {
    return state.email;
  },
};
