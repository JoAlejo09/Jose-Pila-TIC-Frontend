import { useEffect, useMemo, useState } from "react";

import { obtenerMisTutoriasRequest, cancelarTutoriaRequest, } from "../../../services/tutoriaService.js";

import TutoriaModal from "../../../components/modal/TutoriaModal.jsx";
import CalificacionTutoriaModal from "../../../components/modal/CalificacionTutoriaModal.jsx";

const MisTutorias = () => {
  const [tutorias, setTutorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const [openModal, setOpenModal] = useState(false);
  const [modoModal, setModoModal] = useState("crear");
  const [tutoriaEditar, setTutoriaEditar] = useState(null);
  const [openCalificacion, setOpenCalificacion] = useState(false);
  const [tutoriaCalificar, setTutoriaCalificar] = useState(null);

  // CARGAR TUTORIAS
  const cargarTutorias = async () => {
    try {
      setLoading(true);

      const data = await obtenerMisTutoriasRequest();

      setTutorias(data);
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.msg || "Error al cargar tutorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTutorias();
  }, []);

  // ABRIR MODAL CREAR
  const abrirCrear = () => {
    setModoModal("crear");

    setTutoriaEditar(null);

    setOpenModal(true);
  };

  // ABRIR MODAL EDITAR
  const abrirEditar = (tutoria) => {
    setModoModal("editar");

    setTutoriaEditar(tutoria);

    setOpenModal(true);
  };

  // CERRAR MODAL
  const cerrarModal = () => {
    setOpenModal(false);

    setTutoriaEditar(null);
  };

  // ABRIR CALIFICACION
  const abrirCalificacion = (tutoria) => {
    setTutoriaCalificar(tutoria);

    setOpenCalificacion(true);
  };

  // CERRAR CALIFICACION
  const cerrarCalificacion = () => {
    setTutoriaCalificar(null);

    setOpenCalificacion(false);
  };

  // CANCELAR TUTORIA
  const cancelarTutoria = async (id) => {
    const confirmar = window.confirm("¿Desea cancelar la tutoría?");

    if (!confirmar) return;

    try {
      await cancelarTutoriaRequest(id);

      cargarTutorias();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.msg || "Error al cancelar tutoría");
    }
  };

  // FILTROS
  const tutoriasFiltradas = useMemo(() => {
    if (filtro === "todas") {
      return tutorias;
    }

    return tutorias.filter((t) => t.estado === filtro);
  }, [tutorias, filtro]);

  if (loading) {
    return <p className="text-center mt-10">Cargando tutorías...</p>;
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mis Tutorías</h1>

          <p className="text-gray-500 mt-1">
            Gestione sus solicitudes de tutoría
          </p>
        </div>

        <div className="flex gap-3">
          {/* FILTRO */}
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="todas">Todas</option>

            <option value="pendiente">Pendientes</option>

            <option value="aceptada">Aceptadas</option>

            <option value="realizada">Realizadas</option>

            <option value="cancelada">Canceladas</option>
          </select>

          {/* NUEVA TUTORIA */}
          <button
            onClick={abrirCrear}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Nueva Tutoría
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      {/* LISTADO */}
      {tutoriasFiltradas.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-10 text-center text-gray-500">
          No existen tutorías registradas.
        </div>
      ) : (
        <div className="grid gap-5">
          {tutoriasFiltradas.map((tutoria) => (
            <div
              key={tutoria._id}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              {/* HEADER CARD */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{tutoria.materia}</h2>

                  <p className="text-gray-600">{tutoria.tema}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold capitalize text-white
                                            ${
                                              tutoria.estado === "pendiente"
                                                ? "bg-yellow-500"
                                                : tutoria.estado === "aceptada"
                                                  ? "bg-blue-600"
                                                  : tutoria.estado ===
                                                      "realizada"
                                                    ? "bg-green-600"
                                                    : "bg-red-600"
                                            }`}
                >
                  {tutoria.estado}
                </span>
              </div>

              {/* INFO */}
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Modalidad:</strong> {tutoria.modalidad}
                </p>

                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(tutoria.fecha).toLocaleString()}
                </p>

                <p>
                  <strong>Duración:</strong> {tutoria.duracion} hora(s)
                </p>

                {tutoria.descripcion && (
                  <p>
                    <strong>Descripción:</strong> {tutoria.descripcion}
                  </p>
                )}

                {tutoria.tutor && (
                  <p>
                    <strong>Tutor:</strong> {tutoria.tutor.nombre}{" "}
                    {tutoria.tutor.apellido}
                  </p>
                )}

                {tutoria.observacionTutor && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                    <p className="font-semibold">Observación del Tutor:</p>

                    <p className="text-gray-700">{tutoria.observacionTutor}</p>
                  </div>
                )}

                {tutoria.calificacion && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                    <p>
                      <strong>Calificación:</strong> ⭐ {tutoria.calificacion}/5
                    </p>

                    {tutoria.comentarioCalificacion && (
                      <p className="text-gray-600 mt-1">
                        {tutoria.comentarioCalificacion}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* ACCIONES */}
              <div className="mt-5 flex flex-wrap gap-3">
                {(tutoria.estado === "pendiente" ||
                  tutoria.estado === "aceptada") && (
                  <button
                    onClick={() => cancelarTutoria(tutoria._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Cancelar Tutoría
                  </button>
                )}

                {tutoria.estado === "pendiente" && (
                  <button
                    onClick={() => abrirEditar(tutoria)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Editar
                  </button>
                )}

                {tutoria.estado === "realizada" && !tutoria.calificacion && (
                  <button
                    onClick={() => abrirCalificacion(tutoria)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Calificar Tutoría
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL CREAR / EDITAR */}
      {openModal && (
        <TutoriaModal
          onClose={cerrarModal}
          recargarTutorias={cargarTutorias}
          modo={modoModal}
          tutoria={tutoriaEditar}
        />
      )}

      {/* MODAL CALIFICACION */}
      {openCalificacion && (
        <CalificacionTutoriaModal
          tutoria={tutoriaCalificar}
          onClose={cerrarCalificacion}
          recargarTutorias={cargarTutorias}
        />
      )}
    </div>
  );
};

export default MisTutorias;
