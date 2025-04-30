<script setup>
import { /*RouterLink, */ RouterView } from "vue-router";
import { inject } from "@vercel/analytics"
import { computed } from "@vue/reactivity";

computed(() => inject());

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
