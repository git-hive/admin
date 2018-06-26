<template>
  <v-container elevation-4 class="pa-0">
    <v-tooltip left>
      <v-btn
        router
        to="/association/sessions/new"
        slot="activator"
        color="primary"
        fixed
        fab
        bottom
        right
      >
        <v-icon>add</v-icon>
      </v-btn>
      <span>Criar assembléia</span>
    </v-tooltip>

    <v-tabs fixed-tabs v-model="tab">

      <v-tab>Ended</v-tab>
      <v-tab href="#current">Current</v-tab>
      <v-tab>Future</v-tab>

      <v-tabs-items>
        <v-tab-item>
          <v-card flat>
            <v-list two-line subheader>
              <v-expansion-panel popout>
                <v-expansion-panel-content
                  v-for="session in endedSessions"
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

        <v-tab-item id="current">
          <v-card flat>
            <v-list two-line subheader>
              <v-subheader inset>Current</v-subheader>
              <v-expansion-panel popout>
                <v-expansion-panel-content
                  v-for="session in currentSessions"
                  :key="session.id"
                >
                  <div slot="header">
                    {{formatDate( session.get('startsAt') )}} -
                    {{formatDate(session.get('endsAt'))}}
                  </div>
                  <v-card>
                    <v-card-text>
                      <code>{{JSON.stringify({
                          status: session.get("status"),
                          agendasNum: session.get("agendasNum"),
                          general: session.get("general"),
                          ordinary: session.get("ordinary"),
                          startsAt: session.get("startsAt"),
                          endsAt: session.get("endsAt"),
                        }, null, 2)}}</code>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-list>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-list two-line subheader>
              <v-expansion-panel popout>
                <v-expansion-panel-content
                  v-for="session in futureSessions"
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
  name: "session",
  data: () => ({ sessions: [], tab: "current" }),
  computed: {
    ...mapState(["selectedAssociation"]),
    endedSessions: function() {
      return this.sessions.filter(s => s.get("status") === "ended");
    },
    currentSessions: function() {
      return this.sessions.filter(s => s.get("status") === "current");
    },
    futureSessions: function() {
      return this.sessions.filter(s => s.get("status") === "future");
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
