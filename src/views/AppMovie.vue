<script setup>
// DEPENDENCIES
import { computed } from "vue";
import { useMoviesStore } from "@/stores/movies";

// COMPONENTS
import MovieRating from "@/components/MovieRating.vue";
import GenresList from "@/components/GenresList.vue";

// PROPS
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// ACTIONS
const { getMovieById } = useMoviesStore();

// COMPUTED
const movie = computed(() => {
  return getMovieById(props.id);
});
</script>

<template>
  <div class="flex gap-6 my-auto">
    <div class="relative w-[400px] h-[600px] shadow-2xl">
      <div class="absolute top-0 right-0">
        <movie-rating :rating="movie.rating" />
      </div>

      <img
        :src="movie.image"
        :alt="movie.name"
        width="400"
        height="600"
        class="w-full h-full object-cover rounded-lg"
      />
    </div>

    <div class="flex flex-col items-start justify-start gap-6 flex-1">
      <h1 class="flex flex-col gap-1 text-2xl font-bold text-white">
        {{ movie.name }}

        <small class="text-xs text-gray-500">
          {{ movie.inTheaters ? "(In Theaters)" : "(Coming Soon)" }}
        </small>
      </h1>

      <p class="text-white">{{ movie.description }}</p>

      <genres-list :genres="movie.genres" />
    </div>
  </div>
</template>
