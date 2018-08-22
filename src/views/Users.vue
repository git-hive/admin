<template>
  <v-container elevation-4 class="pa-0">
    <v-list>
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
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { getAllAssociationUsersDocsWithRoles } from "@/firebase/firestore/users";

export default {
  data() {
    return {
      usersWithRoles: []
    };
  },

  mounted() {
    this.fetchAndSetUsers();
  },
  computed: {
    ...mapState(["user", "selectedAssociation"])
  },
  methods: {
    fetchAndSetUsers() {
      getAllAssociationUsersDocsWithRoles(this.selectedAssociation.ref)
        .then(usersWithRoles => {
          this.usersWithRoles = usersWithRoles;
        })
        .catch(err => {
          throw new Error(err);
        });
    }
  }
};
</script>
