import PhotosService from "../services/PhotosService";

const state = {
  isLiked: false,
  totalCount: 0,
  status: ""
};

const getters = {
  likeStatus: status => status.isLiked,
  totalLikesCount: status => status.totalCount
};

const actions = {
  async getPhotoLikeStatus({ commit }, { imageId, userId }) {
    commit("getLikeStatus__request");
    let res = await PhotosService.getPhotoLikeStatus(imageId, userId);
    if (res.data.success) {
      let status = res.data.isLiked;
      let count = res.data.totalCount;
      commit("getLikeStatus__success", { status, count });
    }
  },
  async setLike({ commit }, { imageId, userId }) {
    commit("setLike__request");
    let res = await PhotosService.setLike(imageId, userId);
    if (res.data.success) {
      commit("setLike__success", res.data.totalCount);
    }
  },
  async deleteLike({ commit }, { imageId, userId }) {
    commit("deleteLike__request");
    let res = await PhotosService.deleteLike(imageId, userId);
    if (res.data.success) {
      commit("deleteLike__success", res.data.totalCount);
    }
  }
};

const mutations = {
  getLikeStatus__request(state) {
    state.status = "loading";
  },
  getLikeStatus__success(state, { status, count }) {
    state.isLiked = status;
    state.status = "got photo liked status";
    state.totalCount = count;
  },
  setLike__request(state) {
    state.status = "loading";
  },
  setLike__success(state, count) {
    state.isLiked = true;
    state.status = "setted like";
    state.totalCount = count;
  },
  deleteLike__request(state) {
    state.status = "loading";
  },
  deleteLike__success(state, count) {
    state.isLiked = false;
    state.status = "deleted like";
    state.totalCount = count;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
