import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    obtenerPerfilRequest,
    actualizarPerfilRequest,
    actualizarFotoPerfilRequest
} from "../../services/perfilService.js";

const CompletarPerfil = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);

    const [form, setForm] = useState({
        telefono: "",
        direccion: "",
        fechaNacimiento: "",
        institucion: "",
        nivelAcademico: "",

        especialidad: "",
        experiencia: "",
        titulacion: "",
        descripcion: ""
    });

    const [imagen, setImagen] = useState(null);

    const [loading, setLoading] = useState(true);

    const [guardar, setGuardar] = useState(false);

    const [error, setError] = useState("");

    const [msg, setMsg] = useState("");

    useEffect(() => {

        const cargarUsuario = async () => {

            try {

                const data = await obtenerPerfilRequest();

                setUsuario(data.usuario);

            } catch (error) {

                console.log(error);

                setError("Error al cargar usuario");

            } finally {

                setLoading(false);

            }

        };

        cargarUsuario();

    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleImagenChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImagen(file);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setMsg("");

        try {

            setGuardar(true);

            // SUBIR FOTO
            if (imagen) {

                await actualizarFotoPerfilRequest(imagen);

            }

            // GUARDAR PERFIL
            const res = await actualizarPerfilRequest(form);

            setMsg(res.msg);

            setTimeout(() => {

                navigate("/dashboard");

            }, 1500);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.msg ||
                "Error al completar perfil"
            );

        } finally {

            setGuardar(false);

        }

    };

    if (loading) {

        return (
            <p className="text-center mt-10">
                Cargando...
            </p>
        );

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

                <h1 className="text-3xl font-bold mb-2 text-center">
                    Completar Perfil
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Complete su información personal
                </p>

                {error && (
                    <p className="bg-red-100 text-red-600 p-3 rounded mb-4">
                        {error}
                    </p>
                )}

                {msg && (
                    <p className="bg-green-100 text-green-600 p-3 rounded mb-4">
                        {msg}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* FOTO */}
                    <div>

                        <label className="block mb-1 font-semibold">
                            Foto de Perfil
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImagenChange}
                            className="w-full border p-2 rounded"
                        />

                    </div>

                    {/* TELEFONO */}
                    <div>

                        <label className="block mb-1 font-semibold">
                            Teléfono
                        </label>

                        <input
                            type="text"
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />

                    </div>

                    {/* ESTUDIANTE */}
                    {usuario?.rol === "estudiante" && (
                        <>

                            {/* INSTITUCION */}
                            <div>

                                <label className="block mb-1 font-semibold">
                                    Institución
                                </label>

                                <input
                                    type="text"
                                    name="institucion"
                                    value={form.institucion}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                            </div>

                            {/* NIVEL */}
                            <div>

                                <label className="block mb-1 font-semibold">
                                    Nivel Académico
                                </label>

                                <select
                                    name="nivelAcademico"
                                    value={form.nivelAcademico}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                >

                                    <option value="">
                                        Seleccione el año en el que se encuentra
                                    </option>

                                    <option value="1ro BGU">
                                        1° Bachillerato
                                    </option>

                                    <option value="2do BGU">
                                        2° Bachillerato
                                    </option>

                                    <option value="3ro BGU">
                                        3° Bachillerato
                                    </option>

                                </select>

                            </div>

                            {/* DIRECCION */}
                            <div>

                                <label className="block mb-1 font-semibold">
                                    Dirección
                                </label>

                                <input
                                    type="text"
                                    name="direccion"
                                    value={form.direccion}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                            </div>

                            {/* FECHA */}
                            <div>

                                <label className="block mb-1 font-semibold">
                                    Fecha de Nacimiento
                                </label>

                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    value={form.fechaNacimiento}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                            </div>

                        </>
                    )}

                    {/* TUTOR */}
                    {usuario?.rol === "tutor" && (
                        <>

                            {/* ESPECIALIDAD */}
                            <div>

                                <label className="block mb-1 font-semibold">
                                    Especialidad
                                </label>

                                <input
                                    type="text"
                                    name="especialidad"
                                    value={form.especialidad}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                            </div>

                            {/* EXPERIENCIA */}
                            <div>

                                <label className="block mb-1 font-semibold">
                                    Experiencia
                                </label>

                                <input
                                    type="text"
                                    name="experiencia"
                                    value={form.experiencia}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                            </div>

                            {/* TITULACION */}
                            <div>

                                <label className="block mb-1 font-semibold">
                                    Titulación
                                </label>

                                <input
                                    type="text"
                                    name="titulacion"
                                    value={form.titulacion}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                            </div>

                            {/* DESCRIPCION */}
                            <div>

                                <label className="block mb-1 font-semibold">
                                    Descripción
                                </label>

                                <textarea
                                    name="descripcion"
                                    value={form.descripcion}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                            </div>

                        </>
                    )}

                    {/* BOTON */}
                    <button
                        type="submit"
                        disabled={guardar}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    >

                        {
                            guardar
                                ? "Guardando..."
                                : "Completar Perfil"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

};

export default CompletarPerfil;