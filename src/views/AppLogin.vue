<script setup>
// DEPENDENCIES
import { ref, useTemplateRef, onMounted } from "vue";

// COMPONENTS
import { ChevronRightIcon } from "@heroicons/vue/24/solid";

// REFS
const form = ref({
  username: "",
  password: "",
});

const userNameInputRef = useTemplateRef("username-input");

// METHODS
function handleLogin() {
  console.log("Logging in with:", form.value);

  // Reset form after login attempt
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
  >
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-bold">Log In</h1>
      <p>Please, inform your credentials to continue.</p>
    </div>

    <form class="grid grid-cols-1 gap-8" @submit.prevent="handleLogin">
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

      <button type="submit" class="app-button app-button--primary ml-auto">
        Continue

        <chevron-right-icon class="w-5 h-5" aria-hidden="true" />
      </button>
    </form>
  </div>
</template>
