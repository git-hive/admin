<template>
  <v-navigation-drawer
    fixed
    v-model="isVisible"
    app
  >
    <v-list>
      <AssociationSelect v-if="user"/>

      <v-divider></v-divider>

      <div v-for="item in menuItems" :key="item.text">
        <v-list-tile v-if="!!item.action" router :to="item.action">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group
          v-if="!item.action && !!item.subItems"
          :prepend-icon="item.icon"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{item.text}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-for="subItem in item.subItems"
            v-model="item.active"
            :key="subItem.title"
            router
            :to="subItem.action"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{subItem.text}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
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
