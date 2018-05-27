export default {
  SET_USER(state, user) {
    state.user = user;
  },

  UNSET_USER(state) {
    state.user = null;
  }
};
