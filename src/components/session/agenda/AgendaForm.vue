<template>
  <v-form ref="agendaForm">
    <v-text-field
      v-model="title"
      label="Título"
      required
    ></v-text-field>
    <v-textarea
      v-model="content"
      label="Subtítulo"
      required
    ></v-textarea>

    <questions-list
      :questions="questions"
      show-action="true"
      action-icon="delete_forever"
      @action-click="removeQuestion"
    ></questions-list>

    <v-btn
      v-if="questions.length > 0"
      @click="submit"
    >Criar Pauta</v-btn>
  </v-form>
</template>

<script>
import QuestionsList from "./question/QuestionsList.vue";

export default {
  name: "agenda-form",
  props: {
    questions: Array
  },
  components: {
    QuestionsList
  },
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
        forumPostRef: null,
        questionsNum: this.questions.length,
        requestRef: null,
        sessionRef: null,
        suggestedByRef: null
      });

      this.$refs.agendaForm.reset();
    },
    removeQuestion(index) {
      this.$emit("remove-question", index);
    }
  }
};
</script>
