import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios.js";

const VerificarCuenta = () =>{
    const {token} = useParams();
    const navigate = useNavigate();

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const ejecutado = useRef(false);

    useEffect(()=>{
        if(ejecutado.current) return;
        ejecutado.current = true;

        let timer;

        const verificarCuenta = async() =>{
            try{
                const res = await axios.get(`/auth/confirmar/${token}`);
                setMensaje(res.data.msg);
                timer = setTimeout(() => {
                    navigate("/login");
                },3000);
            }catch(err){
                const msg = err.response?.data?.msg;
                if(msg?.toLowerCase().includes("confirmada")){
                    setMensaje("Tu cuenta ya fue confirmada anteriormente");
                    timer = setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }else{
                    setError(msg||"Error al verificar cuenta");
                }
            }
        };
        verificarCuenta();
        return () => {
            if (timer){
                clearTimeout(timer);
            }
        };
    }, [token, navigate]);
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          Confirmación de cuenta
        </h2>

        {mensaje && (
          <p className="text-green-600 mb-3">{mensaje}</p>
        )}

        {error && (
          <p className="text-red-500 mb-3">{error}</p>
        )}

        {mensaje && (
            <p className="text-sm text-gray-500">
              Serás redirigido al login...
            </p>
        )}
        {error &&(
            <div className="mt-4">
                <button 
                onClick={() => navigate("/login")}
                className ="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                    Volver al Inicio de Sesión
                </button>
            </div>
        )}
      </div>

    </div>
    );
}
export default VerificarCuenta;