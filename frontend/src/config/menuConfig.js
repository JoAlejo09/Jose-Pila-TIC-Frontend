import { Users, BarChart3, User, ClipboardCheck, BookOpen, School, LibraryBig, Lightbulb, TrendingUp } from "lucide-react";

const menuPorRol = {
  admin: [
    {
      label:"Usuarios",
      icon: Users,
      children:[
        {
          label:"Lista Usuarios",
          path:"/dashboard/admin/usuarios"
        }
      ]
    },
    {
      label:"Gestión Académica",
      icon: LibraryBig,
      children:[
        {
          label:"Materias",
          path:"/dashboard/admin/materias"
        },
        {
          label:"Temas",
          path:"/dashboard/admin/temas"
        },
        {
          label:"Recursos",
          path:"/dashboard/admin/recursos"
        },
        {
          label:"Evaluaciones",
          path:"/dashboard/admin/evaluaciones"
        }
      ]
    },
    {
      label:"Reportes",
      icon: BarChart3,
      children:[
        {
          label:"Ver Reportes",
          path:"/dashboard/admin/reportes"
        }
      ]
    }

  ],
  estudiante: [
    {
      label:"Mi Perfil",
      icon: User,
      path:"/mi-perfil"
    },
    {
      label:"Materias",
      icon: BookOpen,
      path:"/dashboard/estudiante/materias"
    },
    {
      label:"Evaluaciones",
      icon: ClipboardCheck,
      path:"/dashboard/estudiante/evaluaciones"
    },
    {
      label:"Mi Progreso",
      icon: TrendingUp,
      path:"/dashboard/estudiante/progreso"
    },
    {
      label:"Recomendaciones",
      icon: Lightbulb,
      path:"/dashboard/estudiante/recomendaciones"
    }
  ],
  tutor: [
    {
      label:"Mi Perfil",
      icon: User,
      path:"/mi-perfil"
    },
    {
      label:"Tutorías",
      icon: BookOpen,
      path:"/dashboard/tutorias"
    },
    {
      label:"Estudiantes",
      icon: School,
      path:"/dashboard/estudiantes"
    }
  ]
};
export default menuPorRol;