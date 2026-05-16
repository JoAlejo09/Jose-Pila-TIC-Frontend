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
        nombre:"",
        apellido:"",
        email:"",
        password:"",
        confirmpassword:"",
        rol:"estudiante"
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if( !form.nombre || !form.apellido || !form.email || !form.password || !form.confirmpassword ){
            return setError( "Todos los campos son obligatorios");
        }

        if(form.password !== form.confirmpassword){
            return setError( "Las contraseñas no coinciden" );
        }
        try {
            setLoading(true);
            const res = await registerUserRequest(form);
            setSuccess(res.msg);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(
                err.response?.data?.msg ||
                "Error al registrar usuario"
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Registrarse
                </h2>

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
                    className="space-y-3">

                    <Input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}/>

                    <Input
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        value={form.apellido}
                        onChange={handleChange}/>

                    <Input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}/>

                    <PasswordInput
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>

                    <PasswordInput
                        name="confirmpassword"
                        placeholder="Confirmar contraseña"
                        value={form.confirmpassword}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    <select
                        name="rol"
                        value={form.rol}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="estudiante">Estudiante</option>
                        <option value="tutor">Tutor</option>
                    </select>
                    <div className="flex justify-center">

                        <Button type="submit">

                            {
                                loading
                                    ? "Registrando..."
                                    : "Registrarse"
                            }

                        </Button>

                    </div>

                </form>

            </Card>

        </div>

    );

};

export default Registro;