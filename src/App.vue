<script setup>
import { /*RouterLink, */ RouterView } from "vue-router";
import { Analytics } from "@vercel/analytics/vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";

</script>

<template>
  <RouterView />
  <Analytics />
  <SpeedInsights />
</template>

<style scoped>

</style>
