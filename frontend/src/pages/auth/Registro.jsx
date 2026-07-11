import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUserRequest } from "../../services/authService.js";

import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import PasswordInput from "../../components/ui/PasswordInput.jsx";
import Input from "../../components/ui/Input.jsx";

const Registro = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmpassword: "",
        rol: "estudiante"
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    //Cambio de estado del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });

    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const nombre = form.nombre.trim();
        const apellido = form.apellido.trim(); 
        const email = form.email.trim().toLowerCase();

        if(!nombre || !apellido || !email || !form.password || !form.confirmpassword) {
            return setError(
                "Todos los campos son obligatorios"
            );
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return setError(
                "Ingrese un correo electrónico válido"
            );
        }
        if (form.password !== form.confirmpassword) {
            return setError(
                "Las contraseñas no coinciden"
            );
        }
        try {
            setLoading(true);
            const payload = {
                nombre,
                apellido,
                email,
                password: form.password,
                confirmpassword: form.confirmpassword,
                rol: form.rol
            };

            const res = await registerUserRequest(
                payload
            );
            setSuccess(res.msg);
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            console.log(err);
            setError(
                err.response?.data?.msg ||
                "Error al registrar usuario"
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-background px-4 py-8 overflow-y-auto">
            <div className="flex justify-center">

                <Card className="w-full max-w-md">

                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Registrarse
                    </h2>
                    <p className="text-sm text-muted-foreground text-center mt-2 mb-4">
                        Regístrate para acceder al sistema de refuerzo académico y realizar evaluaciones, consultar recursos y dar seguimiento a tu progreso.
                    </p>

                    {error && (
                        <p className="text-red-500 text-sm mb-3 text-center">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="text-green-600 text-sm mb-3 text-center">
                            {success}
                        </p>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3"
                    > 
                    <div className="space-y-1">
                         <label
                            htmlFor="nombre"
                            className="text-sm font-medium text-gray-700"
                         > Nombre </label>

                        <Input
                            type="text"
                            name="nombre"   
                            autoComplete="given-name"
                            placeholder="Ej. Jose, Andres, Ana, Carol, etc"
                            value={form.nombre}
                        onChange={handleChange} 
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="apellido"
                            className="text-sm font-medium text-gray-700"
                         > Apellido </label>
                        <Input
                            type="text"
                            name="apellido"
                            autoComplete="family-name"
                            placeholder="Ej. Perez, Torres, Erazo, etc"
                            value={form.apellido}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                         > Correo electrónico </label>
                        <Input
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Ej. micorreo@outlook.com"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700"
                         > Contraseña </label>
                       <PasswordInput
                            name="password"
                            placeholder="********"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                        <p className="text-xs text-gray-500">
                            La contraseña debe contener al menos 8 caracteres.
                        </p>
                        <p className="text-xs text-gray-500">
                            Debe incluir letras mayúsculas, minúsculas y números.
                        </p>
                    <div className="space-y-1">
                        <label
                            htmlFor="confirmpassword"
                            className="text-sm font-medium text-gray-700"
                         > Confirmación contraseña </label>
                        <PasswordInput
                            name="confirmpassword"  
                            placeholder="********"
                            value={form.confirmpassword}
                            onChange={handleChange} 
                            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                        <p className="text-xs text-gray-500">
                            Recuerda debe coincidir ambas contraseñas
                        </p>
                    <div className="space-y-1">
                        <label
                            htmlFor="rol"
                            className="text-sm font-medium text-gray-700"
                         >Rol del usuario </label>
                    <select
                        name="rol"
                        value={form.rol}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="estudiante">Estudiante </option>
                        <option value="tutor"> Tutor </option>
                    </select>
                    </div>
                    <p className="text-xs text-gray-500">
                        Estudiante: accede a recursos y evaluaciones.
                        Tutor: puede brindar acompañamiento académico.
                    </p>

                    <div className="flex justify-center">
                        <Button type="submit"
                            disabled = {loading}>
                            { loading
                                    ? "Registrando..."
                                    : "Registrarse"
                            }

                        </Button>
                    </div>
                </form>
            </Card>
            </div>
        </div>
    );
};

export default Registro;