<template>
  <v-flex>
    <h1 class="subheading ml-2">Tópicos</h1>
    <v-expansion-panel v-for="(question, i) in questions" :key="i">
      <v-expansion-panel-content>
        <v-list slot="header">
          <h3>{{question.question}}</h3>
          <span>{{question.info}}</span>
        </v-list>
        <v-card>
        <options-list :options="question.options"></options-list>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
</template>

<script>
import OptionsList from "./OptionsList.vue";

export default {
  name: "questions-list",
  props: ["questions"],
  components: {
    OptionsList
  }
};
</script>
