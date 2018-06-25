<template>
  <v-container elevation-4 class="pa-0">
    <v-dialog v-model="dialog">
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
            <v-list-tile-action>
              <v-dialog v-model="delete_dialog" persistent max-width="290">
                <v-btn slot="activator" color="red" dark>Deletar
                  <v-icon dark right>delete</v-icon>
                </v-btn>
                <v-card>
                  <v-card-title class="headline">Tem certeza que quer deletar o arquivo?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="deleteFile({fileID: file.id})">Deletar</v-btn>
                    <v-btn color="green darken-1" flat @click.native="delete_dialog = false">Cancelar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-tile-action>
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
  uploadAssociationFile,
  deleteAssociationFile
} from "@/firebase/firestore/associations/files";

import FileForm from "@/components/FileForm.vue";

export default {
  name: "files",
  components: { FileForm },
  data: () => ({
    files: [],
    dialog: false,
    delete_dialog: false
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
      this.fetchFilesAndSet();
      this.dialog = false;
    },
    async fetchFilesAndSet() {
      this.files = await getAllAssociationFileSnaps(this.selectedAssociation.id);
    },
    async deleteFile({fileID}){
      deleteAssociationFile(this.selectedAssociation.id, fileID);
      this.fetchFilesAndSet();
      this.delete_dialog = false;
    }
  }
};
</script>
