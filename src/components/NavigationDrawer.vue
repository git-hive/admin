<template>
  <v-navigation-drawer
    fixed
    v-model="isVisible"
    app
  >
    <v-list>
      <div v-for="item in menuItems" :key="item.text">
        <v-list-tile router :to="item.action">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  props: ["menuItems"],
  data() {
    return {
      isVisible: true
    };
  },
  methods: {
    toggleDrawer() {
      this.isVisible = !this.isVisible;
    }
  }
};
</script>
