<template>
  <v-card>
    <v-card-title>
      <span class="headline">Session</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-model="isValid" lazy-validation>
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
          <v-btn @click="submit">Submit</v-btn>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import InlineDatePicker from "@/components/InlineDatePicker.vue";
import InlineTimePicker from "@/components/InlineTimePicker.vue";

export default {
  name: "SessionForm",
  components: {
    InlineDatePicker,
    InlineTimePicker
  },
  data: () => ({
    isValid: false,
    startsAtDate: null,
    startsAtTime: null,
    endsAtDate: null,
    endsAtTime: null,
    isGeneral: false,
    isOrdinary: false,
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
      if (this.$refs.form.validate()) {
        this.$emit("submit", {
          startsAt: this.getDate(this.startsAtDate, this.startsAtTime),
          endsAt: this.getDate(this.endsAtDate, this.endsAtTime),
          isGeneral: this.isGeneral,
          isOrdinary: this.isOrdinary
        });
      } else {
        this.isValid = false;
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    getDate(date, time) {
      const [year, month, day] = date.split("-");
      const [hour, minute] = time.split(":");

      return new Date(year, month, day, hour, minute);
    }
  }
};
</script>
