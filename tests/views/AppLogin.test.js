// DEPENDENCIES
import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { createRouter, createWebHistory } from "vue-router";

// ROUTES
import { routes } from "@/router";

// COMPONENTS
import AppLogin from "@/views/AppLogin.vue";

let router;
let pinia;

beforeEach(() => {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });

  pinia = createTestingPinia();
});

describe("App Login", () => {
  it("should render the login view", () => {
    const wrapper = render(AppLogin, {
      global: {
        plugins: [router, pinia],
      },
    });

    const login = wrapper.queryByTestId("app-login");

    expect(login).toBeTruthy();
    expect(login).toBeInTheDocument();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
