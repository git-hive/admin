<template>
  <v-form ref="agendaForm">
    <v-text-field
      v-model="title"
      label="Title"
      required
    ></v-text-field>
    <v-text-field
      v-model="content"
      label="Content"
      multi-line
      required
    ></v-text-field>
    <v-btn @click="submit">add agenda</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "agenda-form",
  data: () => ({
    isValid: false,
    title: "",
    content: ""
  }),
  methods: {
    submit() {
      this.$emit("submit", {
        title: this.title,
        content: this.content,
        questionsNum: 0
      });

      this.$refs.agendaForm.reset();
    }
  }
};
</script>
