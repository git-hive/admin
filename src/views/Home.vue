<template>
  <v-container>
    <p class="headline text-xs-center">Devs at work</p>
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
    this.fetchAndSetUsers()
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    fetchAndSetUsers() {
      getAllUserSnaps()
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
