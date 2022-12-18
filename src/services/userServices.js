import instance from "./axios";

export const getUsers = () => {
  return instance.get("/users");
};
