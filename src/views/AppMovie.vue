<script setup>
// DEPENDENCIES
import { computed, defineAsyncComponent } from "vue";
import { useMoviesStore } from "@/stores/movies";

// COMPONENTS
import MovieRating from "@/components/MovieRating.vue";
import GenresList from "@/components/GenresList.vue";
import BackButton from "@/components/BackButton.vue";

// ASYNC COMPONENTS
const YoutubePlayer = defineAsyncComponent(() => import("vue3-youtube"));

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
  <div class="flex flex-col sm:flex-row gap-6">
    <div class="relative w-full max-w-[400px] shadow-2xl">
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

      <div class="w-full">
        <youtube-player :src="movie.trailer" width="100%" />
      </div>

      <back-button class="mt-auto ml-auto" />
    </div>
  </div>
</template>
