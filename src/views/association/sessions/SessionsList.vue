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
                    {{formatDate( session.get('startsAt') )}} -
                    {{formatDate(session.get('endsAt'))}}
                  </div>
                  <v-card>
                    <v-card-text>
                      <code>
                        {{JSON.stringify({status: session.get("status")})}}
                      </code>
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

export default {
  name: "sessions-list",
  props: ["heading", "statusFilter"],
  data: () => ({ sessions: [], tab: "current" }),
  computed: {
    ...mapState(["selectedAssociation"]),
    filteredSessions: function() {
      return this.sessions.filter(s => s.get("status") === this.statusFilter);
    }
  },
  mounted() {
    this.addAssociationsSnapListener();
  },
  methods: {
    addAssociationsSnapListener() {
      sessionsRef(this.selectedAssociation.id).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.sessions.push(change.doc);
          }
          if (change.type === "modified") {
            const before = this.sessions.find(s => s.id === change.doc.id);
            const index = this.sessions.indexOf(before);
            this.sessions.splice(index, 1);
            this.sessions.push(change.doc);
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
    }
  }
};
</script>

<style>
</style>
