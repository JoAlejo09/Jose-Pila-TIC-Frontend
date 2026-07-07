import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  cambiarPasswordRequest
} from "../../services/authService.js";

import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import PasswordInput from "../../components/ui/PasswordInput.jsx";

const CambiarPassword = () => {

    const navigate = useNavigate();

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        password: "",
        confirmpassword: ""
    });

    // CAMBIOS INPUT
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ENVIAR PASSWORD
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMsg("");
        try {
            // VALIDAR CAMPOS
            if ( !form.password || !form.confirmpassword) {
                return setError( "Todos los campos son obligatorios" );
            }

            // VALIDAR COINCIDENCIA
            if ( form.password !== form.confirmpassword) {
                return setError( "Las contraseñas no coinciden");
            }
            setLoading(true);

            const res = await cambiarPasswordRequest( form );
            setMsg(res.msg);
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.msg ||
                "Error al cambiar contraseña"
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center px-4">

            <Card className="w-full max-w-md">

                <h2 className="text-2xl font-bold mb-4 text-center">

                    Cambiar Contraseña

                </h2>

                <p className="text-sm text-gray-500 text-center mb-4">

                    Debes actualizar tu contraseña
                    antes de continuar.

                </p>

                {msg && (

                    <p className="text-green-600 text-center mb-3">

                        {msg}

                    </p>

                )}

                {error && (

                    <p className="text-red-500 text-center mb-3">

                        {error}

                    </p>

                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-3"
                >
                    <PasswordInput
                        name="password"
                        placeholder="Nueva contraseña"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500">
                        La contraseña debe contener al menos 8 caracteres.
                    </p>
                    <p className="text-xs text-gray-500">
                        Debe incluir letras mayúsculas, minúsculas y números.
                    </p>

                    <PasswordInput
                        name="confirmpassword"
                        placeholder="Confirmar contraseña"
                        value={form.confirmpassword}
                        onChange={handleChange}
                    />

                    <div className="flex justify-center">

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Guardando..."
                                : "Guardar"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CambiarPassword;