export default {
  setUser(context, user) {
    context.commit("SET_USER", user);
  },

  unsetUser(context) {
    context.commit("UNSET_USER");
  },

  setUserAssociations(context, associations) {
    context.commit("SET_USER_ASSOCIATIONS", associations);
  }
};
