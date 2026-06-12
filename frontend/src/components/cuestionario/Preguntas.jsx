const PasoPreguntas = ({
    form,
    preguntasFiltradas,
    handlePregunta,
    handleChange
})=>{

    return(

        <div className="space-y-6">

            {/* ALERTA */}

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">

                <h3 className="font-semibold text-gray-700 mb-2">

                    Banco de preguntas

                </h3>

                <p className="text-sm text-gray-600">

                    Las preguntas disponibles se filtran automáticamente
                    según:
                    materia,
                    unidad,
                    nivel académico
                    y configuración de evaluación.

                </p>

            </div>

            {/* ESTADISTICAS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">

                    <p className="text-sm text-blue-600">

                        Preguntas disponibles

                    </p>

                    <h2 className="text-3xl font-bold text-blue-700 mt-2">

                        {preguntasFiltradas.length}

                    </h2>

                </div>

                <div className="bg-green-50 rounded-2xl p-5 border border-green-100">

                    <p className="text-sm text-green-600">

                        Preguntas seleccionadas

                    </p>

                    <h2 className="text-3xl font-bold text-green-700 mt-2">

                        {form.preguntas.length}

                    </h2>

                </div>

                <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">

                    <p className="text-sm text-purple-600">

                        Modo generación

                    </p>

                    <h2 className="text-xl font-bold text-purple-700 mt-2 capitalize">

                        {form.modoGeneracion}

                    </h2>

                </div>

            </div>

            {/* MANUAL */}

            {
                form.modoGeneracion === "manual"
                &&
                <div>

                    <div className="flex items-center justify-between mb-4">

                        <h3 className="font-semibold text-gray-700 text-lg">

                            Seleccionar preguntas

                        </h3>

                        <span className="text-sm text-gray-500">

                            {form.preguntas.length} seleccionadas

                        </span>

                    </div>

                    <div className="border border-gray-200 rounded-2xl overflow-hidden">

                        <div className="max-h-[450px] overflow-y-auto divide-y divide-gray-100">

                            {
                                preguntasFiltradas.length === 0
                                &&
                                <div className="p-8 text-center text-gray-500">

                                    No existen preguntas disponibles

                                </div>
                            }

                            {
                                preguntasFiltradas.map((pregunta)=>(

                                    <div
                                        key={pregunta._id}
                                        className="p-5 hover:bg-gray-50 transition"
                                    >

                                        <div className="flex items-start gap-4">

                                            <input
                                                type="checkbox"
                                                checked={
                                                    form.preguntas.includes(
                                                        pregunta._id
                                                    )
                                                }
                                                onChange={()=>
                                                    handlePregunta(
                                                        pregunta._id
                                                    )
                                                }
                                                className="mt-1"
                                            />
                                        

                                            <div className="flex-1">

                                                <h4 className="font-medium text-gray-800">

                                                    {pregunta.enunciado}

                                                </h4>

                                                <div className="flex flex-wrap gap-2 mt-3">

                                                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">

                                                        {
                                                            pregunta.unidad?.nombre
                                                            ||
                                                            pregunta.materia?.nombre
                                                        }

                                                    </span>

                                                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">

                                                        {
                                                            pregunta.tipoPregunta
                                                        }

                                                    </span>

                                                    <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">

                                                        {
                                                            pregunta.nivelDificultad
                                                        }

                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                    </div>

                </div>
            }

            {/* DINAMICO */}

            {
                form.modoGeneracion === "dinamico"
                &&
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

                    <h3 className="font-semibold text-yellow-700 mb-3">

                        Generación dinámica

                    </h3>

                    <p className="text-sm text-yellow-700 leading-relaxed mb-4">

                        El sistema seleccionará automáticamente preguntas
                        aleatorias según la configuración académica establecida.

                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>

                            <label className="block mb-2 font-medium text-gray-700">

                                Cantidad preguntas

                            </label>

                            <input
                                type="number"
                                name="cantidadPreguntas"
                                value={form.cantidadPreguntas}
                                onChange={handleChange}
                                min="1"
                                max={preguntasFiltradas.length}
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                        </div>

                        <div className="flex items-end">

                            <div className="text-sm text-gray-600">

                                Disponibles:
                                <strong>
                                    {" "}
                                    {preguntasFiltradas.length}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>
            }

        </div>
    );
};

export default PasoPreguntas;