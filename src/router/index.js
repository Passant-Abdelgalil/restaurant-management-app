import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import AddRestaurant from "../views/AddRestaurant.vue";
import UpdateRestaurant from "../views/UpdateRestaurant.vue";
import PageNotFound from "../views/PageNotFound.vue";
import state from "../store";
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
  {
    path: "/:notFound(.*)*",
    name: "404",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _, next) => {
  if (to.name === "signup" || to.name === "login") {
    if (state.getters.isAuth) next({ name: "home" });
    else next();
    return;
  }
  if (!to.meta.requiresAuth) return next();
  if (!state.getters.isAuth) {
    next({ name: "login" });
  } else next();
});
export default router;
