import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Contacts from "../views/Contacts.vue";
import UserProfile from "../views/UserProfile.vue";
import PageNotFound from "../views/PageNotFound.vue";
import UploadImage from "../views/UploadImage.vue";
import ImagePage from "../views/ImagePage.vue";
import ExplorePhotos from "../views/ExplorePhotos.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue")
  },
  {
    path: "/contacts",
    name: "contacts",
    component: Contacts
  },
  {
    path: "/uploadImage",
    name: "uploadImage",
    component: UploadImage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users/:id",
    name: "profile",
    component: UserProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users/:id/photos/:pid",
    name: "image",
    component: ImagePage
  },
  {
    path: "/photos/explore",
    name: "explore",
    component: ExplorePhotos
  },
  {
    path: "/photos/s/:query",
    name: "search",
    component: ExplorePhotos,
    props: true
  },
  {
    path: "*",
    name: "pageNotFound",
    component: PageNotFound
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      //Redirect to the Homepage
      next("/");
    } else next();
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      //Redirect to the profile page
      next(`/users/${store.getters.user._id}`);
    } else next();
  } else next();
});

export default router;
