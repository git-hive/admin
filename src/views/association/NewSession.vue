<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">Create Session</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" @submit="submit" v-model="isValid" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <inline-date-picker
                  label="Start Date"
                  v-model="startsAtDate"
                  :rules="startDateRules"
                  required
                />
              </v-flex>
              <v-flex xs12 sm6>
                <inline-time-picker
                  label="Start time"
                  v-model="startsAtTime"
                  :rules="[v => !!v || 'Start Time is required']"
                  required
                />
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 sm6>
                <inline-date-picker
                  label="End Date"
                  v-model="endsAtDate"
                  :rules="endDateRules"
                  required
                />
              </v-flex>
              <v-flex xs12 sm6>
                <inline-time-picker
                  label="End time"
                  v-model="endsAtTime"
                  :rules="[v => !!v || 'End Time is required']"
                  required
                />
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-switch
                  label="General"
                  v-model="isGeneral"
                  required
                ></v-switch>
              </v-flex>
              <v-flex xs12 sm6>
                <v-switch
                  label="Ordinary"
                  v-model="isOrdinary"
                  required
                ></v-switch>
              </v-flex>
            </v-layout>

            <span class="headline">Agendas</span>

            <v-expansion-panel class="my-4">
              <v-expansion-panel-content
                v-for="(agenda, i) in agendas"
                :key="i"
              >
                <div slot="header">{{agenda.title}}</div>
                <v-card>
                  <v-card-text>{{agenda.content}}</v-card-text>
                  <v-btn color="error" @click="removeAgenda(i)">Remove agenda</v-btn>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <agenda-form
              @submit="handleAgendaSubmit"
            ></agenda-form>

            <v-btn type="submit" class="mt-5">Create session</v-btn>
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
import InlineDatePicker from "@/components/InlineDatePicker.vue";
import InlineTimePicker from "@/components/InlineTimePicker.vue";
import AgendaForm from "@/components/AgendaForm.vue";

export default {
  name: "session-form",
  components: {
    InlineDatePicker,
    InlineTimePicker,
    AgendaForm
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
      v => !!v | "Start Date is required",
      v =>
        (!!v && new Date(v.split("-")) > new Date()) || "Should be after today"
    ],
    endDateRules: [
      v => !!v || "End date id required",
      v =>
        (!!v && new Date(v.split("-")) > new Date()) || "Should be after today"
    ]
  }),
  methods: {
    submit() {
      if (this.agendas.length === 0) {
        this.showSnackBar("Add an agenda first");
        return;
      }

      if (this.$refs.form.validate()) {
        this.$emit("submit", {
          startsAt: this.getDate(this.startsAtDate, this.startsAtTime),
          endsAt: this.getDate(this.endsAtDate, this.endsAtTime),
          isGeneral: this.isGeneral,
          isOrdinary: this.isOrdinary,
          agendas: this.agendas
        });

        this.$refs.form.reset();
      }
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
