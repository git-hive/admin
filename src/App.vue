<template>
  <v-app>
    <Toolbar
      :user="user"
      @drawer-toggle="callToggleDrawer"
      @sign-in="handleSignIn"
      @sign-out="handleSignOut"
    />
    <NavigationDrawer ref="drawer" :menuItems="filteredDrawerMenuItems"/>
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
import { routeIsPublic } from "@/router/route-helpers";

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
        { text: "Users", icon: "people", action: "/users" },
        {
          text: "Association",
          icon: "domain",
          subItems: [
            { text: "Sessions", icon: "", action: "/association" },
            { text: "Reports", icon: "", action: "/association" }
          ]
        },
        { text: "About", icon: "contact_mail", action: "/about" }
      ]
    };
  },
  computed: {
    ...mapState(["user"]),
    filteredDrawerMenuItems: function() {
      if (this.user) {
        return this.drawerMenuItems;
      }

      return this.drawerMenuItems.filter(item => routeIsPublic(item.action));
    }
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
          this.$router.push("/");
          this.showSnackBar("Signed out!");
        })
        .catch(e => {
          this.showSnackBar("Failed to sign out");
          throw new Error(e);
        });
    },
    showSnackBar(text) {
      this.snackBarText = text;
      this.snackbar = true;
    }
  }
};
</script>
