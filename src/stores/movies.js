// DEPENDENCIES
import { ref } from "vue";
import { defineStore } from "pinia";

// DATA
import { items as _INITIAL_MOVIES_LIST } from "@/data/movies.json";

export const useMoviesStore = defineStore("movies", () => {
  // STATE
  const movies = ref(_INITIAL_MOVIES_LIST);

  // ACTIONS
  function getMovieById(id) {
    return movies.value.find((movie) => movie.id === id);
  }

  return {
    movies,
    getMovieById,
  };
});
