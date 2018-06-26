<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">Criar assembléia</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" @submit="submit" v-model="isValid" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <inline-date-picker
                  label="Data de início"
                  v-model="startsAtDate"
                  :rules="startDateRules"
                  required
                />
              </v-flex>
              <v-flex xs12 sm6>
                <inline-time-picker
                  label="Horário de início"
                  v-model="startsAtTime"
                  :rules="[v => !!v || 'Campo obrigatório']"
                  required
                />
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 sm6>
                <inline-date-picker
                  label="Data de término"
                  v-model="endsAtDate"
                  :rules="endDateRules"
                  required
                />
              </v-flex>
              <v-flex xs12 sm6>
                <inline-time-picker
                  label="Horário de término"
                  v-model="endsAtTime"
                  :rules="[v => !!v || 'Campo obrigatório']"
                  required
                />
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-switch
                  label="Geral"
                  v-model="isGeneral"
                  required
                ></v-switch>
              </v-flex>
              <v-flex xs12 sm6>
                <v-switch
                  label="Ordinária"
                  v-model="isOrdinary"
                  required
                ></v-switch>
              </v-flex>
            </v-layout>

            <h1 class="headline">Pautas</h1>

            <v-expansion-panel class="my-4">
              <v-expansion-panel-content
                v-for="(agenda, i) in agendas"
                :key="i"
              >
                <div slot="header">
                  <h3>{{agenda.title}}</h3>
                </div>
                <v-card>
                  <v-card-text>{{agenda.content}}</v-card-text>
                  <questions-list :questions="agenda.questions">
                  </questions-list>
                  <v-btn color="error" @click="removeAgenda(i)">
                    Remover pauta
                  </v-btn>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <agenda-form @submit="handleAgendaSubmit"></agenda-form>

            <v-btn type="submit" class="mt-5">Criar assembléia</v-btn>
          </v-form>
        </v-container>
      </v-card-text>

      <v-snackbar class="my-5 mx-5" v-model="snackbar" right>
        {{snackBarText}}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import InlineDatePicker from "@/components/InlineDatePicker.vue";
import InlineTimePicker from "@/components/InlineTimePicker.vue";
import AgendaForm from "@/components/session/agenda/AgendaForm.vue";
import QuestionsList from "@/components/session/agenda/question/QuestionsList.vue";
import { addAssociationSession } from "../../firebase/firestore/associations/sessions";

export default {
  name: "session-form",
  components: {
    InlineDatePicker,
    InlineTimePicker,
    AgendaForm,
    QuestionsList
  },
  data: () => ({
    isValid: false,
    startsAtDate: null,
    startsAtTime: null,
    endsAtDate: null,
    endsAtTime: null,
    isGeneral: false,
    isOrdinary: false,
    agendas: [],
    snackbar: false,
    snackBarText: "",
    startDateRules: [
      v => !!v | "Campo obrigatório",
      v =>
        (!!v && new Date(v.split("-")) > new Date()) ||
        "Deve ser depois de hoje"
    ],
    endDateRules: [
      v => !!v || "Campo obrigatório",
      v =>
        (!!v && new Date(v.split("-")) > new Date()) ||
        "Deve ser depois de hoje"
    ]
  }),
  computed: {
    ...mapState(["selectedAssociation"]),
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;
      if (this.agendas.length === 0) {
        this.showSnackBar("Add an agenda first");
        return;
      }

      const startsAt = this.getDate(this.startsAtDate, this.startsAtTime);
      const endsAt = this.getDate(this.endsAtDate, this.endsAtTime);
      const isGeneral = this.isGeneral;
      const isOrdinary = this.isOrdinary;
      const agendas = this.agendas;

      addAssociationSession(this.selectedAssociation.id, {
        ordinary: isOrdinary,
        general: isGeneral,
        startsAt: Number(startsAt),
        endsAt: Number(endsAt),
        agendasNum: agendas.length,
        associationRef: this.selectedAssociation.ref,
        status: "current",
        agendas
      });

      this.$refs.form.reset();
    },
    getDate(date, time) {
      const [year, month, day] = date.split("-");
      const [hour, minute] = time.split(":");

      return new Date(year, month, day, hour, minute);
    },
    handleAgendaSubmit(agenda) {
      this.agendas.push(agenda);
    },
    removeAgenda(i) {
      this.agendas.splice(i, 1);
    },
    showSnackBar(text) {
      this.snackBarText = text;
      this.snackbar = true;
    }
  }
};
</script>
