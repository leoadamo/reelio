<script setup>
// DEPENDENCIES
import { ref, useTemplateRef, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// COMPONENTS
import { ChevronRightIcon } from "@heroicons/vue/24/solid";

// ROUTER
const router = useRouter();

// REFS
const form = ref({
  username: "",
  password: "",
});

const loginError = ref(null);

const userNameInputRef = useTemplateRef("username-input");

// ACTIONS
const { login } = useAuthStore();

// METHODS
function handleLogin() {
  try {
    // Attempt to log in with the provided credentials
    login(form.value.username, form.value.password);
    // Clear any previous login error
    loginError.value = null;
    // If successful, redirect to the home page
    nextTick(() => {
      router.push({ name: "home" });
    });
  } catch (error) {
    // Handle login error
    loginError.value = error.message || "Login failed. Please try again.";
    // Clear the password field for security reasons
    reset();
    // Focus on the username input field for better UX
    userNameInputRef.value?.focus();
  }
}

function reset() {
  form.value.username = "";
  form.value.password = "";
}

// LIFECYCLE HOOKS
onMounted(() => {
  userNameInputRef.value?.focus();
});
</script>

<template>
  <div
    class="w-full max-w-[400px] m-auto grid grid-cols-1 gap-8 p-8 text-white bg-gray-800 rounded-lg shadow-lg"
    data-testid="app-login"
  >
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-bold">Log In</h1>
      <p>Please, inform your credentials to continue.</p>
    </div>

    <form class="grid grid-cols-1 gap-5" @submit.prevent="handleLogin">
      <div class="relative grid grid-cols-1 gap-8 pb-5">
        <div class="flex flex-col gap-1">
          <label for="username">Username:</label>
          <input
            v-model="form.username"
            ref="username-input"
            id="username"
            type="text"
            class="border rounded border-gray-400 bg-gray-900"
            autocomplete="off"
            required
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="password">Password:</label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="border rounded border-gray-400 bg-gray-900"
            autocomplete="off"
            required
          />
        </div>

        <transition name="fade">
          <small
            v-if="loginError"
            class="absolute left-0 bottom-0 text-red-500 text-xs"
          >
            {{ loginError }}
          </small>
        </transition>
      </div>

      <button type="submit" class="app-button app-button--primary ml-auto">
        Continue

        <chevron-right-icon class="w-5 h-5" aria-hidden="true" />
      </button>
    </form>
  </div>
</template>
