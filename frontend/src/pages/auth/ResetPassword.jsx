import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validarTokenRequest, nuevoPasswordRequest } from "../../services/authService.js";

import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import PasswordInput from "../../components/ui/PasswordInput.jsx";

const ResetPassword = () =>{
    const navigate = useNavigate();
    const { token} = useParams();
    const [valido, setValido] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError]= useState("");

    const [form, setForm] = useState({
        password: "",
        confirmpassword:""
    });
    useEffect(()=>{
        const validar = async() =>{
            try{
                await validarTokenRequest(token);
                setValido(true);
            }catch{
                setError("Token invalido");
            }
        };
        validar();
    },[token]);
    const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

    const handleSubmit = async (e)=>
    {
        e.preventDefault();
        try{
            if (!form.password || !form.confirmpassword) {
                return setError("Todos los campos son obligatorios");
            }
            if (form.password !== form.confirmpassword) {
                return setError("Las contraseñas no coinciden");
            }
            const res= await nuevoPasswordRequest(token, form);
            setTimeout(() => {
                navigate("/login");
            },2000);
            setMsg(res.msg);
            setError("");
        }catch(error){
            setError(error.response?.data?.msg ||"Error");
        }
    };
    if(!valido) return <p>{error}</p>

    return (
        <div className="min-h-screen flex items-center justify-center" >
            <Card className="w-full max-w-md">
                <h2 className="text-x1 font-bold mb-4 text-center">
                    Nueva Contraseña
                </h2>
                {msg && <p className="text-green-600 text-center">{msg}</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <PasswordInput
                       name="password"
                       placeholder="Nueva contraseña"
                       value={form.password}
                        onChange={handleChange}
                    />

                    <PasswordInput
                        name="confirmpassword"
                        placeholder="Confirmar contraseña"
                        value={form.confirmpassword}
                        onChange={handleChange}
                      />

                    <div className="flex justify-center">
                        <Button type="submit">Guardar</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
export default ResetPassword;