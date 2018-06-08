<template>
  <v-form ref="form" v-model="isValid">
    <v-text-field
      v-model="title"
      label="Title"
      :rules="titleRules"
      required
    ></v-text-field>
    <v-text-field
      v-model="content"
      label="Content"
      :rules="contentRules"
      multi-line
      required
    ></v-text-field>
    <v-btn :disabled="!isValid" @click="submit">add agenda</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "agenda-form",
  data: () => ({
    isValid: false,
    title: "",
    content: "",
    titleRules: [v => !!v],
    contentRules: [v => !!v]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("submit", {
          title: this.title,
          content: this.content
        });

        this.$refs.form.reset();
      }
    }
  }
};
</script>
