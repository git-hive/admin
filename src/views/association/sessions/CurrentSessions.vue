<template>
  <sessions-list
    heading="Correntes"
    status-filter="current"
  ></sessions-list>
</template>

<script>
import SessionsList from "@/components/session/SessionsList.vue";

export default {
  name: "future-sessions",
  components: { SessionsList }
};
</script>
