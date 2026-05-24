import { useEffect, useState } from "react";

import {
    crearTemaRequest,
    actualizarTemaRequest
} from "../../services/temaService.js";

import {
    obtenerUnidadesRequest
} from "../../services/unidadService.js";

const ModalTema = ({
    onClose,
    onTemaCreado,
    modo = "crear",
    temaSeleccionado
}) => {

    const [unidades, setUnidades] = useState([]);

    const [form, setForm] = useState({
        unidad: "",
        nombre: "",
        descripcion: "",
        orden: 1
    });

    const [error, setError] = useState("");

    // CARGAR UNIDADES
    useEffect(() => {

        const cargarUnidades = async () => {

            try {

                const data =
                    await obtenerUnidadesRequest();

                const activas = data.filter(
                    (u) => u.estado
                );

                setUnidades(activas);

            } catch (error) {

                console.log(error);

            }
        };

        cargarUnidades();

    }, []);

    // EDITAR
    useEffect(() => {

        if (
            modo === "editar" &&
            temaSeleccionado
        ) {

            setForm({
                unidad:
                    temaSeleccionado.unidad?._id || "",

                nombre:
                    temaSeleccionado.nombre || "",

                descripcion:
                    temaSeleccionado.descripcion || "",

                orden:
                    temaSeleccionado.orden || 1
            });
        }

    }, [modo, temaSeleccionado]);

    // CAMBIOS
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            if (
                !form.unidad ||
                !form.nombre
            ) {

                return setError(
                    "Todos los campos obligatorios deben completarse"
                );
            }

            if (modo === "crear") {

                await crearTemaRequest(form);

            } else {

                await actualizarTemaRequest(
                    temaSeleccionado._id,
                    form
                );
            }

            onTemaCreado();

            onClose();

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.msg ||
                "Error al guardar tema"
            );
        }
    };

    return (

        <div className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50 px-4
        ">

            <div className="
                bg-white w-full max-w-md
                rounded-2xl shadow-xl p-6
            ">

                {/* TITULO */}
                <h2 className="
                    text-2xl font-bold
                    mb-6 text-center
                ">
                    {
                        modo === "crear"
                            ? "Nuevo Tema"
                            : "Editar Tema"
                    }
                </h2>

                {/* ERROR */}
                {
                    error && (
                        <p className="
                            text-red-500 text-sm
                            mb-4 text-center
                        ">
                            {error}
                        </p>
                    )
                }

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* UNIDAD */}
                    <div>

                        <label className="
                            block mb-1 font-semibold
                        ">
                            Unidad
                        </label>

                        <select
                            name="unidad"
                            value={form.unidad}
                            onChange={handleChange}
                            className="
                                w-full border border-gray-300
                                p-3 rounded-lg outline-none
                                focus:ring-2 focus:ring-green-500
                            "
                        >

                            <option value="">
                                Seleccione una unidad
                            </option>

                            {
                                unidades.map((unidad) => (

                                    <option
                                        key={unidad._id}
                                        value={unidad._id}
                                    >
                                        {unidad.nombre}
                                        {" - "}
                                        {
                                            unidad.materia?.nombre
                                        }

                                    </option>
                                ))
                            }

                        </select>

                    </div>

                    {/* NOMBRE */}
                    <div>

                        <label className="
                            block mb-1 font-semibold
                        ">
                            Nombre
                        </label>

                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre del tema"
                            value={form.nombre}
                            onChange={handleChange}
                            className="
                                w-full border border-gray-300
                                p-3 rounded-lg outline-none
                                focus:ring-2 focus:ring-green-500
                            "
                        />

                    </div>

                    {/* DESCRIPCION */}
                    <div>

                        <label className="
                            block mb-1 font-semibold
                        ">
                            Descripción
                        </label>

                        <textarea
                            name="descripcion"
                            placeholder="Descripción del tema"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={4}
                            className="
                                w-full border border-gray-300
                                p-3 rounded-lg outline-none
                                focus:ring-2 focus:ring-green-500
                                resize-none
                            "
                        />

                    </div>

                    {/* ORDEN */}
                    <div>

                        <label className="
                            block mb-1 font-semibold
                        ">
                            Orden
                        </label>

                        <input
                            type="number"
                            name="orden"
                            min="1"
                            value={form.orden}
                            onChange={handleChange}
                            className="
                                w-full border border-gray-300
                                p-3 rounded-lg outline-none
                                focus:ring-2 focus:ring-green-500
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
                                bg-gray-400 hover:bg-gray-500
                                text-white px-5 py-2 rounded-lg
                            "
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="
                                bg-green-600 hover:bg-green-700
                                text-white px-5 py-2 rounded-lg
                            "
                        >
                            {
                                modo === "crear"
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

export default ModalTema;