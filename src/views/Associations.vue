<template>
  <v-container elevation-4 class="pa-0">
    <v-list>
      <v-list-tile
        v-for="association in userAssociations"
        :key="association.id"
        @click="() => {}"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{association.get('name')}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userAssociations"])
  }
};
</script>

<style>
code {
  font-size: 1.5rem;
}
</style>
