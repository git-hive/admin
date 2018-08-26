<template>
  <sessions-list
    heading="Passadas"
    status-filter="ended"
  ></sessions-list>
</template>

<script>
import SessionsList from "@/components/session/SessionsList.vue";

export default {
  name: "future-sessions",
  components: { SessionsList }
};
</script>

