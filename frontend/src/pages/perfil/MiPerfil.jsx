import { useEffect, useState } from "react";
import { obtenerPerfilRequest, actualizarPerfilRequest, actualizarFotoPerfilRequest } from "../../services/perfilService.js";

const MiPerfil = () => {
    const [perfil, setPerfil] = useState(null);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [editando, setEditando] = useState(false);
    const [mostrarMenuFoto, setMostrarMenuFoto] = useState(false);
    const [cargarFoto, setCargarFoto] = useState(false);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const data = await obtenerPerfilRequest();
                setPerfil(data);
                setForm({
                    nombre: data.usuario?.nombre || "",
                    apellido: data.usuario?.apellido || "",

                    telefono: data.perfil?.telefono || "",
                    direccion: data.perfil?.direccion || "",

                    fechaNacimiento:
                        data.perfil?.fechaNacimiento
                            ? data.perfil.fechaNacimiento.split("T")[0]
                            : "",

                    institucion: data.perfil?.institucion || "",
                    nivelAcademico: data.perfil?.nivelAcademico || "",

                    especialidad: data.perfil?.especialidad || "",
                    experiencia: data.perfil?.experiencia || "",
                    titulacion: data.perfil?.titulacion || "",
                    descripcion: data.perfil?.descripcion || ""
                });
            } catch (error) {
                console.log(error);
                setError("Error al cargar perfil");
            } finally {
                setLoading(false);
            }
        };
        cargarPerfil();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMsg("");
        try {
            const res = await actualizarPerfilRequest(form);
            setMsg(res.msg);
            const data = await obtenerPerfilRequest();
            setPerfil(data);
            setEditando(false);
        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.msg ||
                "Error al actualizar perfil"
            );
        }
    };

    const handleFotoChange = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;
            setCargarFoto(true);

            const res = await actualizarFotoPerfilRequest(file);
            const data = await obtenerPerfilRequest();

            setPerfil(data);
            setMsg(res.msg);
        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.msg ||
                "Error al subir la foto"
            );
        } finally {
            setCargarFoto(false);
            setMostrarMenuFoto(false);
        }
    };

    if (loading) {
        return (
            <p className="text-center mt-10">
                Cargando perfil...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center mt-10 text-red-500">
                {error}
            </p>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold"> Mi Perfil </h1>

                <div className="flex flex-col items-center relative">
                    <img
                        src={perfil?.usuario?.fotoPerfil}
                        alt="Foto Perfil"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow cursor-pointer hover:opacity-80 transition"
                        onClick={() =>
                            setMostrarMenuFoto(!mostrarMenuFoto)
                        }/>

                    {cargarFoto && (
                        <p className="mt-2 text-sm text-blue-600">
                            Subiendo imagen...
                        </p>
                    )}

                    {mostrarMenuFoto && (
                        <div className="absolute top-36 bg-white shadow-lg rounded-lg border w-48 z-50">
                            <label className="block px-4 py-3 hover:bg-gray-100 cursor-pointer">
                                Cambiar foto
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFotoChange}
                                />
                            </label>
                        </div>
                    )}
                </div>

                {!editando && (
                    <button
                        onClick={() => setEditando(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Editar Perfil
                    </button>
                )}
            </div>

            {msg && (
                <p className="text-green-600 mb-4">
                    {msg}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded p-6 space-y-4"
            >

                <div>
                    <label className="font-semibold">
                        Nombre
                    </label>
                    {editando ? (
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mt-1"
                        />
                    ) : (
                        <p className="mt-1">
                            {perfil?.usuario?.nombre}
                        </p>
                    )}
                </div>

                <div>
                    <label className="font-semibold">
                        Apellido
                    </label>
                    {editando ? (

                        <input
                            type="text"
                            name="apellido"
                            value={form.apellido}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mt-1"
                        />
                    ) : (

                        <p className="mt-1">
                            {perfil?.usuario?.apellido}
                        </p>
                    )}
                </div>

                <div>
                    <label className="font-semibold">
                        Email
                    </label>
                    <p className="mt-1">
                        {perfil?.usuario?.email}
                    </p>
                </div>

                <div>
                    <label className="font-semibold">
                        Rol
                    </label>
                    <p className="mt-1 capitalize">
                        {perfil?.usuario?.rol}
                    </p>
                </div>

                {perfil?.usuario?.rol === "estudiante" && (
                    <>
                        <div>
                            <label className="font-semibold">
                                Nivel Académico
                            </label>
                            <input
                                type="text"
                                disabled
                                value={
                                    perfil?.perfil?.nivelAcademico || "No registrado"
                                }
                                className="w-full border p-2 rounded mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">
                                Teléfono
                            </label>
                            {editando ? (

                                <input
                                    type="text"
                                    name="telefono"
                                    value={form.telefono}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            ) : (
                                <p className="mt-1">
                                    {perfil?.perfil?.telefono || "No registrado"}
                                </p>
                            )}
                        </div>
                        {/* DIRECCION */}
                        <div>
                            <label className="font-semibold">
                                Dirección
                            </label>
                            {editando ? (
                                <input
                                    type="text"
                                    name="direccion"
                                    value={form.direccion}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            ) : (
                                <p className="mt-1">
                                    {perfil?.perfil?.direccion || "No registrada"}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="font-semibold">
                                Fecha de Nacimiento
                            </label>
                            {editando ? (
                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    value={form.fechaNacimiento}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            ) : (
                                <p className="mt-1">
                                    {perfil?.perfil?.fechaNacimiento
                                        ? new Date(
                                            perfil.perfil.fechaNacimiento
                                        ).toLocaleDateString()
                                        : "No registrada"}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="font-semibold">
                                Institución
                            </label>
                            {editando ? (
                                <input
                                    type="text"
                                    name="institucion"
                                    value={form.institucion}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            ) : (
                                <p className="mt-1">
                                    {perfil?.perfil?.institucion || "No registrada"}
                                </p>
                            )}
                        </div>
                    </>
                )}

                {/* TUTOR */}
                {perfil?.usuario?.rol === "tutor" && (
                    <>
                        <div>
                            <label className="font-semibold">
                                Teléfono
                            </label>
                            {editando ? (

                                <input
                                    type="text"
                                    name="telefono"
                                    value={form.telefono}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            ) : (
                                <p className="mt-1">
                                    {perfil?.perfil?.telefono || "No registrado"}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold">
                                Especialidad
                            </label>
                            {editando ? (
                                <input
                                    type="text"
                                    name="especialidad"
                                    value={form.especialidad}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            ) : (
                                <p className="mt-1">
                                    {perfil?.perfil?.especialidad || "No registrada"}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold">
                                Experiencia
                            </label>
                            {editando ? (
                                <input
                                    type="text"
                                    name="experiencia"
                                    value={form.experiencia}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            ) : (
                                <p className="mt-1">
                                    {perfil?.perfil?.experiencia || "No registrada"}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold">
                                Titulación
                            </label>
                            {editando ? (
                                <input
                                    type="text"
                                    name="titulacion"
                                    value={form.titulacion}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            ) : (
                                <p className="mt-1">
                                    {perfil?.perfil?.titulacion || "No registrada"}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold"> Descripción</label>
                            {editando ? (
                                <textarea
                                    name="descripcion"
                                    value={form.descripcion}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            ) : (
                                <p className="mt-1">
                                    {perfil?.perfil?.descripcion || "No registrada"}
                                </p>
                            )}
                        </div>
                    </>
                )}
                {/*Actualizar y Cancelar */}
                {editando && (
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setEditando(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                            Actualizar
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default MiPerfil;