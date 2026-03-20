import api from "./api";
import { errors } from "./errors.service";

export const registerUser = async (userData) => {
    try{
        const res = await api.post('/auth/register', userData);
        return res.data;
    }catch(error){
        if(error.response){
            throw new Error(error.response.data?.message || errors.api);
        }
        throw new Error(errors.network);
    }
};

export const loginUser = async (data) => {
    try{
        const res = await api.post('/auth/login', data);
        if(!res.data?.token){
            throw new Error(errors.empty);
        }
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data;
    }catch(error){
        if(error.response){
            if(error.response.status === 401){
                throw new Error(errors.unauthorized);
            }
            throw new Error(error.response.data?.message || errors.api);
        }
        throw new Error(errors.network);
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const authService = {
    registerUser,
    loginUser,
    logoutUser
};