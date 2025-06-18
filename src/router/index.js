// DEPENDENCIES
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/movies/:id/:slug",
    name: "movie-detail",
    component: () => import("@/views/MovieDetail.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
