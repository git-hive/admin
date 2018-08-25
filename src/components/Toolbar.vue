<template>
  <v-toolbar color="primary" dark fixed app>
    <v-toolbar-side-icon @click.stop="$emit('drawer-toggle')"></v-toolbar-side-icon>
    <v-toolbar-title>Hive {{nameComplement}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-if="!user"
        @click="$emit('sign-in')"
        flat
      >Entrar</v-btn>
      <v-menu v-else offset-y>
        <v-btn
          flat
          slot="activator"
        >{{user.displayName}}</v-btn>
        <v-list>
          <v-list-tile @click.stop="$emit('sign-out')">
            <v-list-tile-title>Sair</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Toolbar",
  props: ["user"],
  computed: {
    ...mapState(["selectedAssociation"]),
    nameComplement() {
      if (this.selectedAssociation) {
        return `+ ${this.selectedAssociation.get("name")}`;
      }
      return "";
    }
  }
};
</script>
