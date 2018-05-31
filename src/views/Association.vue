<template>
  <v-container elevation-4 class="pa-0">
    <v-dialog>
      <v-tooltip slot="activator" left>
        <v-btn slot="activator" color="primary" fixed fab bottom right>
          <v-icon>add</v-icon>
        </v-btn>
        <span>Create session</span>
      </v-tooltip>

    <session-form @submit="handleSubmit"/>
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
import { addAssociationSession } from "@/firebase/firestore/associations/sessions";

import SessionForm from "@/components/SessionForm.vue";

export default {
  components: {
    SessionForm
  },
  computed: {
    ...mapState(["selectedAssociation"])
  },
  methods: {
    handleSubmit({ startsAt, endsAt, isOrdinary, isGeneral }) {
      addAssociationSession(this.selectedAssociation.id, {
        ordinary: isOrdinary,
        general: isGeneral,
        startsAt: Number(startsAt),
        endsAt: Number(endsAt),
        agendasNum: 0,
        associationRef: this.selectedAssociation.ref,
        status: "current"
      });
    }
  }
};
</script>

<style>
</style>
