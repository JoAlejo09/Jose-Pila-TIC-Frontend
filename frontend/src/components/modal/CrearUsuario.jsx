import { useState } from "react";
import { crearUsuarioRequest } from "../../services/userService";

const ModalCrearUsuario = ({ onClose, onUsuarioCreado }) => {

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "estudiante",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await crearUsuarioRequest(form);

      onUsuarioCreado();

      onClose();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <h2 className="text-xl font-bold mb-4">
          Crear Usuario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="estudiante">Estudiante</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex justify-end gap-2 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Crear
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalCrearUsuario;