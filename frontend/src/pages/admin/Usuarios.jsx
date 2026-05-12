import { useEffect, useState } from "react";

import {
  getUsuariosRequest,
  desactivarUsuarioRequest,
  activarUsuarioRequest,
} from "../../services/userService";

import Input from "../../components/ui/Input";
import ModalCrearUsuario from "../../components/modal/CrearUsuario";

const Usuarios = () => {

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modoModal, setModoModal] = useState("crear");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const cargarUsuarios = async (searchWord = "", isInitial = false) => {
    try {

      if (isInitial) setLoading(true);

      const data = await getUsuariosRequest(searchWord);

      setUsuarios(Array.isArray(data) ? data : []);

    } catch (err) {

      console.error(err);
      setError("Error al cargar usuarios");

    } finally {

      if (isInitial) setLoading(false);

    }
  };

  // CARGA INICIAL
  useEffect(() => {
    cargarUsuarios("", true);
  }, []);

  // BUSQUEDA
  useEffect(() => {

    const time = setTimeout(() => {
      cargarUsuarios(search, false);
    }, 400);

    return () => clearTimeout(time);

  }, [search]);

  // DESACTIVAR
  const handleDesactivar = async (id) => {

    const confirmacion = window.confirm(
      "¿Estás seguro de desactivar este usuario?"
    );

    if (!confirmacion) return;

    try {

      await desactivarUsuarioRequest(id);

      setUsuarios((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, isActive: false }
            : user
        )
      );

    } catch (error) {

      console.error(error);

    }
  };

  // ACTIVAR
  const handleActivar = async (id) => {

    const confirmacion = window.confirm(
      "¿Estás seguro de activar este usuario?"
    );

    if (!confirmacion) return;

    try {

      await activarUsuarioRequest(id);

      setUsuarios((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, isActive: true }
            : user
        )
      );

    } catch (error) {

      console.error(error);

    }
  };

  // EDITAR
  const handleEditar = (usuario) => {

    setUsuarioSeleccionado(usuario);
    setModoModal("editar");
    setShowModal(true);

  };

  if (loading) {

    return (
      <p className="text-center mt-10">
        Cargando usuarios...
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

    <div>

      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-bold">
          Gestión de Usuarios
        </h1>

        <div className="flex gap-2">

          <Input
            type="text"
            placeholder="Buscar usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-64"
          />

          <button
            onClick={() => {
              setModoModal("crear");
              setUsuarioSeleccionado(null);
              setShowModal(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Nuevo
          </button>

        </div>

      </div>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">

          <tr>

            <th className="p-2">
              Nombre
            </th>

            <th>
              Email
            </th>

            <th>
              Rol
            </th>

            <th>
              Año Escolar
            </th>

            <th>
              Estado
            </th>

            <th>
              Acciones
            </th>

          </tr>

        </thead>

        <tbody>

          {usuarios.length > 0 ? (

            usuarios.map((user) => (

              <tr
                key={user._id}
                className="text-center border-t"
              >

                <td>
                  {user.nombre} {user.apellido}
                </td>

                <td>
                  {user.email}
                </td>

                <td className="capitalize">
                  {user.rol}
                </td>

                <td>

                  {user.rol === "estudiante"
                    ? user.nivelAcademico || "No asignado"
                    : "-"}

                </td>

                <td>

                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      user.isActive
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  >

                    {user.isActive
                      ? "Activo"
                      : "Inactivo"}

                  </span>

                </td>

                <td className="flex justify-center gap-2 p-2">

                  {user.isActive ? (

                    <button
                      onClick={() => handleDesactivar(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Desactivar
                    </button>

                  ) : (

                    <button
                      onClick={() => handleActivar(user._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Activar
                    </button>

                  )}

                  <button
                    onClick={() => handleEditar(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="6" className="text-center p-4">

                No hay usuarios disponibles

              </td>

            </tr>

          )}

        </tbody>

      </table>

      {showModal && (

        <ModalCrearUsuario
          onClose={() => setShowModal(false)}
          onUsuarioCreado={() => cargarUsuarios(search, false)}
          modo={modoModal}
          usuarioSeleccionado={usuarioSeleccionado}
        />

      )}

    </div>
  );
};

export default Usuarios;