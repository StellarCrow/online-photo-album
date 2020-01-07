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
    return Api().get(`/photos/${id}`);
  },
  getPhotoLikeStatus(imageId, userId) {
    return Api().get(`/photos/${imageId}/${userId}/like/status`);
  },
  setLike(imageId, userId) {
    return Api().post(`/photos/${imageId}/like/set`, { userId: userId });
  },
  deleteLike(imageId, userId) {
    return Api().post(`/photos/${imageId}/like/delete`, { userId: userId });
  }
};
