import {
    Users,
    BarChart3,
    User,
    ClipboardCheck,
    BookOpen,
    School,
    LibraryBig,
    Lightbulb,
    TrendingUp,
    FileText,
    GraduationCap
} from "lucide-react";

const menuPorRol = {

    // =========================================
    // ADMIN
    // =========================================

    admin:[

        {
            label:"Usuarios",
            icon:Users,

            children:[
                {
                    label:"Lista Usuarios",
                    path:"/dashboard/admin/usuarios"
                }
            ]
        },

        {
            label:"Gestión Académica",
            icon:LibraryBig,

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



                // =========================================
                // SUBMENU EVALUACIONES
                // =========================================

                {
                    label:"Evaluaciones",

                    children:[

                        {
                            label:"Preguntas",
                            path:"/dashboard/admin/preguntas"
                        },

                        {
                            label:"Cuestionarios",
                            path:"/dashboard/admin/cuestionarios"
                        }

                    ]
                }

            ]
        },



        // =========================================
        // REPORTES
        // =========================================

        {
            label:"Reportes",
            icon:BarChart3,

            children:[
                {
                    label:"Ver Reportes",
                    path:"/dashboard/admin/reportes"
                }
            ]
        }

    ],



    // =========================================
    // ESTUDIANTE
    // =========================================

    estudiante:[

        {
            label:"Mi Perfil",
            icon:User,
            path:"/mi-perfil"
        },



        // =========================================
        // MATERIAS
        // =========================================

        {
            label:"Materias",
            icon:BookOpen,
            path:"/dashboard/estudiante/materias"
        },



        // =========================================
        // CUESTIONARIOS
        // =========================================

        {
            label:"Cuestionarios",
            icon:ClipboardCheck,
            path:"/dashboard/estudiante/cuestionarios"
        },



        // =========================================
        // RESULTADOS
        // =========================================

        {
            label:"Mis Resultados",
            icon:FileText,
            path:"/dashboard/estudiante/resultados"
        },



        // =========================================
        // PROGRESO
        // =========================================

        {
            label:"Mi Progreso",
            icon:TrendingUp,
            path:"/dashboard/estudiante/progreso"
        },



        // =========================================
        // RECOMENDACIONES
        // =========================================

        {
            label:"Recomendaciones",
            icon:Lightbulb,
            path:"/dashboard/estudiante/recomendaciones"
        }

    ],



    // =========================================
    // TUTOR
    // =========================================

    tutor:[

        {
            label:"Mi Perfil",
            icon:User,
            path:"/mi-perfil"
        },

        {
            label:"Tutorías",
            icon:GraduationCap,
            path:"/dashboard/tutorias"
        },

        {
            label:"Estudiantes",
            icon:School,
            path:"/dashboard/estudiantes"
        }

    ]

};

export default menuPorRol;