import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "../../../src/components/SignUpForm/SignUpForm";

describe("Test in SingUpForm", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(<SignUpForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders SignUpForm with correct elements", () => {
    render(<SignUpForm />);

    // Verifica que los campos de entrada se renderizan
    expect(screen.getByLabelText(/Nombre/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellido/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Usuario/)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Dirección de correo electrónico/)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/)).toBeInTheDocument();

    // Verifica que el botón de envío se renderiza
    expect(
      screen.getByRole("button", { name: /Registrarse/ })
    ).toBeInTheDocument();
  });

  test("displays validation errors when fields are empty", async () => {
    render(<SignUpForm />);

    fireEvent.click(screen.getByRole("button", { name: /Registrarse/ }));

    expect(
      await screen.findByText("Se requiere el nombre")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Se requiere el apellido")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Se requiere el usuario")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Se requiere el correo electrónico")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Se requiere la contraseña")
    ).toBeInTheDocument();
  });
});
