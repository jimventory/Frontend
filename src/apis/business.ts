export const BUSINESS_BASE_API = "https://localhost:7079/api/business/";

export const API_ROUTES = {
    REGISTER : "register",
};

export function getFullPath(route : string) {
    return `${BUSINESS_BASE_API}${route}`;
};
