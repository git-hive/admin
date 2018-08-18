<template>
  <v-container elevation-4 class="pa-0">
    <v-tabs fixed-tabs v-model="tab">

      <v-tab>{{ heading || "seções" }}</v-tab>

      <v-tabs-items>
        <v-tab-item>
          <v-card flat>
            <v-list two-line subheader>
              <v-expansion-panel popout>
                <v-expansion-panel-content
                  v-for="session in filteredSessions"
                  :key="session.id"
                >
                  <div slot="header">
                    {{formatDate( session.startsAt )}} à
                    {{formatDate(session.endsAt)}}
                    <v-chip v-if="session.general">Geral</v-chip>
                    <v-chip v-if="session.ordinary">Ordinária</v-chip>
                  </div>

                  <v-card>
                    <v-card-text>
                      <h1>Início: {{formatDateTime(session.startsAt)}}</h1>
                      <h1>Término: {{formatDateTime(session.endsAt)}}</h1>
                      <h1>Número de pautas: {{session.agendasNum }}</h1>
                      <h1>Situação: {{translateStatus(session.status)}}</h1>
                      <h1>Geral: {{session.general ? 'Sim' : 'Não'}}</h1>
                      <h1>Ordinária: {{session.orinary ? 'Sim' : 'Não'}}</h1>

                      <h1 class="headline">Pautas</h1>
                      <agendas-list :agendas="session.agendas" />
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-list>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { sessionsRef } from "@/firebase/firestore/associations/sessions";
import { agendasRef } from "@/firebase/firestore/associations/agendas";
import { questionsRef } from "@/firebase/firestore/associations/questions";
import { getDocsFromCollection } from "@/firebase/firestore/helpers";
import AgendasList from "@/components/session/agenda/AgendasList.vue";

export default {
  name: "sessions-list",
  props: ["heading", "statusFilter"],
  components: {
    AgendasList
  },
  data: () => ({
    sessions: [],
    agendas: [],
    tab: "current"
  }),
  computed: {
    ...mapState(["selectedAssociation"]),
    filteredSessions: function() {
      return this.sessions.filter(s => s.status === this.statusFilter);
    }
  },
  mounted() {
    this.addAssociationsSnapListener();
  },
  methods: {
    addAssociationsSnapListener() {
      sessionsRef(this.selectedAssociation.id).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(async change => {
          if (change.type === "added") {
            this.sessions.push({
              ...change.doc.data(),
              agendas: await this.getSessionAgendasWithQuestions(change.doc)
            });
          }
          if (change.type === "modified") {
            const before = this.sessions.find(s => s.id === change.doc.id);
            const index = this.sessions.indexOf(before);
            this.sessions.splice(index, 1);
            this.sessions.push({
              ...change.doc.data(),
              agendas: await this.getSessionAgendasWithQuestions(change.doc)
            });
          }
          if (change.type === "removed") {
            const before = this.sessions.find(s => s.id === change.doc.id);
            const index = this.sessions.indexOf(before);
            this.sessions.splice(index, 1);
          }
        });
      });
    },
    formatDate(timestamp) {
      const d = new Date(timestamp);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    },
    formatDateTime(timestamp) {
      const d = new Date(timestamp);
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    },
    translateStatus(status) {
      switch (status) {
        case "ended":
          return "terminada";
        case "current":
          return "corrente";
        case "future":
          return "futura";
      }
    },
    async getSessionAgendasWithQuestions(session) {
      const agendasSnaps = await getDocsFromCollection(agendasRef(session.ref));
      const agendas = [];

      agendasSnaps.forEach(async agenda => {
        const questionsSnaps =
          await getDocsFromCollection(questionsRef(agenda.ref));
        agendas.push({
          ...agenda.data(),
          questions: questionsSnaps.map(q => q.data())
        });
      });

      return agendas;
    }
  }
};
</script>

<style>
</style>
