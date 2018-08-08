<template>
  <v-form ref="questionForm">
    <v-text-field
      v-model="question"
      label="Título"
      v-validate="'required'"
      data-vv-name="title"
      :error-messages="errors.collect('title')"
      required
    ></v-text-field>
    <v-textarea
      v-model="info"
      label="Descrição"
      v-validate="'required'"
      data-vv-name="description"
      :error-messages="errors.collect('description')"
      required
    ></v-textarea>

    <div v-if="options.length > 0">
      <options-list
        :options="options"
        show-action="true"
        action-icon="delete_forever"
        @actionClick="removeOption"
      ></options-list>

      <v-btn
        v-if="options.length > 1"
        @click="submit"
      >Criar tópico</v-btn>
    </div>
  </v-form>
</template>

<script>
import OptionsList from "./question/OptionsList.vue";

export default {
  name: "agenda-question-form",
  props: {
    options: Array
  },
  components: {
    OptionsList
  },
  data: () => ({
    question: "",
    info: ""
  }),
  methods: {
    async submit() {
      if (!(await this.formIsValid())) return;

      this.$emit("submit", {
        question: this.question,
        info: this.info,
        options: this.options,
        agendaRef: null,
        sessionRef: null,
        winningOption: null
      });

      this.$refs.questionForm.reset();
      this.clearForm();
    },
    clearForm() {
      this.question = "";
      this.info = "";
      this.$validator.reset();
    },
    removeOption(index) {
      this.$emit("remove-option", index);
    },
    async formIsValid() {
      const vValidateValid = await this.$validator.validateAll();
      const moreThanOneOption = this.options.length > 1;
      return vValidateValid && moreThanOneOption;
    }
  }
};
</script>
