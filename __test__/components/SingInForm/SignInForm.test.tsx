import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignInForm from "../../../src/components/SignInForm/SignInForm";

describe("Test in SingInForm", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(<SignInForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders SignInForm with correct elements", () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Iniciar sesión/i })
    ).toBeInTheDocument();
  });

  test("displays validation errors when fields are empty", async () => {
    render(<SignInForm />);

    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    expect(
      await screen.findByText("Se requiere el usuario")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Se requiere contraseña")
    ).toBeInTheDocument();
  });
});
