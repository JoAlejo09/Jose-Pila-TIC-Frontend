import { useEffect, useState } from "react";

import { crearUsuarioRequest, actualizarUsuarioRequest } from "../../services/userService";

const ModalCrearUsuario = ({ onClose, onUsuarioCreado, modo = "crear", usuarioSeleccionado}) => {
  const [form, setForm] = useState({
    nombre:"",
    apellido:"",
    email:"",
    password:"",
    rol:"estudiante",
    nivelAcademico:""
  });
  const [error, setError] = useState("");

  // CARGAR DATOS EDITAR

  useEffect(()=>{
    if (modo === "editar" && usuarioSeleccionado){
      setForm({
        nombre: usuarioSeleccionado.nombre || "",
        apellido: usuarioSeleccionado.apellido || "",
        email: usuarioSeleccionado.email || "",
        password:"",
        rol: usuarioSeleccionado.rol || "estudiante",
        nivelAcademico: usuarioSeleccionado.nivelAcademico || ""
      });
    }
  }, [modo, usuarioSeleccionado]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    if(
      name === "rol" &&
      value !== "estudiante"
    ){
      setForm({
        ...form,
        rol:value,
        nivelAcademico:""
      });
      return;
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(
        form.rol === "estudiante" &&
        !form.nivelAcademico
      ){
        setError("Seleccione un año escolar para el estudiante");
        return;
      }
      if(modo === "crear"){
        await crearUsuarioRequest(form);
      }else{
        await actualizarUsuarioRequest(usuarioSeleccionado._id, form);
      }
      onUsuarioCreado();
      onClose();
    }catch(error){
      console.error(error);
    }
  };
 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {modo === "crear"
          ? "Crear Usuario"
          : "Editar Usuario"
        }
      </h2>
      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          autoComplete="given-name"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          autoComplete="family-name"
          value={form.apellido}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          name="password"
          placeholder={
            modo === "editar"
              ? "Nueva contraseña (opcional)"
              : "Contraseña"
          }
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="estudiante">Estudiante </option>
          <option value="tutor"> Tutor</option>
          <option value="admin"> Admin </option>
        </select>

        { form.rol === "estudiante" && (
            <select
              name="nivelAcademico"
              value={form.nivelAcademico}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value=""> Seleccione año escolar </option>
              <option value="1ro BGU"> Primero de Bachillerato </option>
              <option value="2do BGU"> Segundo de Bachillerato </option>
              <option value="3ro BGU"> Tercero de Bachillerato </option>
            </select>
          )
        }
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
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

export default ModalCrearUsuario;