import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import MemberRequests from "@/views/MemberRequests.vue";
import Users from "@/views/Users.vue";
import Sessions from "@/views/association/Sessions.vue";
import NewSession from "@/views/association/NewSession.vue";
import Reports from "@/views/association/Reports.vue";
import Files from "@/views/association/Files.vue";
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
      path: "/member-requests",
      name: "mamberRequests",
      component: MemberRequests
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/association/sessions",
      name: "association.sessions",
      component: Sessions
    },
    {
      path: "/association/sessions/new",
      name: "association.sessions.new",
      component: NewSession
    },
    {
      path: "/association/reports",
      name: "association.reports",
      component: Reports
    },
    {
      path: "/association/files",
      name: "association.files",
      component: Files
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
