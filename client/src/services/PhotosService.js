import Api from "./Api";

export default {
  uploadImage(formData) {
    return Api().post(`/uploadImage`, formData);
  },
  getUserAlbums(id) {
    return Api().get(`/users/${id}/albums`);
  },
  getUserPhotos(id) {
    return Api().get(`/users/${id}/photos`);
  },
  getPhoto(id) {
    return Api().get(`/image/${id}`);
  }
};
