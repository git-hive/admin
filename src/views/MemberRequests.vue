<template>
  <v-container elevation-4 class="pa-0">
    <v-list v-if="requests.length !== 0">
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

          <v-form :ref="`form-${request.id}`" lazy-validation>
            <v-flex xs6 class="pl-3">
              <v-select
                :items="roles"
                v-model="selectedRole"
                label="Cargo"
                item-value="id"
                item-text="name"
                hint="O associado será aceito com este cargo"
                :rules="[v => !!v || 'Escolha o cargo!']"
              >
              </v-select>
            </v-flex>

            <v-flex xs6>
              <v-btn color="primary" @click="acceptRequest(request.id)">Aceitar</v-btn>
              <v-btn color="error" @click="deleteRequest(request.id)">Rejeitar</v-btn>
            </v-flex>
          </v-form>

        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-list>
    <div v-else class="headline pa-4">Sem requisições por agora! 🐝</div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { getAllMemberRequestsDocs } from "@/firebase/firestore/associations/memberRequests";
import { getAllAssociationRolesDocs } from "@/firebase/firestore/associations/roles";
import { addAssociationToUser } from "@/firebase/firestore/users";
import { snapToObject } from "@/firebase/firestore/helpers";
import MemberRequestTile from "@/components/MemberRequestTile.vue";

export default {
  name: "member-requests",
  components: {
    MemberRequestTile
  },
  data: () => ({
    requests: [],
    roles: [],
    selectedRole: null
  }),
  computed: {
    ...mapState(["selectedAssociation"])
  },
  async mounted() {
    this.requests = await getAllMemberRequestsDocs(this.selectedAssociation.id);
    const roles = await getAllAssociationRolesDocs(this.selectedAssociation.id);
    this.roles = roles.map(snapToObject);
  },
  methods: {
    acceptRequest(requestID) {
      if (!this.selectedRole) {
        this.$refs[`form-${requestID}`][0].validate();
        return;
      }

      addAssociationToUser(requestID, this.selectedAssociation.ref);
      this.deleteRequest(requestID);
    },
    async deleteRequest(requestID) {
      const request = this.requests.filter(r => r.id === requestID)[0];
      this.requests.splice(this.requests.indexOf(request), 1);

      await request.ref.delete();
    },
    getRoleByID(roleID) {
      return this.roles.filter(role => role.id === roleID)[0];
    }
  }
};
</script>
