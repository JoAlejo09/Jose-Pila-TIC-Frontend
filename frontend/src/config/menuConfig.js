import {Users, BarChart3, User, ClipboardCheck, GraduationCap, BookOpen, School }from "lucide-react";
const menuPorRol = {
  admin: [
    { label:"Usuarios",
      icon: Users,
      children:[
        {
          label:"Lista Usuarios",
          path:"/dashboard/admin/usuarios"
        },
        {
          label:"Crear Usuario",
          path:"/dashboard/admin/usuarios/crear"
        }
      ]
    },
    { label:"Reportes",
      icon: BarChart3,
      children:[
        {label:"Reportes",path:"/dashboard/admin/reportes"}
      ]
    }
  ],
  estudiante: [
    {label:"Mi Perfil",icon: User,path:"/mi-perfil"},
    {label:"Evaluación", icon: ClipboardCheck, path:"/dashboard/evaluacion"},
    {label:"Resultados", icon: GraduationCap,  path:"/dashboard/resultados"},
    {label:"Recomendaciones",  icon: BookOpen, path:"/dashboard/recomendaciones"}
  ],
  tutor: [
    {label:"Mi Perfil",  icon: User, path:"/mi-perfil"},
    {label:"Tutorías", icon: BookOpen, path:"/dashboard/tutorias"},
    {label:"Estudiantes",  icon: School, path:"/dashboard/estudiantes"}
  ]
};

export default menuPorRol;