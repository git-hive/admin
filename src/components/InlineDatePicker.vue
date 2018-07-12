<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="date"
      :label="label || 'Date'"
      :error-messages="errorMessages"
      prepend-icon="event"
      readonly
    ></v-text-field>
    <v-date-picker
      :value="date"
      @input="(newDate) => $emit('input', newDate)"
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="primary"
        @click="modal = false"
      >Cancel</v-btn>
      <v-btn
        flat
        color="primary"
        @click="$refs.dialog.save(date)"
      >OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "inline-date-picker",
  model: { prop: "date", event: "input" },
  props: {
    label: String,
    date: String,
    required: Boolean,
    errorMessages: Array
  },
  data: () => ({ modal: false })
};
</script>
