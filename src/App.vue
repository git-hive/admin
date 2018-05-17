<template>
  <v-app>
    <Toolbar
      :user="user"
      @drawer-toggle="callToggleDrawer"
      @sign-in="handleSignIn"
      @sign-out="handleSignOut"
    />
    <NavigationDrawer ref="drawer" :menuItems="drawerMenuItems"/>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>

    <v-snackbar v-model="snackbar">
      {{snackBarText}}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import Toolbar from "@/components/Toolbar.vue";
import { signIn, signOut } from "@/firebase/auth";

export default {
  name: "Hive",
  components: {
    NavigationDrawer,
    Toolbar
  },
  data() {
    return {
      snackbar: false,
      snackBarText: "",
      snackBarTimeOut: 2000,
      drawerMenuItems: [
        { text: "Home", icon: "home", action: "/" },
        { text: "About", icon: "contact_mail", action: "/about" }
      ]
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    callToggleDrawer() {
      this.$refs["drawer"].toggleDrawer();
    },
    handleSignIn() {
      signIn()
        .then(() => {
          this.showSnackBar("Signed in!");
        })
        .catch(() => {
          this.showSnackBar("Failed to sign in");
        });
    },
    handleSignOut() {
      signOut()
        .then(() => {
          this.showSnackBar("Signed out!");
        })
        .catch(() => {
          this.showSnackBar("Failed to sign out");
        });
    },
    showSnackBar(text) {
      this.snackBarText = text;
      this.snackbar = true;
    }
  }
};
</script>
