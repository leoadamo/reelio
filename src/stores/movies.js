// DEPENDENCIES
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

// DATA
import { items as _INITIAL_MOVIES_LIST } from "@/data/movies.json";

export const useMoviesStore = defineStore("movies", () => {
  // STATE
  const movies = useStorage("movies", _INITIAL_MOVIES_LIST);

  // ACTIONS
  function getMovieById(id) {
    return movies.value.find((movie) => movie.id === id);
  }

  return {
    movies,
    getMovieById,
  };
});
