const PasoInformacion = ({
    form,
    handleChange
})=>{

    return(

        <div className="space-y-6">

            {/* TITULO */}

            <div>

                <label className="block mb-2 font-medium text-gray-700">

                    Título de evaluación

                </label>

                <input
                    type="text"
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    placeholder="Ejemplo: Diagnóstico de Funciones"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

            </div>

            {/* TIPO CUESTIONARIO */}

            <div>

                <label className="block mb-2 font-medium text-gray-700">

                    Tipo de evaluación

                </label>

                <select
                    name="tipoEvaluacion"
                    value={form.tipoEvaluacion}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >

                    <option value="diagnostico">

                        Diagnóstico

                    </option>

                    <option value="refuerzo">

                        Refuerzo

                    </option>

                    <option value="practica">

                        Práctica

                    </option>

                    <option value="simulador">

                        Simulador

                    </option>

                </select>

            </div>

            {/* DESCRIPCION */}

            <div>

                <label className="block mb-2 font-medium text-gray-700">

                    Descripción

                </label>

                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción general de la evaluación"
                    className="w-full border border-gray-300 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* INSTRUCCIONES */}

            <div>

                <label className="block mb-2 font-medium text-gray-700">

                    Instrucciones

                </label>

                <textarea
                    name="instrucciones"
                    value={form.instrucciones}
                    onChange={handleChange}
                    placeholder="Indicaciones para el estudiante"
                    className="w-full border border-gray-300 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* ALERTA VISUAL */}

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">

                <h3 className="font-semibold text-blue-700 mb-2">

                    Información importante

                </h3>

                <p className="text-sm text-blue-600 leading-relaxed">

                    Las evaluaciones diagnósticas permiten medir conocimientos
                    previos antes del acceso a recursos académicos.
                    Las evaluaciones de refuerzo permiten medir el aprendizaje
                    posterior al estudio de recursos educativos.

                </p>

            </div>

        </div>
    );
};

export default PasoInformacion;