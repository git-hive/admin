<template>
  <v-container elevation-4 class="pa-0">
    <v-dialog v-model="dialog">
      <v-tooltip slot="activator" left>
        <v-btn slot="activator" color="primary" fixed fab bottom right>
          <v-icon>add</v-icon>
        </v-btn>
        <span>Criar informe</span>
      </v-tooltip>

    <report-form @submit="handleReportSubmit"/>

    </v-dialog>

    <v-tabs fixed-tabs>
      <v-tab>Informes</v-tab>
      <v-tab-item>
        <v-list>
          <v-list-tile v-for="report in reports" :key="report.id" @click="() => {}">
            <v-list-tile-content>
              <v-list-tile-title>{{report.get("description")}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import {
  addAssociationReport,
  getAllAssociationReportSnaps
} from "@/firebase/firestore/associations/reports";

import ReportForm from "@/components/ReportForm.vue";

export default {
  name: "reports",
  components: { ReportForm },
  data: () => ({
    dialog: false,
    reports: []
  }),
  computed: {
    ...mapState(["selectedAssociation"])
  },
  mounted() {
    this.fetchReportsAndSet();
  },
  methods: {
    async handleReportSubmit({ description, startsAt, endsAt, isShowing }) {
      await addAssociationReport(this.selectedAssociation.id, {
        description: description,
        showing: isShowing,
        startsAt: Number(startsAt),
        endsAt: Number(endsAt),
        associationRef: this.selectedAssociation.ref
      });
      this.fetchReportsAndSet();
      this.dialog = false;
    },
    async fetchReportsAndSet() {
      this.reports =
        await getAllAssociationReportSnaps(this.selectedAssociation.id)
    }
  }
};
</script>
