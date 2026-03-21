export const errors = {
    network: "NETWORK_ERROR",
    api: "API_ERROR",
    unauthorized: "UNAUTHORIZED",
    forbidden: "FORBIDDEN",
    not_found: "NOT_FOUND",
    empty: "EMPTY_DATA"
};

export const handleError = (error) => {
    if(error.response){
        switch(error.response.status){
            case 400:
                throw new Error(error.response.data?.message || errors.api);
            case 401:
                throw new Error(errors.unauthorized);
            case 403:
                throw new Error(errors.forbidden);
            case 404:
                throw new Error(errors.not_found);
            case 500:
                throw new Error("SERVER_ERROR");
            default:
                throw new Error(error.response.data?.message || errors.api);
        }
    }
    if(error.request){
        throw new Error(errors.network);
    }
    throw new Error(errors.api);
};