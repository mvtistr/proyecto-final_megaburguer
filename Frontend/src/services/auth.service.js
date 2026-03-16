import API from "./api";

export const registerUser = async (userData) => {
    const res = await API.post('/auth/register', userData);
    return res.data;
};

export const loginUser = async (credentials) => {
    const res = await API.post('/auth/login', credentials);
    const { token } = res.data;
    if (token) {
        localStorage.setItem('token', token);
    }
    return res.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};

export const authService = {
    registerUser,
    loginUser,
    logoutUser
};