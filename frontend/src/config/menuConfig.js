import { Users, BarChart3, User, ClipboardCheck, GraduationCap, BookOpen, School, LibraryBig, 
//FolderKanban
} from "lucide-react";

const menuPorRol = {
  admin: [
    // USUARIOS
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
    // GESTIÓN ACADÉMICA
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
    // REPORTES
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
      label:"Evaluación",
      icon: ClipboardCheck,
      path:"/dashboard/evaluacion"
    },

    {
      label:"Resultados",
      icon: GraduationCap,
      path:"/dashboard/resultados"
    },

    {
      label:"Recomendaciones",
      icon: BookOpen,
      path:"/dashboard/recomendaciones"
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