<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="time"
    persistent
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="time"
      :label="label || 'Time'"
      prepend-icon="access_time"
      readonly
      :rules="rules"
      :required="required"
    ></v-text-field>
    <v-time-picker
      v-bind:value="time"
      @input="(newTime) => $emit('input', newTime)"
      format="24hr"
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
        @click="$refs.dialog.save(time)"
      >OK</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "inline-time-picker",
  model: { prop: "time", event: "input" },
  props: {
    label: String,
    time: String,
    required: Boolean,
    rules: Array
  },
  data: () => ({ modal: false })
};
</script>
