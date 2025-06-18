// DEPENDENCIES
import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";

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
    beforeEnter: async (to, from) => {
      const store = await import("@/stores/movies");

      const { movies } = storeToRefs(store.useMoviesStore());

      const exists = movies.value.find((movie) => movie.id === to.params.id);

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
});

export default router;
