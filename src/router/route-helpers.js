import store from "@/vuex/store";
import publicRoutes from "@/router/public-routes";

export function userIsLoggedIn() {
  return !!store.state.user;
}

export function routeIsPublic(route) {
  return publicRoutes.includes(route);
}
