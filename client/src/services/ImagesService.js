import Api from "./Api";

export default {
  uploadImage(formData) {
    return Api().post(`/uploadImage`, formData);
  }
};
