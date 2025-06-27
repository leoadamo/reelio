// DEPENDENCIES
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { createRouter, createWebHistory } from "vue-router";

// STORE
import { useAuthStore } from "@/stores/auth";

// ROUTES
import { routes } from "@/router";

// COMPONENTS
import AppLogin from "@/views/AppLogin.vue";

// MOCKS
const credentialsMock = {
  username: "test_user",
  password: "test_user_123",
};

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

  it("should not log-in when missing required fields", async () => {
    const auth = useAuthStore();

    const loginSpy = vi.spyOn(auth, "login");

    const wrapper = render(AppLogin, {
      global: {
        plugins: [router, pinia],
      },
    });

    const usernameInput = wrapper.queryByTestId("username-input");
    const passwordInput = wrapper.queryByTestId("password-input");
    const submitButton = wrapper.queryByTestId("submit-button");

    await fireEvent.update(usernameInput, "");
    await fireEvent.update(passwordInput, "");
    await fireEvent.click(submitButton);

    expect(loginSpy).not.toHaveBeenCalled();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should log-in successfully and then redirect to the home page", async () => {
    const auth = useAuthStore();

    const loginSpy = vi.spyOn(auth, "login");
    const routerSpy = vi.spyOn(router, "push");

    const wrapper = render(AppLogin, {
      global: {
        plugins: [router, pinia],
      },
    });

    const usernameInput = wrapper.queryByTestId("username-input");
    const passwordInput = wrapper.queryByTestId("password-input");
    const submitButton = wrapper.queryByTestId("submit-button");

    await fireEvent.update(usernameInput, credentialsMock.username);
    await fireEvent.update(passwordInput, credentialsMock.password);
    await fireEvent.click(submitButton);

    expect(loginSpy).toHaveBeenCalledOnce();
    expect(loginSpy).toHaveBeenCalledWith(
      credentialsMock.username,
      credentialsMock.password,
    );
    expect(loginSpy).not.throws();
    expect(routerSpy).toHaveBeenCalledOnce();
    expect(routerSpy).toHaveBeenCalledWith({ name: "home" });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should throw an error when trying to log-in", async () => {
    const auth = useAuthStore();

    const loginSpy = vi.spyOn(auth, "login");

    loginSpy.mockImplementation(() => {
      throw new Error("Invalid username or password, please try again.");
    });

    const wrapper = render(AppLogin, {
      global: {
        plugins: [router, pinia],
      },
    });

    const usernameInput = wrapper.queryByTestId("username-input");
    const passwordInput = wrapper.queryByTestId("password-input");
    const loginButton = wrapper.queryByTestId("submit-button");

    await fireEvent.update(usernameInput, credentialsMock.username);
    await fireEvent.update(passwordInput, credentialsMock.password);
    await fireEvent.click(loginButton);

    expect(loginSpy).toHaveBeenCalledOnce();
    expect(loginSpy).toHaveBeenCalledWith(
      credentialsMock.username,
      credentialsMock.password,
    );
    expect(loginSpy).toThrowError(
      "Invalid username or password, please try again.",
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should display an error message when login fails", async () => {
    const auth = useAuthStore();

    const loginSpy = vi.spyOn(auth, "login");

    loginSpy.mockImplementation(() => {
      throw new Error("Invalid username or password, please try again.");
    });

    const wrapper = render(AppLogin, {
      global: {
        plugins: [router, pinia],
      },
    });

    const usernameInput = wrapper.queryByTestId("username-input");
    const passwordInput = wrapper.queryByTestId("password-input");
    const loginButton = wrapper.queryByTestId("submit-button");

    await fireEvent.update(usernameInput, credentialsMock.username);
    await fireEvent.update(passwordInput, credentialsMock.password);
    await fireEvent.click(loginButton);

    const errorMessage = wrapper.queryByTestId("error-message");

    expect(errorMessage).toBeTruthy();
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      "Invalid username or password, please try again.",
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
