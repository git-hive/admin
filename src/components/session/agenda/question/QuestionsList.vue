<template>
  <v-flex>
    <h1 v-if="questions.length !== 0" class="subheading ml-2">Tópicos</h1>
    <v-expansion-panel v-for="(question, i) in questions" :key="i">
      <v-expansion-panel-content>
        <v-list slot="header">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{question.question}}</v-list-tile-title>
              <v-list-tile-sub-title>{{question.info}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action
              v-if="showAction"
              @click="$emit('actionClick', i)"
            >
              <v-icon>{{actionIcon}}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
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
  props: ["questions", "showAction", "actionIcon"],
  components: {
    OptionsList
  }
};
</script>
