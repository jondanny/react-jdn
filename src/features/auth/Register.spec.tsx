import { render, cleanup } from "@testing-library/react";

import TestWrapper from "../TestWrapper";
import Register from "./Register";

describe("Register", function () {
  const setup = () => render(<Register />, { wrapper: TestWrapper });

  afterEach(() => cleanup());

  test("renders", () => expect(setup()).toBeTruthy());
});
