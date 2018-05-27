<template>
  <v-select
    :items="associations"
    item-text="name"
    item-value="id"
    v-model="selectedAssociationID"
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
      selectedAssociationID: null
    };
  },
  mounted() {
    if (this.selectedAssociation) {
      this.selectedAssociationID = this.selectedAssociation.id;
    }
  },
  watch: {
    selectedAssociationID(associationID) {
      let selected = this.userAssociations.find(a => a.id === associationID);

      this.setSelectedAssociation(selected);
    },
    selectedAssociation(association) {
      this.selectedAssociationID = association.id;
    }
  },
  computed: {
    ...mapState(["selectedAssociation", "userAssociations"]),

    associations: function() {
      return this.userAssociations.map(snap => ({
        id: snap.id,
        name: snap.get("name")
      }));
    }
  },
  methods: {
    ...mapActions(["setSelectedAssociation"])
  }
};
</script>
