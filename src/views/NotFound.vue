<template>
  <div class="flex-1 flex flex-col items-center justify-center gap-6">
    <img src="/images/not-found.png" alt="" width="300" height="300" />

    <h1 class="text-2xl text-white font-bold">Error 404</h1>

    <p class="text-gray-400">
      The movie you are looking for might have been removed, had its name
      changed, or is temporarily unavailable.
    </p>

    <router-link :to="{ name: 'home' }" class="primary-button">
      Go back home
    </router-link>
  </div>
</template>
