<script setup>
import UrlFormComponent from "@/components/UrlFormComponent.vue";


</script>

<template>
  <main class="container flex f-column">
    <h1 class="title">
      Url Shortener
    </h1>

    <UrlFormComponent button-text="Encurtar" />
  </main>
</template>

<style scoped>

.title {
  text-align: center;
}

.container {
  width: 1040px;
  max-width: 90%;
  margin: auto;
}
</style>
