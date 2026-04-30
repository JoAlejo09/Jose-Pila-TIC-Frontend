import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserRequest } from "../../services/authService";
import { useAuth } from "../../context/useAuth";

import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import PasswordInput from "../../components/ui/PasswordInput.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("Todos los campos son obligatorios");
    }

    try {
      setLoading(true);

      const data = await loginUserRequest(form);

      login(data);

      // 🔥 redirigir directo
      navigate("/dashboard");

    } catch (error) {
      setError(error.response?.data?.msg || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Iniciar Sesión
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-primary"
          />

          <PasswordInput
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />

          <div className="text-right">
            <Link
              to="/recuperar-password"
              className="text-sm text-primary hover:underline"
            >
              ¿Olvidaste la contraseña?
            </Link>
          </div>

          <div className="flex justify-center mt-2">
            <Button type="submit" disabled={loading} className="w-48">
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;