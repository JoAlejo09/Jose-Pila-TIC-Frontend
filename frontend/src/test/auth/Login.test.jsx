import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../../pages/auth/Login.jsx";

vi.mock("../../context/useAuth.js",()=>({
  useAuth:()=>({
    login: vi.fn(),
    usuario: null,
    autenticado:false
  }),
}));

vi.mock("../../services/authService.js", () => ({
  loginUserRequest: vi.fn(),
  reenviarConfirmacionRequest: vi.fn(),
}));

describe("Login", () => {
  test("Debe mostrar el formulario de inicio de sesión", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Correo electrónico")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/contraseña/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button",{name:/ingresar/i})
    ).toBeInTheDocument();
  });
});