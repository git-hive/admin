<template>
  <v-dialog v-model="dialog">
    <v-flex slot="activator">
      <v-btn
        fab
        color="primary ml-0"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <span
        class="primary--text headline add-agenda-headline"
      >Adicionar pauta</span>
    </v-flex>

    <v-card class="pa-4 text">

      <v-tabs v-model="activeTab">
        <v-tab>pautas</v-tab>
        <v-tab :disabled="activeTab < QUESTION_TAB">tópicos</v-tab>
        <v-tab :disabled="activeTab < OPTION_TAB">opções</v-tab>

        <v-tab-item id="agenda">
          <v-btn
            color="primary"
            class="mx-0 my-4"
            @click="handleAddQuestionClick"
          >adicionar tópico</v-btn>
          <agenda-form
            :questions="questions"
            @submit="addAgenda"
            @remove-quesiton="removeQuestion"
          >
          </agenda-form>
        </v-tab-item>
        <v-tab-item id="session">
          <v-btn
            color="primary"
            class="mx-0 my-4"
            @click="handleAddOptionClick"
          >adicionar opção</v-btn>
          <agenda-question-form
            :options="options"
            @submit="addQuestionToAgenda"
            @remove-option="removeOption"
          >
          </agenda-question-form>
        </v-tab-item>
        <v-tab-item id="option">
          <question-options-form @submit="addOption">
          </question-options-form>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
import AgendaForm from "@/components/session/agenda/AgendaForm.vue";
import AgendaQuestionForm from "@/components/session/agenda/AgendaQuestionForm.vue";
import QuestionOptionsForm from "@/components/session/agenda/QuestionOptionsForm.vue";

export default {
  name: "create-agenda-dialog",
  components: {
    AgendaForm,
    AgendaQuestionForm,
    QuestionOptionsForm
  },
  data() {
    return {
      dialog: false,
      activeTab: null,
      questions: [],
      options: []
    };
  },
  computed: {
    AGENDA_TAB: function() {
      return 0;
    },
    QUESTION_TAB: function() {
      return 1;
    },
    OPTION_TAB: function() {
      return 2;
    }
  },
  methods: {
    addAgenda(agenda) {
      this.$emit("new-agenda", agenda);
      this.clearQuestions();
      this.clearOptions();
      this.dialog = false;
    },
    addQuestionToAgenda(question) {
      this.questions.push(question);
      this.options = [];
      this.activeTab = this.AGENDA_TAB;
    },
    addOption(option) {
      this.options.push(option);
      this.activeTab = this.QUESTION_TAB;
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
    },
    removeOption(index) {
      this.options.splice(index, 1);
    },
    clearQuestions() {
      this.questions = [];
    },
    clearOptions() {
      this.options = [];
    },
    handleAddQuestionClick() {
      this.clearOptions();
      this.activeTab = this.QUESTION_TAB;
    },
    handleAddOptionClick() {
      this.activeTab = this.OPTION_TAB;
    }
  }
};
</script>


<style scoped>
.add-agenda-headline {
  vertical-align: middle;
}
</style>
