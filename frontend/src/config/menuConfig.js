const menuPorRol={
  admin: [
    {label:"Usuarios",
      children:[
        {label: "Lista Usuarios", path:"/dashboard/admin/usuarios"},
        {label:"Crear Usuario", path:"/dashboard/admin/usuarios/crear"},
        {label:"Dar de Baja", path:"/dashboard/admin/usuarios/quitar/"}
      ]
    },{
      label:"Reportes",
      children:[
        {label:"Reportes", path:"/dashboard/admin/reportes"},
      ],
    },
  ],
estudiante: [
    { label: "Evaluación", path: "/dashboard/evaluacion" },
    { label: "Resultados", path: "/dashboard/resultados" },
    { label: "Recomendaciones", path: "/dashboard/recomendaciones" },
  ],
  tutor: [
    { label: "Tutorías", path: "/dashboard/tutorias" },
    { label: "Estudiantes", path: "/dashboard/estudiantes" },
  ],
}
export default menuPorRol