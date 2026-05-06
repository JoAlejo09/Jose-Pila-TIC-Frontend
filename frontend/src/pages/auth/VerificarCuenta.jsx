import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:4000/api";
const VerificarCuenta = () =>{
    const {token} = useParams();
    const navigate = useNavigate();

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const ejecutado = useRef(false);

    useEffect(()=>{
        if(ejecutado.current) return;
        ejecutado.current = true;

        const verificarCuenta = async() =>{
            try{
                const res = await axios.get(`${API}/auth/confirmar/${token}`);
                setMensaje(res.data.msg);
                setTimeout(() => {
                    navigate("/login");
                },3000);
            }catch(err){
                const msg = err.response?.data?.msg;
                if(msg?.toLowerCase().includes("confirmada")){
                    setMensaje("Tu cuenta ya fue confirmada anteriormente");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }else{
                    setError(msg||"Error al verificar cuenta");
                }
            }
        };
        verificarCuenta();
    }, [token, navigate]);
    return(
        <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          Verificación de cuenta
        </h2>

        {mensaje && (
          <p className="text-green-600 mb-3">{mensaje}</p>
        )}

        {error && (
          <p className="text-red-500 mb-3">{error}</p>
        )}

        <p className="text-sm text-gray-500">
          Serás redirigido al login...
        </p>

      </div>

    </div>
    );
}
export default VerificarCuenta;