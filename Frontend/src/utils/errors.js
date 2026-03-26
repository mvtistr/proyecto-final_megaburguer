import toast from "react-hot-toast";

export const errors = {
    network: "NETWORK_ERROR",
    api: "API_ERROR",
    unauthorized: "UNAUTHORIZED",
    forbidden: "FORBIDDEN",
    not_found: "NOT_FOUND",
    empty: "EMPTY_DATA",
    server: "SERVER_ERROR"
};

export const handleError = (error) => {
    if(error.response){
        const status = error.response.status;
        switch(status){
            case 401:
                toast.error("Sesión expirada");
                localStorage.removeItem("token");
                window.location.href = "/login";
                throw new Error(errors.unauthorized);
            case 403:
                toast.error("No tienes permisos");
                throw new Error(errors.forbidden);
            case 404:
                throw new Error(errors.not_found);
            case 500:
                toast.error("Error del servidor");
                throw new Error(errors.server);
            default:
                throw new Error(error.response.data?.message || errors.api);
        }
    }
    if(error.request){
        toast.error("No hay conexión con el servidor");
        throw new Error(errors.network);
    }
    throw new Error(errors.api);
};