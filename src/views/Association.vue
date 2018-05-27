<template>
  <v-container elevation-4 class="pa-0">
    <v-btn
      fixed
      color="primary"
      fab
      bottom
      right
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-tabs fixed-tabs>
      <v-tab>Sessions</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>asdf</v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab>Votings</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>qwer</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["selectedAssiciaton"])
  }
};
</script>

<style>
</style>
