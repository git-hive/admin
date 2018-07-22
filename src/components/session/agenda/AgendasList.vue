<template>

  <v-list>
    <v-list-group v-for="(agenda, i) in agendas" :key="i">
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>{{ agenda.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{agenda.content}}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action @click.stop="$emit('remove-agenda', i)">
          <v-icon>
            delete_forever
          </v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <questions-list :questions="agenda.questions"></questions-list>
    </v-list-group>
  </v-list>
</template>

<script>
import QuestionsList from "@/components/session/agenda/question/QuestionsList.vue";

export default {
  name: "agendas-list",
  props: {
    agendas: Array
  },
  components: { QuestionsList }
};
</script>
