<script setup>
// DEPENDENCIES
import { computed } from "vue";

// COMPONENTS
import { ChevronRightIcon } from "@heroicons/vue/24/solid";

// EMITS
defineEmits(["reset-ratings", "add-movie"]);

// PROPS
const props = defineProps({
  totalMovies: {
    type: Number,
    required: true,
  },

  averageRating: {
    type: [Number, String],
    required: true,
  },
});

// COMPUTED
const isRemoveRatingsDisabled = computed(() => {
  return props.totalMovies === 0;
});
</script>

<template>
  <header class="w-full flex items-center justify-between">
    <transition mode="out-in" appear>
      <p
        :key="`${totalMovies}-${averageRating}`"
        class="text-lg font-medium text-white"
      >
        Total movies: {{ totalMovies }}
        <span class="m-4">/</span>
        Average Rating: {{ averageRating }}
      </p>
    </transition>

    <div class="flex gap-4">
      <router-link
        :to="{ name: 'login' }"
        class="app-button app-button--primary"
      >
        Log In

        <chevron-right-icon class="w-5 h-5" aria-hidden="true" />
      </router-link>

      <button
        class="app-button app-button--primary"
        :class="{
          'opacity-50 cursor-not-allowed transition-all':
            isRemoveRatingsDisabled,
        }"
        :disabled="isRemoveRatingsDisabled"
        @click="$emit('reset-ratings')"
      >
        Remove Ratings
      </button>

      <button
        class="app-button app-button--primary"
        @click="$emit('add-movie')"
      >
        Add Movie
      </button>
    </div>
  </header>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
