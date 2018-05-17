<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="$emit('drawer-toggle')"></v-toolbar-side-icon>
    <v-toolbar-title>Hive</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-if="!user"
        @click="$emit('sign-in')"
        flat
      >Sign In</v-btn>
      <v-menu v-else offset-y>
        <v-btn
          flat
          slot="activator"
        >{{user.displayName}}</v-btn>
        <v-list>
          <v-list-tile @click.stop="$emit('sign-out')">
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  props: ["user"]
}
</script>
