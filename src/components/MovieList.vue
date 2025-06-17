<script setup>
// COMPONENTS
import MovieItem from "@/components/MovieItem.vue";

// MODEL
const movies = defineModel("movies");

// EMITS
const emit = defineEmits(["edit-movie"]);

// METHODS
/**
 * It updates the rating of a movie.
 *
 * @param {object} payload - The object containing the movie id and rating.
 */
function updateRating({ id, rating }) {
  const movieIndex = movies.value.findIndex((movie) => movie.id === id);

  movies.value[movieIndex].rating = rating;
}

/**
 * It removes a movie from the list.
 *
 * @param {number} id - The movie id to remove.
 */
function removeMovie(id) {
  movies.value = movies.value.filter((movie) => movie.id !== id);
}

/**
 * It opens the modal with the movie data to edit.
 *
 * @param {number} id - The movie id to edit.
 */
function editMovie(id) {
  const movie = movies.value.find((movie) => movie.id === id);

  emit("edit-movie", movie);
}
</script>

<template>
  <transition tag="div" name="fade" mode="out-in">
    <transition-group
      v-if="movies.length > 0"
      tag="ul"
      name="list"
      class="relative grid grid-cols-3 gap-4 list-none"
    >
      <component v-for="movie in movies" :key="movie.id" :is="'li'">
        <movie-item
          :movie="movie"
          @update:rating="updateRating"
          @edit="editMovie"
          @remove="removeMovie"
        />
      </component>
    </transition-group>

    <div v-else class="flex-1 flex items-center justify-center">
      <p class="text-2xl text-white font-bold">
        Hey, there are no movies to show.
      </p>
    </div>
  </transition>
</template>
