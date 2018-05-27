import "@/firebase/main";
import "@/registerServiceWorker";
import "vuetify/dist/vuetify.min.css";

import Vue from "vue";
import Vuetify from "vuetify";

import App from "@/App.vue";
import router from "@/router/router";
import store from "@/vuex/store";
import colors from "@/config/colors";

import { setOnAuthStateChangedListener } from "@/firebase/auth";

Vue.use(Vuetify, { theme: colors });

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

setOnAuthStateChangedListener();
