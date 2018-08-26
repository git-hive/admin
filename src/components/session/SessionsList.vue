<template>
  <v-container elevation-4 class="pa-0">
    <v-tabs fixed-tabs v-model="tab">

      <v-tab>{{ heading || "seções" }}</v-tab>

      <v-tabs-items>
        <v-tab-item>
          <v-card flat>
            <v-progress-linear
              v-if="isFetchingSessions"
              :indeterminate="true"
            />
            <div
              v-if="!isFetchingSessions && !hasSessions"
              class="headline pa-4"
            >Nenhuma Sessão! 😯</div>
            <v-list two-line subheader>
              <v-expansion-panel popout>
                <v-expansion-panel-content
                  v-for="session in filteredSessions"
                  :key="session.id"
                >
                  <div slot="header">
                    {{formatDate(session.startsAt)}} à
                    {{formatDate(session.endsAt)}}
                    <v-chip v-if="session.general">Geral</v-chip>
                    <v-chip v-if="session.ordinary">Ordinária</v-chip>
                  </div>

                  <v-card>
                    <v-card-text>
                      <v-layout class="my-2">
                        <v-flex xs6 class="text-xm-center">
                          <v-text-field
                            label="Início"
                            :value="formatDateTime(session.startsAt)"
                            readonly
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs6 class="text-xm-center">
                          <v-text-field
                            label="Término"
                            :value="formatDateTime(session.endsAt)"
                            readonly
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout class="my-2" justify-start row>
                        <v-checkbox
                          input-value="session.general"
                          color="primary"
                          label="Geral"
                          disabled
                        ></v-checkbox>
                        <v-checkbox
                          input-value="session.ordinary"
                          color="primary"
                          label="Ordinária"
                          disabled
                        ></v-checkbox>
                      </v-layout>

                      <h1 class="headline">Pautas ({{session.agendasNum}})</h1>
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
import { agendasRef } from "@/firebase/firestore/associations/sessions/agendas";
import { questionsRef } from "@/firebase/firestore/associations/sessions/agendas/questions";
import { getAllVotesSnaps } from "@/firebase/firestore/associations/sessions/agendas/questions/votes";
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
    tab: "current",
    isFetchingSessions: false
  }),
  computed: {
    ...mapState(["selectedAssociation"]),
    filteredSessions: function() {
      return this.sessions.filter(s => s.status === this.statusFilter);
    },
    hasSessions: function() {
      return this.filteredSessions.length !== 0;
    }
  },
  mounted() {
    this.addAssociationsSnapListener();
    this.isFetchingSessions = true;
  },
  methods: {
    addAssociationsSnapListener() {
      sessionsRef(this.selectedAssociation.id).onSnapshot(snapshot => {
        this.isFetchingSessions = false
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
    async getSessionAgendasWithQuestions(session) {
      const agendasSnaps = await getDocsFromCollection(agendasRef(session.ref));
      const agendas = [];

      agendasSnaps.forEach(async agenda => {
        const questionsSnaps = await getDocsFromCollection(
          questionsRef(agenda.ref)
        );

        const questions = [];

        questionsSnaps.forEach(async question => {
          questions.push({
            ...question.data(),
            votes: (await getAllVotesSnaps(question.ref)).map(v => v.data())
          });
        });

        agendas.push({
          ...agenda.data(),
          questions: questions
        });
      });

      return agendas;
    }
  }
};
</script>
