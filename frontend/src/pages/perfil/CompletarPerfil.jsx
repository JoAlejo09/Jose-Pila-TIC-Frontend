import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck } from "lucide-react";

import {
    obtenerPerfilRequest,
    actualizarPerfilRequest,
    actualizarFotoPerfilRequest
} from "../../services/perfilService.js";

const CompletarPerfil = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);

    const [form, setForm] = useState({
        //Para estudiante
        telefono: "",
        direccion: "",
        fechaNacimiento: "",
        institucion: "",
        nivelAcademico: "",
        //Para tutor
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
                if(usuario.rol === "estudiante"){
                    navigate("/dashboard/");
                }else{
                    navigate("/dashboard/tutor");
                }
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

                <div className="text-center mb-6">
                    <UserCheck
                    size={52}
                    className="mx-auto text-blue-600 mb-3"/>
                 <h1 className="text-3xl font-bold">
                    ¡Bienvenido a RefAcademy!
                </h1>

                <p className="text-gray-500 mt-2">
                    Antes de acceder al sistema es necesario completar su perfil.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-blue-700 mb-2">
                        Primer acceso al sistema
                    </h3>
                    <p className="text-sm text-blue-700">
                        Este proceso solo debe realizarse una vez. La información registrada permitirá personalizar su experiencia dentro del sistema y habilitar todas las funcionalidades disponibles.
                        </p>
                </div>
            </div>

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
                <div className="bg-gray-50 border rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-600">
                        Tipo de cuenta
                    </p>
                    <p className="font-semibold text-blue-600 capitalize">
                        {usuario?.rol}
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* FOTO */}
                    <div>

                        <label className="block mb-1 font-semibold">
                            Foto de Perfil
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                            Seleccione una fotografía que permita identificar su perfil dentro del sistema. <br/>
                            Puede dejar sin seleccionar
                        </p>
                        
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImagenChange}
                            className="w-full border p-2 rounded"
                        />

                    </div>
                    <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                        Información General
                    </h2>
                    {/* TELEFONO */}
                    <div>

                        <label className="block mb-1 font-semibold">
                            Teléfono
                        </label>

                        <input
                            type="text"
                            name="telefono"
                            placeholder="Ej. 2313221 o 0948112342"
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
                                <h2 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">
                                    Información Académica
                                </h2>
                                <label className="block mb-1 font-semibold">
                                    Institución
                                </label>

                                <input
                                    type="text"
                                    name="institucion"
                                    placeholder="Unidad educativa a la que pertenece"
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
                                    placeholder="Direccion exacta requerida"
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
                                <h2 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">
                                    Información Profesional
                                </h2>

                                <label className="block mb-1 font-semibold">
                                    Especialidad
                                </label>

                                <input
                                    type="text"
                                    name="especialidad"
                                    placeholder="Nombre de la carrera o Titulo obtenido"
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
                                    placeholder="Tiene experiencia en temas de tutorías"
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
                                    placeholder="Titulo de tercer o cuarto nivel"
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
                                    placeholder="Detalles y características de su forma de dar tutorías"
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
                                : "Guardar información y continuar"
                        }

                    </button>

                </form>
                <p className="text-xs text-center text-gray-500 mt-4">
                    Una vez completado el perfil será redirigido automáticamente al panel principal.
                </p>
            </div>

        </div>

    );

};

export default CompletarPerfil;