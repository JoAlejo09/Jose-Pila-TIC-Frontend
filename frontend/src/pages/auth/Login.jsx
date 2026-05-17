import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUserRequest, reenviarConfirmacionRequest } from "../../services/authService";

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
  const [mostrarReenvio, setMostrarReenvio] = useState(false);
  const [emailPendiente, setEmailPendiente] = useState("");
  const [mensajeReenvio, setMensajeReenvio] = useState("");
  const [loadingReenvio, setLoadingReenvio] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensajeReenvio("");
    setMostrarReenvio(false);
    if (!form.email || !form.password) {
      return setError(
        "Todos los campos son obligatorios"
      );
    }
    try {
      setLoading(true);
      const data = await loginUserRequest(form);

      // GUARDAR SESION
      login(data);

      // OBLIGAR CAMBIO PASSWORD
      if (data.debeCambiarPassword) {
        return navigate("/cambiar-password" );
      }
      // VALIDAR PERFIL COMPLETO
      if (!data.perfilCompleto) {
        return navigate( "/completar-perfil" );
      }
      // DASHBOARD
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      const backendError = error.response?.data;

      setError(
        backendError?.msg ||
        "Error al iniciar sesión"
      );

      if (backendError?.noVerificada) {
        setMostrarReenvio(true);
        setEmailPendiente(
          backendError.email
        );
      }
    } finally {
      setLoading(false);
    }

  };

  const handleReenviar = async () => {

    try {
      setLoadingReenvio(true);
      setMensajeReenvio("");

      const data = await reenviarConfirmacionRequest(
          emailPendiente
        );
      setMensajeReenvio(data.msg);
    } catch (error) {
      console.log(error);
      setMensajeReenvio(
        error.response?.data?.msg ||
        "Error al reenviar correo"
      );
    } finally {
      setLoadingReenvio(false);
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

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-primary"
          />

          {/* PASSWORD */}
          <PasswordInput
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />

          {/* RECUPERAR PASSWORD */}
          <div className="text-right">
            <Link
              to="/recuperar-password"
              className="text-sm text-primary hover:underline"
            >
              ¿Olvidaste la contraseña?
            </Link>
          </div>

          {/* BOTON */}
          <div className="flex justify-center mt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-48"
            >
              {loading
                ? "Ingresando..."
                : "Ingresar"}
            </Button>
          </div>
        </form>

        {/* REENVIAR CONFIRMACION */}
        {mostrarReenvio && (
          <div className="mt-5 border-t pt-4 text-center">
            <p className="text-sm text-gray-600 mb-3">
              ¿No recibiste el correo de confirmación?
            </p>
            <button
              onClick={handleReenviar}
              disabled={loadingReenvio}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {loadingReenvio
                ? "Reenviando..."
                : "Reenviar correo"}
            </button>

            {mensajeReenvio && (
              <p className="mt-3 text-sm text-green-600">
                {mensajeReenvio}
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Login;