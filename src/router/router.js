import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import MemberRequests from "@/views/MemberRequests.vue";
import Users from "@/views/Users.vue";
import FutureSessions from "@/views/association/sessions/FutureSessions.vue";
import EndedSessions from "@/views/association/sessions/EndedSessions.vue";
import CurrentSessions from "@/views/association/sessions/CurrentSessions.vue";
import NewSession from "@/views/association/NewSession.vue";
import Reports from "@/views/association/Reports.vue";
import Files from "@/views/association/Files.vue";
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
      path: "/association/sessions/ended",
      name: "association.sessions.ended",
      component: EndedSessions
    },
    {
      path: "/association/sessions/current",
      name: "association.sessions.current",
      component: CurrentSessions
    },
    {
      path: "/association/sessions/future",
      name: "association.sessions.future",
      component: FutureSessions
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
