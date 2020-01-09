import Api from "./Api";

export default {
  searchAllByQuery(query) {
    return Api().get(`/search/${query}`);
  }
};
