<template>
  <v-form ref="questionForm">
    <v-text-field
      v-model="question"
      label="Título"
      required
    ></v-text-field>
    <v-text-field
      v-model="info"
      label="Descrição"
      multi-line
      required
    ></v-text-field>

    <options-list :options="options"></options-list>

    <v-btn @click="submit">Adicionar tópico</v-btn>

    <h1 class="headline my-4">Opções</h1>
    <question-options-form @submit="addOption"></question-options-form>
  </v-form>
</template>

<script>
import OptionsList from "./question/OptionsList.vue";
import QuestionOptionsForm from "@/components/session/agenda/QuestionOptionsForm.vue";

export default {
  name: "agenda-question-form",
  components: {
    QuestionOptionsForm,
    OptionsList
  },
  data: () => ({
    isValid: false,
    question: "",
    info: "",
    options: []
  }),
  methods: {
    submit() {
      this.$emit("submit", {
        question: this.question,
        info: this.info,
        options: this.options
      });

      this.options = [];
      this.$refs.questionForm.reset();
    },
    addOption(option) {
      this.options.push(option);
    }
  }
};
</script>
