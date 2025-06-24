// DEPENDENCIES
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/vue";

// COMPONENTS
import NotFound from "@/views/NotFound.vue";

describe("Not Found View", () => {
  it("should render the not found view", () => {
    const wrapper = render(NotFound, {
      global: {
        stubs: ["router-link"],
      },
    });

    const notFound = wrapper.queryByTestId("not-found");

    expect(notFound).toBeTruthy();
    expect(notFound).toBeInTheDocument();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
