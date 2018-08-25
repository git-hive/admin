<template>
  <v-card>
    <v-card-title>
      <span class="headline">Novo informe</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form
          ref="form"
          @submit.prevent="submit"
          v-model="isFormValid"
          lazy-validation
        >
          <v-layout row wrap>
            <v-flex xs12 sm12>
              <v-text-field
                v-model="content"
                label="Conteúdo do informe"
                v-validate="'required'"
                data-vv-name="content"
                :error-messages="errors.collect('content')"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <inline-date-picker
                ref="startDate"
                label="Visível a partir de"
                v-model="startsAtDate"
                v-validate="'required|date_format:YYYY-MM-DD|before:endDate'"
                data-vv-name="startDate"
                :error-messages="errors.collect('startDate')"
              />
            </v-flex>
            <v-flex xs12 sm6>
              <inline-date-picker
                ref="endDate"
                label="Visível até"
                v-model="endsAtDate"
                v-validate="'required|date_format:YYYY-MM-DD|after:startDate'"
                data-vv-name="endDate"
                :error-messages="errors.collect('endDate')"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <p v-if="date_error" class="red--text">Data de início precisa ser antes do término!!</p>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm12>
              <v-switch
                label="Visível"
                v-model="isShowing"
                required
              ></v-switch>
            </v-flex>
          </v-layout>
          <v-btn type="submit">Criar informe</v-btn>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import InlineDatePicker from "@/components/InlineDatePicker.vue";

export default {
  name: "ReportForm",
  $_veeValidate: {
    validator: "new"
  },
  components: {
    InlineDatePicker
  },
  data: () => ({
    isFormValid: false,
    content: "",
    startsAtDate: null,
    endsAtDate: null,
    isShowing: false
  }),
  methods: {
    async submit() {
      this.isFormValid = await this.$validator.validateAll();
      if (!this.isFormValid) return;

      this.$emit("submit", {
        description: this.content,
        startsAt: this.getDate(this.startsAtDate),
        endsAt: this.getDate(this.endsAtDate),
        isShowing: this.isShowing
      });

      this.$refs.form.reset();
      this.$validator.reset();
    },
    getDate(date) {
      return new Date(...date.split("-"));
    }
  }
};
</script>
