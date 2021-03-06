import Api from "./Api";

export default {
  getUser(id) {
    return Api().get(`/users/${id}`);
  },
  getAlbums(id) {
    return Api().get(`/users/${id}/albums`);
  },
  checkUsername(username) {
    return Api().get(`/users/exist/${username}`);
  }
};
