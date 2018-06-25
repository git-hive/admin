<template>
  <v-form ref="agendaForm">
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

    <questions-list :questions="questions"></questions-list>

    <v-btn @click="submit">Adicionar Pauta</v-btn>

    <agenda-question-form @submit="handleQuestionSubmit"></agenda-question-form>
  </v-form>
</template>

<script>
import QuestionsList from "./question/QuestionsList.vue";
import AgendaQuestionForm from "@/components/session/agenda/AgendaQuestionForm.vue";

export default {
  name: "agenda-form",
  components: {
    AgendaQuestionForm,
    QuestionsList
  },
  data: () => ({
    isValid: false,
    title: "",
    content: "",
    questions: []
  }),
  methods: {
    handleQuestionSubmit(question) {
      this.questions.push(question);
    },
    submit() {
      this.$emit("submit", {
        title: this.title,
        content: this.content,
        questions: this.questions,
        questionsNum: this.questions.length
      });

      this.questions = [];
      this.$refs.agendaForm.reset();
    }
  }
};
</script>
