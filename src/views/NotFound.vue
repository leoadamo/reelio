<script setup>
// COMPONENTS
import BackButton from "@/components/BackButton.vue";
</script>

<template>
  <div
    class="flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-[500px] m-auto"
  >
    <img src="/images/not-found.png" alt="" width="300" height="300" />

    <h1 class="text-2xl text-white font-bold">Error 404</h1>

    <p class="text-center text-gray-400">
      The movie you are looking for might have been removed, had its name
      changed, or is temporarily unavailable.
    </p>

    <back-button />
  </div>
</template>
