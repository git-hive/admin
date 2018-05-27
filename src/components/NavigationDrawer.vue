<template>
  <v-navigation-drawer
    fixed
    v-model="isVisible"
    app
  >
    <v-list>
      <AssociationSelect v-if="user"/>
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
import { mapState } from "vuex";
import AssociationSelect from "@/components/AssociationsSelect.vue";

export default {
  name: "NavigationDrawer",
  props: ["menuItems"],
  components: {
    AssociationSelect
  },
  data() {
    return {
      isVisible: true
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    toggleDrawer() {
      this.isVisible = !this.isVisible;
    }
  }
};
</script>
