import api from "./api";
import { errors, handleError } from "./errors";

export const registerUser = async (userData) => {
    try {
        const res = await api.post("/auth/register", userData);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const loginUser = async (data) => {
    try {
        const res = await api.post("/auth/login", data);
        if (!res.data?.token || !res.data?.user) {
            throw new Error(errors.empty);
        }
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        handleError(error);
    }
};

export const authService = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};