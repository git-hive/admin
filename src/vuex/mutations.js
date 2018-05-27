export default {
  SET_USER(state, user) {
    state.user = user;
  },

  UNSET_USER(state) {
    state.user = null;
  },

  SET_USER_ASSOCIATIONS(state, userAssociations) {
    state.userAssociations = userAssociations;
  },

  SET_SELECTED_ASSOCIATION(state, association) {
    state.selectedAssociation = association;
  }
};
