<template>
  <v-container>
    <v-list v-flex>
      <v-list-tile v-for="user in users" :key="user.email" @click="() => {}">
        <v-list-tile-content>
          <v-list-tile-title>{{user.email}}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-avatar>
          <img :src="user.photoUrl">
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { getAllUserSnaps } from "@/firebase/firestore/users";
import "firebase/firestore";
import { firestore } from "firebase";

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
      getAllUserSnaps(firestore)
        .then(users => {
          this.users = users.map(u => u.data());
        })
        .catch(err => {
          throw new Error(err);
        });
    }
  }
};
</script>
