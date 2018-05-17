<template>
  <v-app>
    <Toolbar @drawer-toggle="callToggleDrawer"/>
    <NavigationDrawer ref="drawer" :menuItems="drawerMenuItems"/>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import Toolbar from "@/components/Toolbar.vue";

export default {
  name: "Hive",
  components: {
    NavigationDrawer,
    Toolbar
  },
  data() {
    return {
      drawerMenuItems: [
        { text: "Home", icon: "home", action: "/" },
        { text: "About", icon: "contact_mail", action: "/about" }
      ]
    };
  },
  methods: {
    callToggleDrawer() {
      this.$refs["drawer"].toggleDrawer();
    }
  }
};
</script>
