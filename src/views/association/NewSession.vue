<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline primary--text">Criar assembléia</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>

          <v-layout>
            <v-flex md6 text-xs-center>
              <v-flex xs12>
                <h1 class="primary--text">Início</h1>
              </v-flex>
            </v-flex>
            <v-flex md6 text-xs-center>
              <v-flex xs12>
                <h1 class="primary--text">Término</h1>
              </v-flex>
            </v-flex>
          </v-layout>

          <v-form
            ref="form"
            @submit.prevent="submit"
            v-model="isValid"
            lazy-validation
          >
            <v-layout>
              <v-flex xs12 sm6>
                <inline-date-picker
                  ref="startDate"
                  label="Data de início"
                  v-model="startsAtDate"
                  v-validate="'required|date_format:YYYY-MM-DD|before:endDate'"
                  data-vv-name="startDate"
                  :error-messages="errors.collect('startDate')"
                />
                <inline-time-picker
                  label="Horário de início"
                  v-model="startsAtTime"
                  v-validate="'required'"
                  data-vv-name="startTime"
                  :error-messages="errors.collect('startTime')"
                />
              </v-flex>
              <v-flex xs12 sm6>
                <inline-date-picker
                  ref="endDate"
                  label="Data de término"
                  v-model="endsAtDate"
                  v-validate="'required|date_format:YYYY-MM-DD|after:startDate'"
                  data-vv-name="endDate"
                  :error-messages="errors.collect('endDate')"
                />
                <inline-time-picker
                  label="Horário de término"
                  v-model="endsAtTime"
                  v-validate="'required'"
                  data-vv-name="endTime"
                  :error-messages="errors.collect('endTime')"
                />
              </v-flex>
            </v-layout>

            <v-flex xs12>
              <v-switch
                label="Geral"
                v-model="isGeneral"
                required
              ></v-switch>
            </v-flex>
            <v-flex xs12>
              <v-switch
                label="Ordinária"
                v-model="isOrdinary"
                required
              ></v-switch>
            </v-flex>

            <div v-if="agendas.length > 0">
              <h1 class="headline">Pautas</h1>

              <agendas-list
                :agendas="agendas"
                @remove-agenda="removeAgenda"
              ></agendas-list>
            </div>

            <create-agenda-dialog
              @new-agenda="handleAgendaSubmit"
            ></create-agenda-dialog>

            <br>

            <v-btn
              v-if="this.agendas.length > 0"
              type="submit"
              class="mt-5"
            >Criar assembléia</v-btn>
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
import dictionary from "../../locale/veeValidateDisctionay.js";
import { mapState } from "vuex";

import InlineDatePicker from "@/components/InlineDatePicker.vue";
import InlineTimePicker from "@/components/InlineTimePicker.vue";
import CreateAgendaDialog from "../association/sessions/CreateAgendaDialog";
import AgendasList from "@/components/session/agenda/AgendasList.vue";
import { addAssociationSession } from "@/firebase/firestore/associations/sessions";

export default {
  name: "session-form",
  $_veeValidate: {
    validator: "new"
  },
  components: {
    InlineDatePicker,
    InlineTimePicker,
    CreateAgendaDialog,
    AgendasList
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
    snackBarText: ""
  }),
  computed: {
    ...mapState(["selectedAssociation"]),
    startsAt: function() {
      return this.getDate(this.startsAtDate, this.startsAtTime);
    },
    endsAt: function() {
      return this.getDate(this.endsAtDate, this.endsAtTime);
    }
  },
  mounted() {
    this.$validator.localize("pt_BR", dictionary);
  },
  methods: {
    submit() {
      if (!this.$validator.validateAll()) return;
      if (this.agendas.length === 0) {
        this.showSnackBar("Add an agenda first");
        return;
      }

      const isGeneral = this.isGeneral;
      const isOrdinary = this.isOrdinary;
      const agendas = this.agendas;

      addAssociationSession(this.selectedAssociation.id, {
        ordinary: isOrdinary,
        general: isGeneral,
        startsAt: Number(this.startsAt),
        endsAt: Number(this.endsAt),
        agendasNum: agendas.length,
        associationRef: this.selectedAssociation.ref,
        status: "future",
        agendas
      });

      this.agendas = [];
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
