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
      <v-btn flat color="pink" @click.native="snackbar = false">Fechar</v-btn>
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
        { text: "Início", icon: "home", action: "/" },
        { text: "Usuários", icon: "people", action: "/users" },
        {
          text: "Solicitações de Membros",
          icon: "supervised_user_circle",
          action: "/member-requests"
        },
        {
          text: "Votações",
          icon: "how_to_vote",
          subItems: [
            {
              text: "Passadas",
              icon: "",
              action: "/association/sessions/ended"
            },
            {
              text: "Correntes",
              icon: "",
              action: "/association/sessions/current"
            },
            {
              text: "Futuras",
              icon: "",
              action: "/association/sessions/future"
            },
            {
              text: "Nova Votação",
              icon: "",
              action: "/association/sessions/new"
            }
          ]
        },
        {
          text: "Informes",
          icon: "announcement",
          action: "/association/reports"
        },
        { text: "Arquivos", icon: "folder", action: "/association/files" }
      ]
    };
  },
  computed: {
    ...mapState(["user", "associations"]),
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
          if (!this.user) {
            this.showSnackBar(
              "Usuário não encontrado. Cadastre-se no app primeiro!"
            );
          } else if (!this.associations || this.associations.length === 0) {
            this.showSnackBar("Você não é administrador em nenhuma associação");
          } else {
            this.showSnackBar("Signed in!");
          }
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
