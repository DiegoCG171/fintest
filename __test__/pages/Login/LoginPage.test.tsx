import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "../../../src/pages/Login/LoginPage";

describe("Test in LoginPage", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders LoginPage with correct elements", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Iniciar sesión"
    );
    expect(
      screen.getByText(
        /¡Bienvenido! 👋 Ingresa tu correo y contraseña para iniciar sesión./
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/¿Olvidaste tu contraseña?/)).toBeInTheDocument();
    expect(
      screen.getByText(/¿No tienes una cuenta\? Regístrate/)
    ).toBeInTheDocument();
  });
});
