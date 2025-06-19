<script setup>
// COMPONENTS
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <router-link :to="{ name: 'home' }" class="app-button app-button--primary">
    <chevron-left-icon class="w-5 h-5" aria-hidden="true" />

    Go back home
  </router-link>
</template>
