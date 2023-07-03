import { render, cleanup } from "@testing-library/react";

import TestWrapper from "../TestWrapper";
import Login from "./Login";

describe("Login", function () {
  const setup = () => render(<Login />, { wrapper: TestWrapper });

  afterEach(() => cleanup());

  test("renders", () => expect(setup()).toBeTruthy());
});
