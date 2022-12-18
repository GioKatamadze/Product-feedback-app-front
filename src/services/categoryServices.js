import instance from "./axios.js";

export const getCategories = () => {
  return instance.get("/categories");
};
