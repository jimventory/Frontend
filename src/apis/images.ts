export const IMAGE_BASE_API = "https://api.imgur.com/3/";

export const API_ROUTES = {
  UPLOAD: "image",
  GET: "image",
};

export function getFullPath(route: string) {
  return `${IMAGE_BASE_API}${route}`;
}
