// ------------------IMPORTS-----------------------

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretRight,
  faBars,
  faChevronRight,
  faChevronLeft
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
  faInstagram
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
  router,
  store,
  render: h => h(App)
}).$mount("#app");
