import { useEffect, useState } from "react";
import { crearMateriaRequest, actualizarMateriaRequest } from "../../services/materiaService";

import Input from "../ui/Input";

const ModalMateria = ({
    onClose,
    onMateriaCreada,
    modo = "crear",
    materiaSeleccionada
}) => {
    const [form, setForm] = useState({
        nombre: "",
        descripcion: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (
            modo === "editar" &&
            materiaSeleccionada
        ) {

            setForm({
                nombre: materiaSeleccionada.nombre || "",
                descripcion: materiaSeleccionada.descripcion || ""
            });

        }

    }, [modo, materiaSeleccionada]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");

        if (!form.nombre.trim()) {

            return setError(
                "El nombre de la materia es obligatorio"
            );

        }

        try {

            setLoading(true);

            if (modo === "crear") {

                await crearMateriaRequest(form);

            } else {

                await actualizarMateriaRequest(
                    materiaSeleccionada._id,
                    form
                );

            }

            onMateriaCreada();
            onClose();

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.msg ||
                "Error al guardar materia"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        {
                            modo === "crear"
                                ? "Nueva Materia"
                                : "Editar Materia"
                        }
                    </h2>

                    <p className="text-sm text-gray-500 text-center mt-1 ">
                        Completa la información de la materia.
                    </p>
                </div>

                {
                    error &&
                    (
                        <div className="
                            bg-red-100 border border-red-200
                            text-red-600 text-sm
                            rounded-lg p-3 mb-4
                        ">
                            {error}
                        </div>
                    )
                }

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* NOMBRE */}
                    <div>

                        <label className="
                            block mb-2
                            text-sm font-semibold text-gray-700
                        ">
                            Nombre
                        </label>

                        <Input
                            type="text"
                            name="nombre"
                            placeholder="Ej: Matemática"
                            value={form.nombre}
                            onChange={handleChange}
                            className="
                                w-full border border-gray-300
                                p-3 rounded-xl outline-none
                                focus:ring-2 focus:ring-green-500
                            "
                        />

                    </div>

                    {/* DESCRIPCION */}
                    <div>

                        <label className="
                            block mb-2
                            text-sm font-semibold text-gray-700
                        ">
                            Descripción
                        </label>

                        <textarea
                            name="descripcion"
                            placeholder="Descripción de la materia"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={4}
                            className="
                                w-full border border-gray-300
                                p-3 rounded-xl outline-none
                                focus:ring-2 focus:ring-green-500
                                resize-none
                            "
                        />

                    </div>

                    {/* BOTONES */}
                    <div className="
                        flex justify-end gap-3 pt-2
                    ">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                px-5 py-2 rounded-xl
                                bg-gray-400 hover:bg-gray-500
                                text-white transition
                            "
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                px-5 py-2 rounded-xl
                                bg-green-600 hover:bg-green-700
                                text-white transition
                                disabled:opacity-70
                            "
                        >

                            {
                                loading
                                    ? "Guardando..."
                                    : modo === "crear"
                                        ? "Crear"
                                        : "Actualizar"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ModalMateria;