<template>
  <v-select
    :items="associations"
    item-text="name"
    v-model="selectedAssociation"
    label="Select your association"
    hint="Association"
    single-line
    persistent-hint
  ></v-select>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AssociationsSelect",
  data() {
    return {
      selectedAssociation: null
    };
  },
  watch: {
    selectedAssociation() {
      this.setSelectedAssociation(this.selectedAssociation);
    }
  },
  computed: {
    ...mapState(["userAssociations"]),

    associations: function() {
      return this.userAssociations.map(snap => ({
        id: snap.id,
        ref: snap.ref,
        ...snap.data()
      }));
    }
  },
  methods: {
    ...mapActions(["setSelectedAssociation"])
  }
};
</script>
