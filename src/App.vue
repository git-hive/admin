<template>
  <v-app>
    <Toolbar @drawer-toggle="drawerIsVisible = !drawerIsVisible"/>
    <NavigationDrawer :isVisible="drawerIsVisible"/>
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
      drawerIsVisible: true
    };
  }
};
</script>
