import { fireEvent, render, screen } from "@testing-library/react";
import { RegisterPersonInformation } from ".";

jest.mock("react-hook-form", () => {
  const originalModule = jest.requireActual("react-hook-form");
  return {
    ...originalModule,
    useFormContext: () => ({
      register: (name: string) => ({
        onChange: jest.fn(),
        name,
      }),
    }),
  };
});

describe("register person informations", () => {
  beforeEach(() => {
    render(<RegisterPersonInformation />);
  });

  it("should render title", () => {
    expect(
      screen.getByText("Preencha as informações necessárias.")
    ).toBeDefined();
  });

  it("should update input values when typing", () => {
    // Use descriptive placeholders for clarity
    const nameInput = screen.getByPlaceholderText("João") as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "Martins"
    ) as HTMLInputElement;

    // Simulate typing in the inputs
    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(emailInput, { target: { value: "Doe" } });

    // Assert that the input values are updated correctly
    expect(nameInput.value).toBe("John");
    expect(emailInput.value).toBe("Doe");
  });
});
