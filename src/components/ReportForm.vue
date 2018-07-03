<template>
  <v-card>
    <v-card-title>
      <span class="headline">Report</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-model="isValid" lazy-validation>
          <v-layout row wrap>
            <v-flex xs12 sm12>
              <v-text-field
                v-model="description"
                label="Description"
                :rules="descriptionRules"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <inline-date-picker
                v-on:input="validDates"
                label="Start Date"
                v-model="startsAtDate"
                :rules="startDateRules"
                required
              />
            </v-flex>
            <v-flex xs12 sm6>
              <inline-date-picker
                v-on:input="validDates"
                label="End Date"
                v-model="endsAtDate"
                :rules="endDateRules"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <p v-if="date_error" class="red--text">Data de início precisa ser antes do término!!</p>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm12>
              <v-switch
                label="Showing"
                v-model="isShowing"
                required
              ></v-switch>
            </v-flex>
          </v-layout>
          <v-btn @click="submit">Submit</v-btn>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import InlineDatePicker from "@/components/InlineDatePicker.vue";

export default {
  name: "ReportForm",
  components: {
    InlineDatePicker
  },
  data: () => ({
    date_error: false,
    isValid: false,
    description: "",
    startsAtDate: null,
    endsAtDate: null,
    isShowing: false,
    descriptionRules: [
      v => !!v || "Description is required"
    ],
    startDateRules: [
      v => !!v || "Start Date is required",
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
    validDates(){
      if(!this.startsAtDate || !this.endsAtDate){
        this.date_error = false; 
      } else if ((new Date(this.startsAtDate.split("-")) > new Date(this.endsAtDate.split("-")))) {
        this.date_error = true;
        return false;
      } else {
        this.date_error = false;
      }
    },
    submit() {
      if(this.date_error){
        return;
      }
      if (this.$refs.form.validate()) {
        this.$emit("submit", {
          description: this.description,
          startsAt: this.getDate(this.startsAtDate),
          endsAt: this.getDate(this.endsAtDate),
          isShowing: this.isShowing
        });
      } else {
        this.isValid = false;
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    getDate(date) {
      const [year, month, day] = date.split("-");

      return new Date(year, month, day);
    }
  }
};
</script>
