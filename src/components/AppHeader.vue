<script setup>
// DEPENDENCIES
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

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

// STORE
const store = useAuthStore();

const { logout } = store;

const { user, isAdmin, isAuthenticated } = storeToRefs(store);

// COMPUTED
const isRemoveRatingsDisabled = computed(() => {
  return props.totalMovies === 0;
});
</script>

<template>
  <header class="w-full flex flex-col gap-4">
    <div class="relative flex items-center">
      <transition name="fade" appear>
        <h1
          v-if="isAuthenticated"
          class="text-2xl text-white font-bold"
          data-testid="greeting-message"
        >
          Hello, {{ user.username }}!
        </h1>
      </transition>

      <transition name="fade" mode="out-in" appear>
        <router-link
          v-if="!isAuthenticated"
          :to="{ name: 'login' }"
          class="app-button app-button--primary ml-auto"
          data-testid="login-button"
        >
          Log In

          <chevron-right-icon class="w-5 h-5" aria-hidden="true" />
        </router-link>

        <button
          v-else
          class="app-button app-button--primary ml-auto bg-red-500 hover:bg-red-600"
          data-testid="logout-button"
          @click="logout"
        >
          Log Out
        </button>
      </transition>
    </div>

    <div class="flex items-center justify-between min-h-[42px]">
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
        <template v-if="isAdmin">
          <button
            class="app-button app-button--secondary"
            :class="{
              'opacity-50 cursor-not-allowed transition-all':
                isRemoveRatingsDisabled,
            }"
            :disabled="isRemoveRatingsDisabled"
            @click="$emit('reset-ratings')"
          >
            Clear Ratings
          </button>

          <button
            class="app-button app-button--primary"
            @click="$emit('add-movie')"
          >
            Create Movie
          </button>
        </template>
      </div>
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
