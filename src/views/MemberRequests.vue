<template>
  <v-container elevation-4 class="pa-0">
    <v-list>
      <v-expansion-panel>
        <v-expansion-panel-content
          v-for="request in requests"
          :key="request.id"
          @click="() => {}"
        >
          <div slot="header">
            <v-list-tile>
              <v-list-tile-avatar>
                <img :src="request.get('photoUrl')">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{request.get("name")}}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </div>

          <member-request-tile :member-request="request"></member-request-tile>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { getAllMemberRequestsDocs } from "@/firebase/firestore/associations/memberRequests";
import MemberRequestTile from "@/components/MemberRequestTile.vue"
export default {
  name: "member-requests",
  components: {
    MemberRequestTile
  },
  data: () => ({
    requests: []
  }),
  computed: {
    ...mapState(["selectedAssociation"]),
  },
  async mounted() {
    this.requests = await getAllMemberRequestsDocs(this.selectedAssociation.id)
  }
}
</script>
