<template>
  <v-container elevation-4 class="pa-0">
    <v-dialog>
      <v-tooltip slot="activator" left>
        <v-btn slot="activator" color="primary" fixed fab bottom right>
          <v-icon>add</v-icon>
        </v-btn>
        <span>Create report</span>
      </v-tooltip>

    <report-form @submit="handleReportSubmit"/>

    </v-dialog>

    <v-tabs @input="selectForm" fixed-tabs>
      <v-tab>Reports</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>Report</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { addAssociationReport } from "@/firebase/firestore/associations/reports";

import ReportForm from "@/components/ReportForm.vue";

export default {
  name: "reports",
  components: { ReportForm },
  data: () => ({}),
  computed: {
    ...mapState(["selectedAssociation"])
  },
  methods: {
    handleReportSubmit({ description, startsAt, endsAt, isShowing }) {
      addAssociationReport(this.selectedAssociation.id, {
        description: description,
        showing: isShowing,
        startsAt: Number(startsAt),
        endsAt: Number(endsAt),
        associationRef: this.selectedAssociation.ref
      });
    }
  }
};
</script>
