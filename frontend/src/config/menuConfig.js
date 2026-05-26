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

    // ADMIN
    admin:[
        {
            label:"Usuarios",
            icon:Users,
            children:[
                {
                    label:"Usuarios Sistema",
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
                    label:"Unidades",
                    path:"/dashboard/admin/unidades"
                },
                {
                    label:"Temas",
                    path:"/dashboard/admin/temas"
                },
                {
                    label:"Recursos",
                    path:"/dashboard/admin/recursos"
                },

                //Para las evaluaciones
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

        {
            label:"Reportes",
            icon:BarChart3,
            children:[
                {
                    label:"Evaluaciones",
                    path:"/dashboard/admin/resultados"
                }
            ]
        },
        {
            label:"Tutorias",
            children:[
                {
                    label:"Lista Tutorias",
                    path:"/dashboard/admin/tutorias"
                }
            ]
        }
    ],

    // Menu Estudiante
    estudiante:[
        {
            label:"Mi Perfil",
            icon:User,
            path:"/mi-perfil"
        },

        //Visualizar las materias de estudiante
        {
            label:"Materias",
            icon:BookOpen,
            path:"/dashboard/estudiante/materias"
        },
        
        //Menu de evaluaciones
        {
            label:"Evaluaciones",
            icon:ClipboardCheck,
            path:"/dashboard/estudiante/cuestionarios"
        },

        // Resultado de las evaluaciones de Estudiante
        {
            label:"Mis Resultados",
            icon:FileText,
            path:"/dashboard/estudiante/resultados"
        },

        // Progreso del estudiante
        {
            label:"Mi Progreso",
            icon:TrendingUp,
            path:"/dashboard/estudiante/progreso"
        },

        // Recomendaciones para el estudiante
        {
            label:"Recomendaciones",
            icon:Lightbulb,
            path:"/dashboard/estudiante/recomendaciones"
        },
        //Para tutorias personalizadas
        {
            label:"Tutorias",
            icon:BarChart3,
            children:
            [
                {
                    label:"Mis tutorias",
                    path:"/dashboard/estudiante/mis-tutorias"
                }

            ]
        }

    ],

    // TUTOR
    tutor:[
        {
            label:"Mi Perfil",
            icon:User,
            path:"/mi-perfil"
        },
        {
            label:"Solicitudes Tutorias",
            icon:GraduationCap,
            path:"/dashboard/tutor/solicitudes"
        },
        {
            label:"Mis Tutorias",
            icon:School,
            path:"/dashboard/tutor/mis-tutorias"
        }

    ]

};

export default menuPorRol;