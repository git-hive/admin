<template>
  <v-form ref="questionOptionForm">
    <v-text-field
      v-model="title"
      label="Título"
      v-validate="'required'"
      data-vv-name="title"
      :error-messages="errors.collect('title')"
      required
    ></v-text-field>
    <v-textarea
      v-model="content"
      label="Subtítulo"
      v-validate="'required'"
      data-vv-name="subTitle"
      :error-messages="errors.collect('subTitle')"
      required
    ></v-textarea>
    <v-btn color="primary" @click="submit">Criar opção</v-btn>
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
    async submit() {
      const formIsValid = await this.$validator.validateAll();
      if (!formIsValid) return;

      this.$emit("submit", {
        title: this.title,
        content: this.content
      });

      this.$refs.questionOptionForm.reset();
      this.$validator.reset();
    }
  }
};
</script>
