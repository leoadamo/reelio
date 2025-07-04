<script setup>
// DEPENDENCIES
import { kebabCase } from "lodash-es";
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

const greetingMessage = computed(() => {
  return isAuthenticated.value
    ? `Hello, ${user.value.username}!`
    : "Welcome to Reelio!";
});
</script>

<template>
  <header class="w-full flex flex-col gap-8">
    <div class="relative flex justify-between items-center gap-4">
      <transition name="fade" mode="out-in" appear>
        <h1
          :key="kebabCase(greetingMessage)"
          class="text-xl sm:text-2xl text-white font-bold"
          data-testid="greeting-message"
        >
          {{ greetingMessage }}
        </h1>
      </transition>

      <transition name="fade" mode="out-in" appear>
        <router-link
          v-if="!isAuthenticated"
          :to="{ name: 'login' }"
          class="app-button app-button--primary"
          data-testid="login-button"
        >
          Log In

          <chevron-right-icon class="w-5 h-5" aria-hidden="true" />
        </router-link>

        <button
          v-else
          class="app-button app-button--primary bg-red-500 hover:bg-red-600"
          data-testid="logout-button"
          @click="logout"
        >
          Log Out
        </button>
      </transition>
    </div>

    <div
      class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between min-h-[42px]"
    >
      <transition mode="out-in" appear>
        <p
          :key="`${totalMovies}-${averageRating}`"
          class="text-base sm:text-lg font-medium text-white"
        >
          Total movies: {{ totalMovies }}
          <span class="m-2">/</span>
          Average Rating: {{ averageRating }}
        </p>
      </transition>

      <transition name="fade">
        <div v-if="isAdmin" class="w-full sm:w-auto flex flex-row gap-4">
          <button
            class="app-button app-button--secondary grow"
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
            class="app-button app-button--primary grow"
            @click="$emit('add-movie')"
          >
            Create Movie
          </button>
        </div>
      </transition>
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
