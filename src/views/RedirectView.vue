<script setup>
import router from "@/router";
import http from "@/utils/http";
import { ref } from "vue";

const urlRef = ref();
urlRef.value = router.currentRoute.value.path.replace("/", "");

http.get(`/short/${urlRef.value}`)
  .then(res => res.json())
  .then(data => window.location.replace(data.urlDest));

</script>

<template>
  <div>

  </div>
</template>

<style lang="scss" scoped>

</style>