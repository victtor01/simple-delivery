import { fireEvent, render, screen } from "@testing-library/react";
import { RegisterAuth } from ".";

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

describe("register auth", () => {
  beforeEach(() => {
    render(<RegisterAuth />);
  });

  it("should input email be defined", () => {
    // get email input
    const email = document.getElementsByName("email")[0] as HTMLInputElement;
    // onchange in input
    fireEvent.change(email, { target: { value: "test@example.com" } });
    // tests
    expect(email).toBeInTheDocument();
    expect(email.value).toBe("test@example.com");
  });
});
