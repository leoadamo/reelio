// DEPENDENCIES
import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

// ROUTER
import router from "@/router";

// COMPONENTS
import AppHome from "@/views/AppHome.vue";

describe("App Home", () => {
  it("should render the home view", () => {
    const wrapper = render(AppHome, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    });

    const home = wrapper.queryByTestId("app-home");

    expect(home).toBeTruthy();
    expect(home).toBeInTheDocument();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should display the login button when the user is not authenticated", () => {
    const wrapper = render(AppHome, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    });

    const loginButton = wrapper.queryByTestId("login-button");

    expect(loginButton).toBeTruthy();
    expect(loginButton).toBeInTheDocument();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should redirect to the login page when clicking on the login button", async () => {
    const wrapper = render(AppHome, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    });

    const loginButton = wrapper.queryByTestId("login-button");

    const { currentRoute } = router;

    expect(currentRoute.value.path).toBe("/");

    await fireEvent.click(loginButton);
    await router.isReady();

    expect(currentRoute.value.path).toBe("/login");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should not display the login button when the user is authenticated", () => {
    const pinia = createTestingPinia({
      initialState: {
        auth: {
          user: {
            id: "ae7e3a07-b4f0-466f-a420-370dbb9a2184",
            username: "user_test",
            password: "user_test_123",
            isAdmin: false,
          },
        },
      },
    });

    const wrapper = render(AppHome, {
      global: {
        plugins: [router, pinia],
      },
    });

    const loginButton = wrapper.queryByTestId("login-button");

    expect(loginButton).toBeNull();
    expect(loginButton).not.toBeInTheDocument();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should display an welcome message and a logout button when the user is authenticated", () => {
    const pinia = createTestingPinia({
      initialState: {
        auth: {
          user: {
            id: "ae7e3a07-b4f0-466f-a420-370dbb9a2184",
            username: "user_test",
            password: "user_test_123",
            isAdmin: false,
          },
        },
      },
    });

    const wrapper = render(AppHome, {
      global: {
        plugins: [router, pinia],
      },
    });

    const greetingMessage = wrapper.queryByTestId("greeting-message");
    const logoutButton = wrapper.queryByTestId("logout-button");

    expect(greetingMessage).toBeTruthy();
    expect(greetingMessage).toBeInTheDocument();
    expect(greetingMessage.textContent).toContain("Hello, user_test!");
    expect(logoutButton).toBeTruthy();
    expect(logoutButton).toBeInTheDocument();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
