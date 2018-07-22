<template>
  <v-flex>
    <h1 v-if="hasQuestions()" class="subheading ma-2 display-1">Tópicos</h1>

    <v-list v-for="(question, i) in questions" :key="i">
      <v-list-group>
        <v-list-tile slot="activator">
          <v-list-tile-content>
              <v-list-tile-title>{{question.question}}</v-list-tile-title>
              <v-list-tile-sub-title>{{question.info}}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action
            v-if="showAction"
            @click.stop="$emit('action-click', i)"
          >
            <v-icon>{{actionIcon}}</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <options-list :options="question.options"></options-list>
      </v-list-group>
    </v-list>
  </v-flex>
</template>

<script>
import OptionsList from "./OptionsList.vue";

export default {
  name: "questions-list",
  props: ["questions", "showAction", "actionIcon"],
  components: {
    OptionsList
  },
  methods: {
    hasQuestions() {
      return !!(this.questions && this.questions.length);
    }
  }
};
</script>
