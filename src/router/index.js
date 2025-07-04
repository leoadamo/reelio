// DEPENDENCIES
import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/AppHome.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/AppLogin.vue"),
    beforeEnter: async () => {
      const store = await import("@/stores/auth");

      const { isAuthenticated } = storeToRefs(store.useAuthStore());

      if (isAuthenticated.value) {
        return { name: "home" };
      }
    },
  },
  {
    path: "/movies/:id/:slug",
    name: "movie",
    component: () => import("@/views/AppMovie.vue"),
    props: (route) => ({
      id: route.params.id,
    }),
    beforeEnter: async (to) => {
      const store = await import("@/stores/movies");

      const { getMovieById } = store.useMoviesStore();

      const exists = getMovieById(to.params.id);

      if (!exists) {
        return {
          name: "not-found",
          params: { pathMatch: to.path.split("/").slice(1) },
          query: to.query,
          hash: to.hash,
        };
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: "smooth" };
  },
});

export { routes };

export default router;
