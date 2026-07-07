import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validarTokenRequest, nuevoPasswordRequest } from "../../services/authService.js";

import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import PasswordInput from "../../components/ui/PasswordInput.jsx";

const ResetPassword = () => {

    const navigate = useNavigate();
    const { token } = useParams();
    const [valido, setValido] = useState(false);
    const [msg, setMsg] =  useState("");
    const [errorFormulario, setErrorFormulario] = useState("");
    const [errorToken, setErrorToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [verificando, setVerificando] = useState(true);

    const [form, setForm] = useState({
        password: "",
        confirmpassword: ""
    });

    useEffect(() => {
        const validar = async () => {
            try {
                await validarTokenRequest(token);
                setValido(true);
            } catch (error) {
                console.log(error);
                setErrorToken(error.response?.data?.msg || "Token inválido");
            }
            finally{
                setVerificando(false);
            }
        };
        validar();
    }, [token]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value

        });

    };

    // ENVIAR NUEVO PASSWORD
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorFormulario("");
        setMsg("");

        try {

            if ( !form.password || !form.confirmpassword ) {
                return setErrorFormulario( "Todos los campos son obligatorios" );
            }

            if ( form.password !== form.confirmpassword ) {
                return setErrorFormulario( "Las contraseñas no coinciden");
            }

            setLoading(true);
            const res = await nuevoPasswordRequest( token, form);
            setMsg(res.msg);
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.log(error);
            setErrorFormulario(
                error.response?.data?.msg ||
                "Error al actualizar contraseña"
            );

        } finally {
            setLoading(false);
        }

    };

    // TOKEN INVALIDO
    if (verificando) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md text-center">
                <h2 className="text-xl font-semibold">
                    Verificando enlace...
                </h2>

                <p className="text-sm text-gray-500 mt-3">
                    Espere un momento.
                </p>
            </Card>
        </div>
        )
    }
    if (!valido) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <p className="text-red-500 text-center">
                        {errorToken}
                    </p>
                    <p className="text-sm text-gray-500 text-center mt-3">
                    Solicite un nuevo enlace para restablecer su contraseña.
                    </p>
                     <div className="flex justify-center mt-5">
                    <Button
                        type="button"
                        onClick={() => navigate("/recuperar-password")}
                    >
                        Solicitar nuevo enlace
                    </Button>
                </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            <Card className="w-full max-w-md">

                <h2 className="text-2xl font-bold mb-4 text-center">

                    Nueva Contraseña

                </h2>

                <p className="text-sm text-gray-500 text-center mb-4">

                    Ingresa una nueva contraseña
                    para recuperar tu cuenta.

                </p>

                {msg && (

                    <p className="text-green-600 text-center mb-3">

                        {msg}

                    </p>

                )}

                {errorFormulario && (
                    <p className="text-red-500 text-center mb-3">
                        {errorFormulario}
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

export default ResetPassword;