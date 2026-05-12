import { useEffect, useState } from "react";

import {
    FileText,
    BookOpen,
    PlayCircle
} from "lucide-react";

import {
    useParams
} from "react-router-dom";

import {
    obtenerRecursosPorTemaRequest
} from "../../services/estudianteService.js";

const RecursosEstudiante = ()=>{

    const {temaId} = useParams();

    const [recursos,setRecursos] =
        useState([]);

    const [loading,setLoading] =
        useState(true);

    const [error,setError] =
        useState(null);

    // CARGAR RECURSOS
    const cargarRecursos = async()=>{

        try {

            setLoading(true);

            const data =
                await obtenerRecursosPorTemaRequest(
                    temaId
                );

            setRecursos(data);

        } catch (error) {

            console.log(error);

            setError(
                "Error al cargar recursos"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(()=>{

        cargarRecursos();

    },[temaId]);

    // CONVERTIR URL YOUTUBE
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

    if(loading){

        return(
            <p className="text-center mt-10">
                Cargando recursos...
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

    return(

        <div className="p-6">

            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold mb-2">
                    Recursos Académicos
                </h1>

                <p className="text-slate-500">
                    Explora los recursos educativos disponibles.
                </p>

            </div>

            {/* LISTA */}
            <div className="space-y-8">

                {recursos.map((recurso)=>(

                    <div
                        key={recurso._id}
                        className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        border
                        overflow-hidden
                        "
                    >

                        {/* HEADER CARD */}
                        <div className="
                        p-6
                        border-b
                        ">

                            <div className="
                            flex
                            items-center
                            gap-3
                            mb-3
                            ">

                                {/* ICONO */}
                                <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-slate-100
                                flex
                                items-center
                                justify-center
                                ">

                                    {recurso.tipo === "pdf" && (
                                        <FileText className="text-red-500"/>
                                    )}

                                    {recurso.tipo === "youtube" && (
                                        <PlayCircle className="text-red-600"/>
                                    )}

                                    {recurso.tipo === "teoria" && (
                                        <BookOpen className="text-blue-500"/>
                                    )}

                                </div>

                                {/* TITULO */}
                                <div>

                                    <h2 className="text-2xl font-bold">
                                        {recurso.titulo}
                                    </h2>

                                    <p className="text-slate-500 text-sm capitalize">
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
                                leading-relaxed
                                whitespace-pre-line
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
                                    height="700"
                                    className="
                                    rounded-xl
                                    border
                                    "
                                />

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default RecursosEstudiante;