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
import AOS from "aos";
import "aos/dist/aos.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretRight,
  faBars,
  faChevronRight,
  faChevronLeft,
  faTimes,
  faHeart,
  faUser,
  faSearch,
  faSlidersH
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebookF,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
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
  faTimes,
  faHeart,
  faUser,
  farHeart,
  faSearch,
  faSlidersH
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
  created() {
    AOS.init();
  },
  router: router,
  store: store,
  render: h => h(App)
}).$mount("#app");
