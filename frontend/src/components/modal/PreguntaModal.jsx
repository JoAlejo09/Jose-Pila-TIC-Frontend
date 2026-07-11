import { useEffect, useState, useRef } from "react";
import {
  crearPreguntaRequest,
  actualizarPreguntaRequest,
} from "../../services/preguntaService.js";
import { obtenerMateriasRequest } from "../../services/materiaService.js";
import { obtenerUnidadesPorMateriaRequest } from "../../services/unidadService.js";
import { obtenerTemasPorUnidadRequest } from "../../services/temaService.js";

const PreguntaModal = ({
  onClose,
  recargarPreguntas,
  preguntaEditar = null,
}) => {
  const [materias, setMaterias] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    enunciado: "",
    nivelAcademico: "1ro BGU",
    tipoPregunta: "opcion_multiple",
    opciones: ["", "", "", ""],
    respuestaCorrecta: "",
    explicacion: "",
    nivelDificultad: "facil",
    materia: "",
    unidad: "",
    tema: "",
    recursoApoyo: {
      tipo: "",
      url: "",
      contenido: "",
    },
  });
  // EDITAR UNA PREGUNTA EXISTENTE
  useEffect(() => {
    if (!preguntaEditar) return;

    if (preguntaEditar) {
      setForm({
        enunciado: preguntaEditar.enunciado || "",
        nivelAcademico: preguntaEditar.nivelAcademico || "1ro BGU",
        tipoPregunta: preguntaEditar.tipoPregunta || "opcion_multiple",
        opciones:
          preguntaEditar.opciones?.length > 0
            ? preguntaEditar.opciones.map((opcion) =>
                typeof opcion === "string" ? opcion : opcion.texto,
              )
            : ["", "", "", ""],
        respuestaCorrecta: preguntaEditar.respuestaCorrecta || "",
        explicacion: preguntaEditar.explicacion || "",

        nivelDificultad: preguntaEditar.nivelDificultad || "facil",
        materia: preguntaEditar.materia?._id || "",
        unidad: preguntaEditar.tema?.unidad?._id || "",
        tema: preguntaEditar.tema?._id || "",
        recursoApoyo: preguntaEditar.recursoApoyo || {
          tipo: "",
          url: "",
          contenido: "",
        },
      });
    }
  }, [preguntaEditar]);

  //Para actualizar los distintas opciones al editar
  useEffect(() => {
    if (!preguntaEditar) return;
    const cargarDatos = async () => {
      try {
        const unidadesData = await obtenerUnidadesPorMateriaRequest(
          preguntaEditar.materia._id,
          {
            estado: true,
            nivelAcademico: preguntaEditar.nivelAcademico,
          },
        );
        setUnidades(unidadesData);
        const temasData = await obtenerTemasPorUnidadRequest(
          preguntaEditar.tema.unidad._id,
          {
            estado: true,
            nivelAcademico: preguntaEditar.nivelAcademico,
          },
        );
        setTemas(temasData);
      } catch (error) {
        console.log(error);
      }
    };
    cargarDatos();
  }, [preguntaEditar]);

  // OBTENER MATERIAS
  useEffect(() => {
    if (preguntaEditar) return;
    const obtenerMaterias = async () => {
      try {
        const data = await obtenerMateriasRequest({
          nivelAcademico: form.nivelAcademico,
          estado: true,
        });
        setMaterias(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMaterias();
  }, [form.nivelAcademico]);

  // OBTENER UNIDADES
  useEffect(() => {
    if (preguntaEditar) return;
    const obtenerUnidades = async () => {
      if (!form.materia) {
        setUnidades([]);
        return;
      }

      try {
        const data = await obtenerUnidadesPorMateriaRequest(form.materia, {
          estado: true,
          nivelAcademico: form.nivelAcademico,
        });
        setUnidades(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerUnidades();
  }, [form.materia, form.nivelAcademico]);

  // OBTENER TEMAS
  useEffect(() => {
    if (preguntaEditar) return;
    const obtenerTemas = async () => {
      if (!form.unidad) {
        setTemas([]);
        return;
      }
      try {
        const data = await obtenerTemasPorUnidadRequest(form.unidad, {
          estado: true,
          nivelAcademico: form.nivelAcademico,
        });
        setTemas(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerTemas();
  }, [form.unidad, form.nivelAcademico]);

  const textAreaEnunciadoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "nivelAcademico" && {
        materia: "",
        unidad: "",
        tema: "",
      }),
      ...(name === "materia" && {
        unidad: "",
        tema: "",
      }),

      ...(name === "unidad" && {
        tema: "",
      }),
    }));
  };

  const handleOpcionChange = (index, valor) => {
    const nuevasOpciones = [...form.opciones];
    nuevasOpciones[index] = valor;
    setForm({
      ...form,
      opciones: nuevasOpciones,
    });
  };

  const handleRecursoChange = (e) => {
    setForm({
      ...form,
      recursoApoyo: {
        ...form.recursoApoyo,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Para insertar formulas matemáticas con Latex
  const insertarLatex = (codigo) => {
    const textarea = textAreaEnunciadoRef.current;

    if (!textarea) return;

    const inicio = textarea.selectionStart;
    const fin = textarea.selectionEnd;

    const textoAnterior = form.enunciado.substring(0, inicio);
    const textoSeleccionado = form.enunciado.substring(inicio, fin);
    const textoPosterior = form.enunciado.substring(fin);

    const nuevoCodigo = codigo.replace("{}", `{${textoSeleccionado}}`);

    const nuevoTexto = textoAnterior + nuevoCodigo + textoPosterior;

    setForm((prev) => ({
      ...prev,
      enunciado: nuevoTexto,
    }));

    setTimeout(() => {
      textarea.focus();
    }, 0);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        opciones:
          form.tipoPregunta === "respuesta_corta"
            ? []
            : form.opciones
                .filter((opcion) => opcion.trim() !== "")
                .map((texto) => ({ texto })),
      };

      if (preguntaEditar) {
        await actualizarPreguntaRequest(preguntaEditar._id, payload);
      } else {
        await crearPreguntaRequest(payload);
      }
      await recargarPreguntas();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4        ">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">
        <div className=" flex justify-between items-center border-b border-gray-200 p-6 ">
          <h2
            className=" text-2xl font-bold text-gray-800
                    "
          >
            {preguntaEditar ? "Editar Pregunta" : "Nueva Pregunta"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl "
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block mb-2 font-medium">Enunciado</label>
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                type="button"
                onClick={() => insertarLatex("$x^{}$")}
                className="px-3 py-2 border rounded-lg hover:bg-gray-100"
              >
                x²
              </button>
              <button
                type="button"
                onClick={() => insertarLatex("$x_{}$")}
                className="px-3 py-2 border rounded-lg hover:bg-gray-100"
              >
                xₙ
              </button>
              <button
                type="button"
                onClick={() => insertarLatex("$\\sqrt{}$")}
                className="px-3 py-2 border rounded-lg hover:bg-gray-100"
              >
                √
              </button>
              <button
                type="button"
                onClick={() => insertarLatex("$\\frac{}{}$")}
                className="px-3 py-2 border rounded-lg hover:bg-gray-100"
              >
                a/b
              </button>
              <button
                type="button"
                onClick={() => insertarLatex("$\\pi$")}
                className="px-3 py-2 border rounded-lg hover:bg-gray-100"
              >
                π
              </button>
              <button
                type="button"
                onClick={() => insertarLatex("$\\rho$")}
                className="px-3 py-2 border rounded-lg hover:bg-gray-100"
              >
                ρ
              </button>
              <button
                type="button"
                onClick={() => insertarLatex("$\\rightarrow$")}
                className="px-3 py-2 border rounded-lg hover:bg-gray-100"
              >
                →
              </button>
            </div>
            <textarea
              name="enunciado"
              ref={textAreaEnunciadoRef}
              value={form.enunciado}
              onChange={handleChange}
              required
              className=" w-full border border-gray-300
                                        rounded-xl p-4 min-h-[120px] "
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Nivel académico</label>

              <select
                name="nivelAcademico"
                value={form.nivelAcademico}
                onChange={handleChange}
                className=" w-full border border-gray-300 rounded-xl p-3"
              >
                <option value="1ro BGU"> 1ro BGU </option>
                <option value="2do BGU"> 2do BGU </option>
                <option value="3ro BGU"> 3ro BGU </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Dificultad</label>
              <select
                name="nivelDificultad"
                value={form.nivelDificultad}
                onChange={handleChange}
                className=" w-full border border-gray-300 rounded-xl p-3
                                "
              >
                <option value="facil"> Fácil </option>
                <option value="medio"> Medio </option>
                <option value="dificil"> Difícil </option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-medium">Materia</label>

              <select
                name="materia"
                value={form.materia}
                onChange={handleChange}
                required
                className=" w-full border border-gray-300 |rounded-xl p-3 "
              >
                <option value=""> Seleccione una materia </option>

                {materias.map((materia) => (
                  <option key={materia._id} value={materia._id}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Unidad</label>

              <select
                name="unidad"
                value={form.unidad}
                onChange={handleChange}
                required
                className=" w-full border border-gray-300 rounded-xl p-3"
              >
                <option value=""> Seleccione una unidad </option>

                {unidades.map((unidad) => (
                  <option key={unidad._id} value={unidad._id}>
                    {unidad.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Tema</label>

              <select
                name="tema"
                value={form.tema}
                onChange={handleChange}
                required
                className=" w-full border border-gray-300 rounded-xl p-3"
              >
                <option value="">Seleccione un tema</option>
                {temas.map((tema) => (
                  <option key={tema._id} value={tema._id}>
                    {tema.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Tipo de pregunta</label>

            <select
              name="tipoPregunta"
              value={form.tipoPregunta}
              onChange={handleChange}
              className=" w-full border border-gray-300 rounded-xl p-3 "
            >
              <option value="opcion_multiple"> Opción múltiple </option>
              <option value="verdadero_falso"> Verdadero/Falso </option>
              <option value="respuesta_corta"> Respuesta corta </option>
            </select>
          </div>
          {form.tipoPregunta === "opcion_multiple" && (
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-lg mb-4">Opciones</h3>
                <div className="space-y-3">
                  {form.opciones.map((opcion, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Opción ${index + 1}`}
                      value={opcion}
                      onChange={(e) =>
                        handleOpcionChange(index, e.target.value)
                      }
                      className=" w-full border border-gray-300 rounded-xl p-3"
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Respuesta correcta
                </label>
                <select
                  name="respuestaCorrecta"
                  value={form.respuestaCorrecta}
                  onChange={handleChange}
                  required
                  className=" w-full border border-gray-300 rounded-xl p-3"
                >
                  <option value=""> Seleccione la respuesta correcta </option>
                  {form.opciones.map(
                    (opcion, index) =>
                      opcion.trim() !== "" && (
                        <option key={index} value={opcion}>
                          {opcion}
                        </option>
                      ),
                  )}
                </select>
              </div>
            </div>
          )}
          {form.tipoPregunta === "verdadero_falso" && (
            <div className="space-y-5">
              <div
                className="
            bg-gray-50 border border-gray-200
            rounded-2xl p-5
        "
              >
                <h3 className="font-semibold text-lg mb-4">
                  Respuesta correcta
                </h3>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="respuestaCorrecta"
                      value="Verdadero"
                      checked={form.respuestaCorrecta === "Verdadero"}
                      onChange={handleChange}
                    />
                    Verdadero
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="respuestaCorrecta"
                      value="Falso"
                      checked={form.respuestaCorrecta === "Falso"}
                      onChange={handleChange}
                    />
                    Falso
                  </label>
                </div>
              </div>
            </div>
          )}

          {form.tipoPregunta === "respuesta_corta" && (
            <div>
              <label className="block mb-2 font-medium">
                Respuesta correcta
              </label>

              <input
                type="text"
                name="respuestaCorrecta"
                placeholder="Ingrese la respuesta esperada"
                value={form.respuestaCorrecta}
                onChange={handleChange}
                required
                className="
                w-full border border-gray-300
                rounded-xl p-3
            "
              />
            </div>
          )}
          {/* EXPLICACION */}
          <div>
            <label className="block mb-2 font-medium">Explicación</label>

            <textarea
              name="explicacion"
              value={form.explicacion}
              onChange={handleChange}
              className=" w-full border border-gray-300 rounded-xl p-4 min-h-[100px] "
            />
          </div>

          <div
            className=" border border-gray-200 rounded-2xl p-5 space-y-4
                    "
          >
            <h3 className="font-semibold text-lg">Recurso de apoyo</h3>

            <select
              name="tipo"
              value={form.recursoApoyo.tipo}
              onChange={handleRecursoChange}
              className=" w-full border border-gray-300 rounded-xl p-3
                            "
            >
              <option value=""> Sin recurso </option>
              <option value="video"> Video </option>
              <option value="documento"> Documento </option>
              <option value="texto"> Texto </option>
            </select>

            <input
              type="text"
              name="url"
              placeholder="URL recurso"
              value={form.recursoApoyo.url}
              onChange={handleRecursoChange}
              className=" w-full border border-gray-300 rounded-xl p-3 "
            />

            <textarea
              name="contenido"
              placeholder="Contenido adicional"
              value={form.recursoApoyo.contenido}
              onChange={handleRecursoChange}
              className="w-full border border-gray-300 rounded-xl p-4 min-h-[100px]"
            />
          </div>

          <div className=" flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium "
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
            >
              {loading
                ? "Guardando..."
                : preguntaEditar
                  ? "Actualizar Pregunta"
                  : "Guardar Pregunta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreguntaModal;
