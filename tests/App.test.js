// DEPENDENCIES
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/vue";

// COMPONENTS
import App from "@/App.vue";

describe("App.vue", () => {
  it("Should render the App", () => {
    const wrapper = render(App, {
      global: {
        stubs: ["router-view"],
      },
    });

    const app = wrapper.queryByTestId("app");

    expect(app).toBeTruthy();
    expect(app).toBeInTheDocument();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
