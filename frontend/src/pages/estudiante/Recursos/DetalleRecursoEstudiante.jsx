import { useEffect, useState } from "react";

import {
    FileText,
    BookOpen,
    PlayCircle,
    ArrowLeft
} from "lucide-react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    obtenerRecursoPorIdRequest
} from "../../../services/estudianteService.js";

const DetalleRecursoEstudiante = ()=>{

    const navigate = useNavigate();

    const { id } = useParams();

    const [recurso,setRecurso] = useState(null);

    const [loading,setLoading] = useState(true);

    const [error,setError] = useState(null);

    // CARGAR RECURSO
    const cargarRecurso = async()=>{

        try {

            setLoading(true);

            const data =
                await obtenerRecursoPorIdRequest(id);

            setRecurso(data);

        } catch (error) {

            console.log(error);

            setError(
                "Error al cargar recurso"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(()=>{

        cargarRecurso();

    },[id]);

    // YOUTUBE EMBED
    const obtenerYoutubeEmbed = (url)=>{

        try {

            const videoId =
                new URL(url)
                    .searchParams
                    .get("v");

            return `https://www.youtube.com/embed/${videoId}`;

        } catch {

            return "";

        }

    };

    // ICONOS
    const obtenerIcono = ()=>{

        if(recurso.tipo === "pdf"){
            return <FileText className="text-red-500"/>;
        }

        if(recurso.tipo === "youtube"){
            return <PlayCircle className="text-red-600"/>;
        }

        return <BookOpen className="text-blue-500"/>;

    };

    if(loading){

        return(
            <p className="text-center mt-10">
                Cargando recurso...
            </p>
        );

    }

    if(error){

        return(
            <p className="text-center mt-10 text-red-500">
                {error}
            </p>
        );

    }

    if(!recurso){

        return(
            <p className="text-center mt-10">
                Recurso no encontrado
            </p>
        );

    }

    return(

        <div className="p-6">

            {/* BOTON VOLVER */}
            <button
                onClick={()=> navigate(-1)}
                className="
                flex
                items-center
                gap-2
                text-slate-600
                hover:text-slate-900
                mb-6
                "
            >

                <ArrowLeft size={18}/>

                Volver

            </button>

            {/* CARD */}
            <div className="
            bg-white
            rounded-2xl
            shadow-md
            border
            overflow-hidden
            ">

                {/* HEADER */}
                <div className="
                p-6
                border-b
                ">

                    <div className="
                    flex
                    items-center
                    gap-4
                    mb-4
                    ">

                        {/* ICONO */}
                        <div className="
                        w-14
                        h-14
                        rounded-xl
                        bg-slate-100
                        flex
                        items-center
                        justify-center
                        ">
                            {obtenerIcono()}
                        </div>

                        {/* TITULO */}
                        <div>

                            <h1 className="
                            text-3xl
                            font-bold
                            ">
                                {recurso.titulo}
                            </h1>

                            <p className="
                            text-slate-500
                            capitalize
                            ">
                                {recurso.tipo}
                            </p>

                        </div>

                    </div>

                    {/* DESCRIPCION */}
                    <p className="text-slate-600">
                        {recurso.descripcion}
                    </p>

                </div>

                {/* CONTENIDO */}
                <div className="p-6">

                    {/* TEORIA */}
                    {recurso.tipo === "teoria" && (

                        <div className="
                        prose
                        max-w-none
                        text-slate-700
                        whitespace-pre-line
                        leading-relaxed
                        ">
                            {recurso.contenido}
                        </div>

                    )}

                    {/* YOUTUBE */}
                    {recurso.tipo === "youtube" && (

                        <div className="
                        aspect-video
                        w-full
                        overflow-hidden
                        rounded-xl
                        ">

                            <iframe
                                src={
                                    obtenerYoutubeEmbed(
                                        recurso.url
                                    )
                                }
                                title={recurso.titulo}
                                className="
                                w-full
                                h-full
                                "
                                allowFullScreen
                            />

                        </div>

                    )}

                    {/* PDF */}
                    {recurso.tipo === "pdf" && (

                        <iframe
                            src={recurso.url}
                            title={recurso.titulo}
                            width="100%"
                            height="800"
                            className="
                            rounded-xl
                            border
                            "
                        />

                    )}
                </div>
            </div>
        </div>
    );
};
export default DetalleRecursoEstudiante;