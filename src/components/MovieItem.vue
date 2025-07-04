<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

// COMPONENTS
import {
  StarIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
} from "@heroicons/vue/24/solid";
import MovieRating from "@/components/MovieRating.vue";
import GenresList from "@/components/GenresList.vue";

// EMITS
defineEmits(["update:rating", "edit", "remove"]);

// PROPS
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

// STORE
const { isAdmin, isAuthenticated } = storeToRefs(useAuthStore());
</script>

<template>
  <div
    class="w-full bg-white rounded-md flex flex-col items-center justify-start overflow-hidden shadow-2xl"
  >
    <div class="w-full h-[520px] overflow-hidden relative">
      <span
        v-show="movie.inTheaters"
        class="absolute top-0 left-0 bg-indigo-500 text-white py-1 px-2 text-xs rounded-br-md z-10"
      >
        In Theaters
      </span>

      <div class="absolute top-0 right-0">
        <movie-rating :rating="movie.rating" />
      </div>

      <img
        class="w-full h-full object-cover object-center"
        :src="movie.image"
        :alt="movie.name"
        width="380"
        height="520"
      />
    </div>

    <div class="w-full h-56 flex flex-col gap-2 items-start justify-start p-4">
      <div class="w-full flex flex-col gap-2 shrink-0">
        <h3 class="text-2xl sm:text-xl font-bold line-clamp-2">
          {{ movie.name }}
        </h3>

        <genres-list :genres="movie.genres" />
      </div>

      <div class="h-24 overflow-auto flex-1">
        <p class="text-sm">{{ movie.description }}</p>
      </div>

      <div
        class="w-full flex flex-wrap sm:flex-nowrap items-center justify-start h-auto sm:h-8 gap-2 sm:gap-0 shrink-0"
      >
        <span class="text-xs mr-2 leading-7 hidden sm:inline">
          Rating: ({{ movie.rating || 0 }}/5)
        </span>

        <div class="items-center justify-start flex flex-1 space-x-1">
          <button
            v-for="star in 5"
            :key="star"
            class="rounded-md disabled:cursor-not-allowed"
            :class="[
              star <= movie.rating ? 'text-yellow-500' : 'text-gray-500',
            ]"
            :disabled="!isAuthenticated || star === movie.rating"
            @click="
              $emit('update:rating', {
                id: movie.id,
                rating: star,
              })
            "
          >
            <star-icon class="h-5 w-5" />
          </button>
        </div>

        <button
          v-if="isAdmin"
          name="edit-movie"
          class="mr-2 p-2 rounded-full bg-gray-200 text-gray-500 transition-all hover:text-white hover:bg-purple-500"
          @click.prevent="$emit('edit', movie.id)"
        >
          <pencil-icon class="w-4 h-4" />
        </button>

        <button
          v-if="isAdmin"
          name="delete-movie"
          class="mr-2 p-2 rounded-full bg-gray-200 text-gray-500 transition-all hover:text-white hover:bg-red-500"
          @click.prevent="$emit('remove', movie.id)"
        >
          <trash-icon class="w-4 h-4" />
        </button>

        <router-link
          :to="{
            name: 'movie',
            params: { id: movie.id, slug: movie.slug },
          }"
          class="p-2 rounded-full bg-gray-200 text-gray-500 transition-all hover:text-white hover:bg-blue-500"
        >
          <eye-icon class="w-4 h-4" />
        </router-link>
      </div>
    </div>
  </div>
</template>
