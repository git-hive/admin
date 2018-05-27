<template>
  <v-container elevation-4 class="pa-0">
    <v-dialog>
      <v-tooltip slot="activator" left>
        <v-btn slot="activator" color="primary" fixed fab bottom right>
          <v-icon>add</v-icon>
        </v-btn>
        <span>Create session</span>
      </v-tooltip>

    <session-form/>
    </v-dialog>


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

import SessionForm from "@/components/SessionForm.vue";

export default {
  components: {
    SessionForm
  },
  computed: {
    ...mapState(["selectedAssiciaton"])
  }
};
</script>

<style>
</style>
