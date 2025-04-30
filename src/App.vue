<script setup>
import { /*RouterLink, */ RouterView } from "vue-router";
import { Analytics } from "@vercel/analytics/react";
</script>

<template>
  <RouterView />
  <Analytics />
</template>

<style scoped>

</style>
