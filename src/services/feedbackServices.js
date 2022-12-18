import instance from "./axios";

export const getFeedbacks = () => {
  return instance.get("/feedbacks");
};

export const addFeedback = (data) => {
  return instance.post("/feedbacks/new", data);
};

export const getSingleFeedback = (id) => {
  return instance.get("/feedbacks/" + id);
};

export const deleteFeedback = (id) => {
  return instance.delete("/feedbacks/" + id);
};

export const editFeedback = (data) => {
  return instance.put("/feedback", data);
};

export const addComment = (data) => {
  return instance.post("/comment", data);
};

export const addReply = (data) => {
  return instance.post("/reply", data);
};
