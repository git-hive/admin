<template>
  <v-card>
    <v-card-title>
      <span class="headline">Files</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" lazy-validation>
          <v-layout row wrap>
            <v-flex xs12 sm12>
              <v-text-field
                v-model="file_name"
                label="File name"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm12>
              <input type="file" @change="handleFileChange" required>
            </v-flex>
          </v-layout>
          <v-btn @click="submit">Submit</v-btn>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: "FileForm",
  data: () => ({
    file: File,
    file_name: ""
  }),
  methods: {
    handleFileChange(e) {
      var file = e.target.files[0];
      this.file = file;
      this.file_name = file.name;
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("submit", {
          file: this.file,
          file_name: this.file_name
        });
      }
      this.clear();
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
