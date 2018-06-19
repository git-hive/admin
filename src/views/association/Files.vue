<template>
  <v-container elevation-4 class="pa-0">
    <v-dialog>
      <v-tooltip slot="activator" left>
        <v-btn slot="activator" color="primary" fixed fab bottom right>
          <v-icon>add</v-icon>
        </v-btn>
        <span>Upload file</span>
      </v-tooltip>

    <file-form @submit="handleFileUpload"/>

    </v-dialog>

    <v-tabs fixed-tabs>
      <v-tab>Files</v-tab>
      <v-tab-item>
        <v-list>
          <v-list-tile v-for="file in files" :key="file.id" @click="() => {}">
            <v-list-tile-content>
              <v-list-tile-title>{{file.get("name")}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import {
  getAllAssociationFileSnaps,
  uploadAssociationFile
} from "@/firebase/firestore/associations/files";

import FileForm from "@/components/FileForm.vue";

export default {
  name: "files",
  components: { FileForm },
  data: () => ({
    files: []
  }),
  computed: {
    ...mapState(["selectedAssociation"])
  },
  mounted() {
    this.fetchFilesAndSet();
  },
  methods: {
    handleFileUpload({ file, file_name }) {
      uploadAssociationFile(file, file_name, this.selectedAssociation.id);
    },
    async fetchFilesAndSet() {
      this.files = await getAllAssociationFileSnaps(this.selectedAssociation.id);
    }
  }
};
</script>
