// DEPENDENCIES
import { omit } from "lodash-es";
import { computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

// DATA
import { users as _USERS } from "@/data/users.json";

export const useAuthStore = defineStore("auth", () => {
  // STATE
  const user = useStorage("user", {});

  // GETTERS
  const isAuthenticated = computed(() => Boolean(user.value.id));

  const isAdmin = computed(() => isAuthenticated.value && user.value.isAdmin);

  // ACTIONS
  function login(username, password) {
    const loggedUser = _USERS.find(
      (u) => u.username === username && u.password === password,
    );

    if (loggedUser) {
      user.value = omit(loggedUser, ["password"]);
    } else {
      throw new Error("Invalid username or password, please try again.");
    }
  }

  function logout() {
    user.value = null;
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
  };
});
