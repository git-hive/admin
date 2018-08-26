<template>
  <v-container elevation-4 class="pa-0">
    <v-progress-linear
      v-if="isFetchingUsers"
      :indeterminate="true"
    />
    <v-list v-if="hasUsers">
      <v-list-tile
        v-for="({ userDoc, roleDoc }) in usersWithRoles"
        :key="userDoc.id"
        @click="() => {}"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            {{userDoc.get("email")}}
            <span class="caption">({{roleDoc.get('name')}})</span>
          </v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-avatar>
          <img :src="userDoc.get('photoUrl')">
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
    <div
      v-if="!isFetchingUsers && !hasUsers"
      class="headline pa-4"
    >Nenhum usuário cadastrado! 😯</div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { getAllAssociationUsersDocsWithRoles } from "@/firebase/firestore/users";

export default {
  data() {
    return {
      usersWithRoles: undefined,
      isFetchingUsers: true
    };
  },

  mounted() {
    this.fetchAndSetUsers();
  },
  computed: {
    ...mapState(["user", "selectedAssociation"]),
    hasUsers: function() {
      return this.usersWithRoles;
    }
  },
  methods: {
    fetchAndSetUsers() {
      getAllAssociationUsersDocsWithRoles(this.selectedAssociation.ref)
        .then(usersWithRoles => {
          this.usersWithRoles = usersWithRoles;
          this.isFetchingUsers = false;
        })
        .catch(err => {
          this.isFetchingUsers = false;
          throw new Error(err);
        });
    }
  }
};
</script>
