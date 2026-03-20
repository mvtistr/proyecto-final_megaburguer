import API from "./api";

export const registerUser = async (userData) => {
    const res = await API.post('/auth/register', userData);
    return res.data;
};

export const loginUser = async (data) => {
    const res = await API.post('/auth/login', data);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
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