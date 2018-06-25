<template>
  <v-form ref="questionOptionForm">
    <v-text-field
      v-model="title"
      label="Título"
      required
    ></v-text-field>
    <v-text-field
      v-model="content"
      label="Subtítulo"
      multi-line
      required
    ></v-text-field>
    <v-btn @click="submit">Adicionar opção</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "question-options-form",
  data: () => ({
    isValid: false,
    title: "",
    content: ""
  }),
  methods: {
    submit() {
      this.$emit("submit", {
        title: this.title,
        content: this.content
      });

      this.$refs.questionOptionForm.reset();
    }
  }
};
</script>
