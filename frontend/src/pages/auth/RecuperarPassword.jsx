import {useState} from "react";
import { recuperarPasswordRequest } from "../../services/authService.js";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";

const RecuperarPassword = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg]= useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const res = await recuperarPasswordRequest(email);
            setMsg(res.msg);
            setError("");
        }catch(err){
            setError(err?.response?.data?.msg || "Error")
        }
    };
    return(
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <h2 className="text-x1 font-bold mb-4 text-center">
                    Recuperar contraseña
                </h2>
                {msg && <p className="text-green-600 text-center">{msg}</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="email"
            placeholder="Correo electrónico"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />

          <div className="flex justify-center">
            <Button type="submit">Enviar</Button>
          </div>

        </form>
            </Card>
        </div>
    );

}
export default RecuperarPassword;