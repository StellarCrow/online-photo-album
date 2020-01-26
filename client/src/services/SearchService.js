import Api from "./Api";

export default {
  explorePhotos(query, filter, sorting, page, orientation) {
    return Api().get(
      `/search/${query}?sort=${sorting}&filter=${filter}&page=${page}&orientation=${orientation}`
    );
  }
};
