export default {
  autoLogin(context) {
    context.username = localStorage.getItem("username");
    context.email = localStorage.getItem("email");
  },
  login(context, payload) {
    context.username = payload.username;
    context.email = payload.email;
  },
  logout(context) {
    context.username = null;
    context.email = null;
  },
};
