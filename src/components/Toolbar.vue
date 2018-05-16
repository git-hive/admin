<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="$emit('drawer-toggle')"></v-toolbar-side-icon>
    <v-toolbar-title>Hive</v-toolbar-title>
  </v-toolbar>
</template>
