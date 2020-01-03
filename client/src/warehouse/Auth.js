import AuthenticationService from "../services/AuthenticationService";
import axios from "axios";

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  status: ""
};

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user
};

const actions = {
  async login({ commit }, user) {
    commit("auth_request");
    let res = await AuthenticationService.login(user);
    if (res.data.success) {
      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem("token", token);
      //Set axios defaults
      axios.defaults.headers.common["Authorization"] = token;
      commit("auth_success", token, user);
    }
    return res;
  },
  //Registration
  async register({ commit }, userData) {
    commit("register_request");
    let res = await AuthenticationService.register(userData);
    if (res.data.success !== undefined) {
      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem("token", token);
      //Set axios defaults
      axios.defaults.headers.common["Authorization"] = token;

      commit("register_success", token, user);
    }
    return res;
  }
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.status = "success";
  },
  register_request(state) {
    state.status = "loading";
  },
  register_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.status = "success";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
