<template>
  <v-container>
    <v-flex>
      <table>
        <tbody>
          <tr>
            <td class="body-2">Nome:</td>
            <td>{{memberRequest.get("name")}}</td>
          </tr>

          <tr>
            <td class="body-2">Email:</td>
            <td>{{memberRequest.get("email")}}</td>
          </tr>

          <tr>
            <td class="body-2">CPF:</td>
            <td>{{memberRequest.get("cpf")}}</td>
          </tr>

          <tr>
            <td class="body-2">Data da requisição:</td>
            <td>{{(new Date(memberRequest.get("date"))).toLocaleString()}}</td>
          </tr>
        </tbody>
      </table>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: "member-request-tile",
  props: ["memberRequest"]
};
</script>

<style scoped>
td {
  padding-left: 1em;
}
</style>
