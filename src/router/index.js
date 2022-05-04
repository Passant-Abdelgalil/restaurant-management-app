import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log(from.name);
  if (
    to.name !== "signup" &&
    (!localStorage.getItem("user-email") ||
      !localStorage.getItem("user-username"))
  ) {
    next({ name: "signup" });
  } else if (
    to.name === "signup" &&
    localStorage.getItem("user-email") &&
    localStorage.getItem("user-username")
  )
    return next({ name: "home" });
  else next();
});
export default router;
