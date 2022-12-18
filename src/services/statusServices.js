import instance from "./axios";

export const getStatuses = () => {
  return instance.get("/status");
};
