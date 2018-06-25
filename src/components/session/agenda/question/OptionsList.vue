<template>
  <v-list two-line>
    <h1 class="subheading ml-2">Opções</h1>
    <v-list-tile v-for="(option, i) in options" :key="i">
      <v-subheader class="headline">{{i+1}}</v-subheader>
      <v-list-tile-content>
        <v-list-tile-title>{{option.title}}</v-list-tile-title>
        <v-list-tile-sub-title>{{option.content}}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: "options-list",
  props: ["options"]
};
</script>
