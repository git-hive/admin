<template>
  <v-container elevation-4 class="pa-0">
    <v-list>
      <v-list-tile v-for="user in users" :key="user.id" @click="() => {}">
        <v-list-tile-content>
          <v-list-tile-title>{{user.get("email")}}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-avatar>
          <img :src="user.get('photoUrl')">
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { getAllUserSnaps } from "@/firebase/firestore/users";

export default {
  data() {
    return {
      users: []
    };
  },

  mounted() {
    this.fetchAndSetUsers();
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    fetchAndSetUsers() {
      getAllUserSnaps()
        .then(users => {
          this.users = users;
        })
        .catch(err => {
          throw new Error(err);
        });
    }
  }
};
</script>
