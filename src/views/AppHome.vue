<script setup>
// DEPENDENCIES
import { kebabCase } from "lodash-es";
import { ref, computed, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useMoviesStore } from "@/stores/movies";

// COMPONENTS
import AppHeader from "@/components/AppHeader.vue";
import MovieList from "@/components/MovieList.vue";

// ASYNC COMPONENTS
const MovieFormModal = defineAsyncComponent(
  () => import("@/components/MovieFormModal.vue"),
);

// REFS
const store = useMoviesStore();

const isModalOpen = ref(false);

const { movies } = storeToRefs(store);

const movieToEdit = ref(null);

// COMPUTED
const moviesAverageRating = computed(() => {
  if (movies.value.length === 0) {
    return "0.0";
  }

  return (
    movies.value.reduce((acc, movie) => acc + (movie.rating || 0), 0) /
    movies.value.length
  ).toFixed(1);
});

const isANewMovie = computed(() => !movieToEdit.value?.id);

// METHODS
/**
 * It opens the modal.
 *
 * @param {object | null} movie - The movie object to update or null if it's a new one.
 */
function openModal(movie = null) {
  movieToEdit.value = movie;
  isModalOpen.value = true;
}

/**
 * It closes the modal.
 */
function closeModal() {
  movieToEdit.value = null;
  isModalOpen.value = false;
}

/**
 * It handles the save action of the movie form.
 *
 * @param {object} movie - The movie object to save.
 */
function handleSave(movie) {
  if (isANewMovie.value) {
    createMovie(movie);
  } else {
    updateMovie(movie);
  }
}

/**
 * It creates a new movie and adds it to the list.
 *
 * @param {object} movie - The movie object to create.
 */
function createMovie(movie) {
  const newMovie = {
    ...movie,
    id: crypto.randomUUID(),
    slug: kebabCase(movie.name),
    rating: null,
  };

  movies.value.push(newMovie);
}

/**
 * It updates a movie from the list.
 *
 * @param {object} movieData - The movie object to update.
 */
function updateMovie(movieData) {
  const movieIndex = movies.value.findIndex(
    (movie) => movie.id === movieData.id,
  );

  movies.value[movieIndex] = { ...movieData };
}

/**
 * It resets all movie ratings.
 */
function resetMovieRatings() {
  movies.value.forEach((movie) => (movie.rating = null));
}
</script>

<template>
  <div class="w-full flex-1 flex flex-col gap-12" data-testid="app-home">
    <app-header
      :total-movies="movies.length"
      :average-rating="moviesAverageRating"
      @reset-ratings="resetMovieRatings"
      @add-movie="openModal"
    />

    <main class="flex-1 flex">
      <movie-list
        v-model:movies="movies"
        @add-movie="openModal"
        @edit-movie="openModal"
      />
    </main>

    <movie-form-modal
      v-if="isModalOpen"
      v-bind="{
        isNew: isANewMovie,
        ...(movieToEdit && { initialValue: movieToEdit }),
      }"
      @update:movie="handleSave"
      @close="closeModal"
    />
  </div>
</template>
