import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RegisterEnter } from "./register-enter";

jest.mock("../../app/fonts", () => ({
  fontInter: "mocked-font-class",
}));

describe("register enter", () => {
  beforeEach(() => {
    render(<RegisterEnter />);
  });

  it("should render RegisterEnter", () => {
    expect(
      screen.getByText("Olá! Seja muito bem vindo ao")
    ).toBeInTheDocument();

    expect(screen.getByText("Mundo delivery!")).toBeInTheDocument();
  });
});
