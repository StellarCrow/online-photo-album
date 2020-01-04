import Api from "./Api";

export default {
  getUser(id) {
    return Api().get(`/users/profile/${id}`);
  }
};
