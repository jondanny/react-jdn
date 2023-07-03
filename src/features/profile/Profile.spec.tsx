import { render, cleanup } from "@testing-library/react";

import TestWrapper from "../TestWrapper";
import Profile from "./Profile";

describe("Profile", function () {
  const setup = () => render(<Profile />, { wrapper: TestWrapper });

  afterEach(() => cleanup());

  test("renders", () => expect(setup()).toBeTruthy());
});
