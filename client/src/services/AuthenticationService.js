import Api from "./Api";

export default {
  register(credentials) {
    return Api().post("/users/registration", credentials);
  }
};
