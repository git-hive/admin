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
          <v-list two-line subheader>

            <v-subheader inset>Current</v-subheader>
            <v-expansion-panel popout>
              <v-expansion-panel-content
                v-for="session in currentSessions"
                :key="session.id"
              >
                <div slot="header">{{session.id}}</div>
                <v-card>
                  <v-card-test>
                    <code>{{JSON.stringify({
                        status: session.get("status"),
                        agendasNum: session.get("agendasNum"),
                        general: session.get("general"),
                        ordinary: session.get("ordinary"),
                        startsAt: session.get("startsAt"),
                        endsAt: session.get("endsAt"),
                      }, null, 2)}}</code>
                  </v-card-test>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-subheader inset>Future</v-subheader>
            <v-expansion-panel popout>
              <v-expansion-panel-content
                v-for="session in futureSessions"
                :key="session.id"
              >
                <div slot="header">{{session.id}}</div>
                <v-card>
                  <v-card-test>
                    <code>{{JSON.stringify({status: session.get("status")})}}</code>
                  </v-card-test>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-subheader inset>Ended</v-subheader>
            <v-expansion-panel popout>
              <v-expansion-panel-content
                v-for="session in endedSessions"
                :key="session.id"
              >
                <div slot="header">{{session.id}}</div>
                <v-card>
                  <v-card-test>
                    <code>{{JSON.stringify({status: session.get("status")})}}</code>
                  </v-card-test>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-list>
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
import {
  addAssociationSession,
  sessionsRef
} from "@/firebase/firestore/associations/sessions";

import SessionForm from "@/components/SessionForm.vue";

export default {
  name: "Association",
  components: {
    SessionForm
  },
  data: () => ({
    sessions: []
  }),
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
    },
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
    }
  }
};
</script>

<style>
</style>
