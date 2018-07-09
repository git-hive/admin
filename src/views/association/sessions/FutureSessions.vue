<template>
  <sessions-list
    heading="Futuras"
    status-filter="future"
  ></sessions-list>
</template>

<script>
import SessionsList from "./SessionsList.vue";

export default {
  name: "future-sessions",
  components: { SessionsList }
};
</script>
