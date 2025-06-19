<script setup>
// DEPENDENCIES
import { computed } from "vue";

// COMPONENTS
import { StarIcon } from "@heroicons/vue/24/solid";

// PROPS
const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
});

// COMPUTED
const isRated = computed(() => {
  return Boolean(props.rating);
});

const ratingContent = computed(() => {
  return {
    0: {
      iconClass: "text-gray-500",
      textClass: "text-xl text-gray-400",
      textContent: "-",
    },

    1: {
      iconClass: "text-yellow-500",
      textClass: "text-xl text-yellow-800",
      textContent: props.rating,
    },
  }[Number(isRated.value)];
});
</script>

<template>
  <star-icon class="h-14 w-14" :class="ratingContent.iconClass" />

  <div class="absolute inset-0 flex items-center justify-center text-center">
    <span :class="ratingContent.textClass">
      {{ ratingContent.textContent }}
    </span>
  </div>
</template>
