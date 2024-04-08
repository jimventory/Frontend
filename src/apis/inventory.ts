export const INVENTORY_BASE_API = "https://localhost:7079/api/inventory/";

export const API_ROUTES = {
    SAVE : "update",
    DELETE : "remove",
    ADD : "add",
    GET : "getInventory",
};

export function getFullPath(route : string) {
    return `${INVENTORY_BASE_API}${route}`;
};
