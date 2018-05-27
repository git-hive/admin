export default {
  SET_USER(state, user) {
    state.user = user;
  },

  UNSET_USER(state) {
    state.user = null;
  },

  SET_USER_ASSOCIATIONS(state, userAssociations) {
    state.userAssociations = userAssociations;
  }
};
