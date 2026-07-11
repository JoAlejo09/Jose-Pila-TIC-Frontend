import { useEffect, useState } from "react";
import {
  crearRecursoRequest,
  actualizarRecursoRequest,
} from "../../services/recursoService.js";
import { obtenerTemasPorUnidadRequest } from "../../services/temaService.js";
import { obtenerMateriasRequest } from "../../services/materiaService.js";
import { obtenerUnidadesPorMateriaRequest } from "../../services/unidadService.js";
import EditorTeoria from "../editor/editorTeoria.jsx";

const ModalRecurso = ({
  onClose,
  onRecursoCreado,
  modo = "crear",
  recursoSeleccionado,
}) => {
  const [temas, setTemas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [unidades, setUnidades] = useState([]);

  const [form, setForm] = useState({
    nivelAcademico: "",
    materia: "",
    unidad: "",
    tema: "",
    titulo: "",
    descripcion: "",
    tipo: "pdf",
    url: "",
    modoImagen: "url",
    imagen: null,
    contenido: "",
    nivelDificultad: "basico",
  });
  //Obtener Materias
  useEffect(() => {
    const obtenerMaterias = async () => {
      if (!form.nivelAcademico) {
        setMaterias([]);
        return;
      }

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

  //Cargar Unidades
  useEffect(() => {
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

  // CARGAR TEMAS
  useEffect(() => {
    const obtenerTemas = async () => {
      if (!form.unidad) {
        setTemas([]);
        return;
      }

      try {
        const data = await obtenerTemasPorUnidadRequest(form.unidad, {
          estado: true,
        });

        setTemas(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerTemas();
  }, [form.unidad]);

  useEffect(() => {
    if (modo === "editar" && recursoSeleccionado) {
      setForm({
        nivelAcademico: recursoSeleccionado.tema?.unidad?.nivelAcademico || "",
        materia: recursoSeleccionado.tema?.unidad?.materia?._id || "",
        unidad: recursoSeleccionado.tema?.unidad?._id || "",
        tema: recursoSeleccionado.tema?._id || "",
        titulo: recursoSeleccionado.titulo || "",
        descripcion: recursoSeleccionado.descripcion || "",
        tipo: recursoSeleccionado.tipo || "pdf",
        url: recursoSeleccionado.url || "",
        contenido: recursoSeleccionado.contenido || "",
        nivelDificultad: recursoSeleccionado.nivelDificultad || "basico",
      });
    }
  }, [modo, recursoSeleccionado]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setForm((prev) => ({
        ...prev,
        imagen: files[0],
        modoImagen: "cloudinary",
      }));
      return;
    }
    if (name === "url") {
      setForm((prev) => ({
        ...prev,
        url: value,
        ...(form.tipo === "imagen" && {
          imagen: null,
          modoImagen: "url",
        }),
      }));
    }
    if (name === "tipo") {
      setForm((prev) => ({
        ...prev,
        tipo: value,
        url: "",
        contenido: "",
        modoImagen: "url",
        imagen: null,
      }));
      return;
    }

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

  const validarFormulario = () => {
    if (!form.tema.trim() || !form.titulo.trim() || !form.tipo) {
      return "Campos obligatorios";
    }

    if ((form.tipo === "pdf" || form.tipo === "youtube") && !form.url.trim()) {
      return "La URL es obligatoria";
    }
    if (form.tipo === "teoria" && !form.contenido.trim()) {
      return "El contenido es obligatorio";
    }
    if (form.tipo === "imagen") {
      if (form.modoImagen === "url" && !form.url.trim()) {
        return "Debe ingresar la URL de la imagen";
      }
      if (form.modoImagen === "cloudinary" && !form.imagen) {
        return "Debe seleccionar una imagen";
      }
    }
    return null;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errorValidacion = validarFormulario();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }
    try {
      setLoading(true);
      if (form.tipo === "imagen") {
        const formData = new FormData();
        formData.append("tema", form.tema);
        formData.append("titulo", form.titulo.trim());
        formData.append("descripcion", form.descripcion.trim());
        formData.append("tipo", form.tipo);
        formData.append("nivelDificultad", form.nivelDificultad);
        formData.append("modoImagen", form.modoImagen);
        if (form.modoImagen === "url") {
          formData.append("url", form.url.trim());
        } else {
          formData.append("imagen", form.imagen);
        }
        if (modo === "crear") {
          await crearRecursoRequest(formData);
        } else {
          await actualizarRecursoRequest(recursoSeleccionado._id, formData);
        }
      } else {
        const payload = {
          ...form,
          titulo: form.titulo.trim(),
          descripcion: form.descripcion.trim(),
          url: form.url.trim(),
          contenido: form.contenido.trim(),
        };
        if (form.tipo === "teoria") {
          payload.url = "";
        } else {
          payload.contenido = "";
        }
        if (modo === "crear") {
          await crearRecursoRequest(payload);
        } else {
          await actualizarRecursoRequest(recursoSeleccionado._id, payload);
        }
      }
      onRecursoCreado();
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.msg || "Error al guardar recurso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className=" fixed inset-0 z-50 flex items-center
                        justify-center bg-black/50 px-4 "
    >
      <div
        className=" bg-white w-full max-w-2xl rounded-2xl 
                        shadow-xl p-6 max-h-[90vh] overflow-y-auto
            "
      >
        <h2 className=" text-2xl font-bold mb-6 text-center ">
          {modo === "crear" ? "Crear Recurso" : "Editar Recurso"}
        </h2>

        {error && (
          <div className=" bg-red-100 text-red-700 p-3 rounded-lg mb-5 text-sm ">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-sm">Nivel académico</label>

              <select
                name="nivelAcademico"
                value={form.nivelAcademico}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-1"
              >
                <option value="">Seleccione</option>
                <option value="1ro BGU">1ro BGU</option>
                <option value="2do BGU">2do BGU</option>
                <option value="3ro BGU">3ro BGU</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-sm">Materia</label>

              <select
                name="materia"
                value={form.materia}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-1"
              >
                <option value="">Seleccione una materia</option>

                {materias.map((materia) => (
                  <option key={materia._id} value={materia._id}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">Unidad</label>

            <select
              name="unidad"
              value={form.unidad}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
            >
              <option value="">Seleccione una unidad</option>

              {unidades.map((unidad) => (
                <option key={unidad._id} value={unidad._id}>
                  {unidad.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-medium text-sm">Tema</label>

            <select
              name="tema"
              value={form.tema}
              onChange={handleChange}
              className=" w-full border border-gray-300 p-3
                                rounded-xl mt-1 focus:ring-2 focus:ring-green-500 outline-none "
            >
              <option value="">Seleccione un tema</option>

              {temas.map((tema) => (
                <option key={tema._id} value={tema._id}>
                  {tema.nombre}
                  {" - "}
                  {tema.nivelAcademico}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium text-sm">Título</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Título del recurso"
              className=" w-full border border-gray-300 p-3 rounded-xl
                                mt-1 focus:ring-2 focus:ring-green-500 outline-none "
            />
          </div>

          <div>
            <label className="font-medium text-sm">Descripción</label>

            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripción breve..."
              rows="3"
              className=" w-full border border-gray-300 
                                        p-3 rounded-xl mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-sm">Tipo de recurso</label>

            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3
                                       rounded-xl mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="imagen">Imagen</option>
              <option value="pdf"> PDF </option>
              <option value="youtube"> YouTube </option>
              <option value="teoria"> Teoría </option>
            </select>
          </div>

          {(form.tipo === "pdf" || form.tipo === "youtube") && (
            <div>
              <label className="font-medium text-sm">URL</label>
              <input
                type="text"
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder={
                  form.tipo === "pdf"
                    ? "https://..."
                    : "https://youtube.com/..."
                }
                className="w-full border border-gray-300 p-3 rounded-xl
                                           mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          )}

          {form.tipo === "teoria" && (
            <div>
              <label className="font-medium text-sm">Contenido Teórico</label>

              <EditorTeoria
                value={form.contenido}
                onChange={(contenido) => {
                  setForm((prev) => ({
                    ...prev,
                    contenido,
                  }));
                }}
              />
            </div>
          )}
          {form.tipo === "imagen" && (
            <div className="space-y-5">
              <div>
                <label className="font-medium text-sm">
                  URL de la imagen (opcional)
                </label>
                <input
                  type="text"
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  placeholder="https://....."
                  className="w-full border border-gray-300 p-3 rounded-xl mt-1
                                               focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm text-gray-500">o</span>
              </div>
              <div>
                <label className="font-medium text-sm">Subir imagen</label>
                <input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-xl mt-1"
                />
              </div>
              {form.imagen && (
                <p className="text-sm text-green-600">
                  Imagen seleccionada: {form.imagen.name}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="font-medium text-sm">Nivel de dificultad</label>

            <select
              name="nivelDificultad"
              value={form.nivelDificultad}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-green-500 outline-none "
            >
              <option value="basico"> Básico </option>
              <option value="intermedio"> Intermedio </option>
              <option value="avanzado"> Avanzado </option>
            </select>
          </div>

          <div className=" flexjustify-end gap-3 pt-3 ">
            <button
              type="button"
              onClick={onClose}
              className=" bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-xl "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className=" bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl disabled:opacity-50"
            >
              {loading
                ? "Guardando..."
                : modo === "crear"
                  ? "Crear"
                  : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRecurso;
