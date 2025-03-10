import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CreateAccountPage from "../../../src/pages/CreateAccount/CreateAccountPage";

describe("Test in CreatAccountPage", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(
      <Router>
        <CreateAccountPage />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders CreateAccountPage with correct elements", () => {
    render(
      <Router>
        <CreateAccountPage />
      </Router>
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Regístrate"
    );
    expect(
      screen.getByText(
        /¡Bienvenido! 👋 Completa los siguientes campos para crear tu cuenta./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/¿Ya tienes una cuenta\? Inicia sesión/)
    ).toBeInTheDocument();
  });
});
