const PasoConfiguracion = ({
    form,
    handleChange,
    materias,
    unidades
})=>{

    return(

        <div className="space-y-6">

            {/* FILA 1 */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* ALCANCE */}

                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        Alcance de evaluación

                    </label>

                    <select
                        name="alcanceEvaluacion"
                        value={form.alcanceEvaluacion}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="materia">
                            Materia completa
                        </option>

                        <option value="unidad">
                            Unidad específica
                        </option>

                    </select>

                </div>

                {/* NIVEL */}

                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        Nivel académico

                    </label>

                    <select
                        name="nivelAcademico"
                        value={form.nivelAcademico}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="1ro BGU">
                            1ro BGU
                        </option>

                        <option value="2do BGU">
                            2do BGU
                        </option>

                        <option value="3ro BGU">
                            3ro BGU
                        </option>

                    </select>

                </div>

            </div>

            {/* FILA 2 */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* MATERIA */}

                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        Materia

                    </label>

                    <select
                        name="materia"
                        value={form.materia}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">
                            Seleccionar materia
                        </option>

                        {
                            materias.map((materia)=>(

                                <option
                                    key={materia._id}
                                    value={materia._id}
                                >

                                    {materia.nombre}

                                </option>
                            ))
                        }

                    </select>

                </div>

                {/* UNIDAD */}

                {
                    form.alcanceEvaluacion === "unidad"
                    &&
                    <div>

                        <label className="block mb-2 font-medium text-gray-700">

                            Unidad

                        </label>

                        <select
                            name="unidad"
                            value={form.unidad}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >

                            <option value="">
                                Seleccionar unidad
                            </option>

                            {
                                unidades.map((unidad)=>(

                                    <option
                                        key={unidad._id}
                                        value={unidad._id}
                                    >

                                        {unidad.nombre}

                                    </option>
                                ))
                            }

                        </select>

                    </div>
                }

            </div>

            {/* FILA 3 */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* MODO */}

                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        Modo generación

                    </label>

                    <select
                        name="modoGeneracion"
                        value={form.modoGeneracion}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3"
                    >

                        <option value="manual">
                            Manual
                        </option>

                        <option value="dinamico">
                            Dinámico
                        </option>

                    </select>

                </div>

                {/* DIFICULTAD */}

                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        Dificultad

                    </label>

                    <select
                        name="nivel"
                        value={form.nivel}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3"
                    >

                        <option value="facil">
                            Fácil
                        </option>

                        <option value="medio">
                            Medio
                        </option>

                        <option value="dificil">
                            Difícil
                        </option>

                    </select>

                </div>

                {/* TIEMPO */}

                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        Tiempo límite (min)

                    </label>

                    <input
                        type="number"
                        name="tiempoLimite"
                        value={form.tiempoLimite}
                        onChange={handleChange}
                        min="1"
                        className="w-full border border-gray-300 rounded-xl p-3"
                    />

                </div>

            </div>

            {/* OPCIONES */}

            <div className="border border-gray-200 rounded-2xl p-5">

                <h3 className="font-semibold text-gray-700 mb-4">

                    Configuración adicional

                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="aleatorio"
                            checked={form.aleatorio}
                            onChange={handleChange}
                        />

                        Orden aleatorio

                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="mostrarRevision"
                            checked={form.mostrarRevision}
                            onChange={handleChange}
                        />

                        Mostrar revisión

                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="mostrarRespuestasCorrectas"
                            checked={form.mostrarRespuestasCorrectas}
                            onChange={handleChange}
                        />

                        Mostrar respuestas correctas

                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="permitirReintento"
                            checked={form.permitirReintento}
                            onChange={handleChange}
                        />

                        Permitir reintento

                    </label>

                </div>

            </div>

        </div>
    );
};

export default PasoConfiguracion;