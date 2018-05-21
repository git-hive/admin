import "./firebase/main";
import "./registerServiceWorker";
import "vuetify/dist/vuetify.min.css";

import Vue from "vue";
import Vuetify from "vuetify";
import { auth } from "firebase";

import App from "./App.vue";
import router from "@/router/router";
import store from "@/store/store";

Vue.use(Vuetify);

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

auth().onAuthStateChanged(user => {
  const { dispatch } = app.$store;

  if (user) {
    dispatch("setUser", user);
  } else {
    dispatch("unsetUser");
  }
});
