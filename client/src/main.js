// ------------------IMPORTS-----------------------
import Es6Promise from "es6-promise";
import "@babel/polyfill";
Es6Promise.polyfill();
require("es6-promise").polyfill();
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import "es6-promise/auto";
import store from "./store";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretRight,
  faBars,
  faChevronRight,
  faChevronLeft,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebookF,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// -----------------------------------------------------
library.add(
  faCaretDown,
  faCaretRight,
  faChevronRight,
  faChevronLeft,
  faBars,
  faTwitter,
  faFacebookF,
  faInstagram,
  faTimes
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

//Setting up default vue's http modules for api calls
Vue.prototype.$http = axios;
//load the token from the LocalStorage
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount("#app");
