import Api from "./Api";

export default {
  searchAllByQuery(query) {
    return Api().get(`/search/${query}`);
  },
  filterAndSortAll(filter, sorting, query) {
    return Api().get(`/search/${query}?sort=${sorting}&filter=${filter}`);
  }
};
