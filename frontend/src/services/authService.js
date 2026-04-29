import axios from "axios"

export const registerUserRequest = async (data) =>{
    const API = "http://localhost:4000/api"
    const res = await axios.post(`${API}/registro`,data);
    return res.data;
}

export default registerUserRequest;