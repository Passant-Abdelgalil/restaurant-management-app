import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import AddRestaurant from "../views/AddRestaurant.vue";
import UpdateRestaurant from "../views/UpdateRestaurant.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/add-restaurant",
    name: "add",
    component: AddRestaurant,
    meta: { requiresAuth: true },
  },
  {
    path: "/update-restaurant",
    name: "update",
    component: UpdateRestaurant,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log(to.name);
  if (!to.meta.requiresAuth) return next();

  if (
    !localStorage.getItem("user-email") ||
    !localStorage.getItem("user-username")
  ) {
    next({ name: "signup" });
  } else if (to.name === "login" || to.name === "signup")
    next({ name: "signup" });
  else next();
});
export default router;
