import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
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
    component: () => import("../views/Contacts.vue")
  },
  {
    path: "/uploadImage",
    name: "uploadImage",
    component: () => import("../views/UploadImage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users/:id",
    name: "profile",
    component: () => import("../views/UserProfile.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users/:id/photos/:pid",
    name: "image",
    component: () => import("../views/ImagePage.vue")
  },
  {
    path: "/users/:id/albums/:aid",
    name: "album",
    component: () => import("../views/AlbumPage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/photos/explore",
    name: "explore",
    component: () => import("../views/ExplorePhotos.vue")
  },
  {
    path: "/photos/explore/:query",
    name: "explore",
    component: () => import("../views/ExplorePhotos.vue"),
    props: true
  },
  {
    path: "*",
    name: "pageNotFound",
    component: () => import("../views/PageNotFound.vue")
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
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
