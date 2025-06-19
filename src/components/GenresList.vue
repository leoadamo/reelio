<script setup>
// PROPS
defineProps({
  genres: {
    type: Array,
    required: true,
  },
});

// METHODS
/**
 * It formats a given genre in order to properly display it.
 *
 * @param {string} genre - The genre category.
 * @returns {string} The formatted genre.
 */
function formatGenre(genre) {
  return genre.charAt(0).toUpperCase() + genre.slice(1);
}
</script>

<template>
  <div class="flex items-center justify-start gap-1">
    <span
      v-for="genre in genres"
      :key="genre"
      class="py-0.5 px-2 text-xs bg-indigo-500 text-white rounded-full"
    >
      {{ formatGenre(genre) }}
    </span>
  </div>
</template>
