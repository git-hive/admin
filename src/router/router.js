import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Users from "@/views/Users.vue";
import Association from "@/views/Association.vue";
import Sessions from "@/views/association/Sessions.vue";
import About from "@/views/About.vue";
import { routeIsPublic, userIsLoggedIn } from "./route-helpers";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/association",
      name: "association",
      component: Association
    },
    {
      path: "/association/sessions",
      name: "association.sessions",
      component: Sessions
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (routeIsPublic(to.fullPath)) {
    return next();
  }

  if (!userIsLoggedIn()) {
    return next("/");
  }

  next();
});

export default router;
