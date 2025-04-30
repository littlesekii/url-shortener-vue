<script setup>
import UrlFormComponent from "@/components/UrlFormComponent.vue";

import logo_dark from "@/assets/icons/logo-dark.gif";
import logo_light from "@/assets/icons/logo-light.gif";

import { computed, ref } from "vue";
import http from "@/utils/http";

const BASE_URL = "https://url-shortener-api-yand.onrender.com";

const logo = computed(() => {
  return (window.matchMedia("(prefers-color-scheme: dark)").matches) ? logo_dark : logo_light;
});

const urlShortened = ref("");

function shortenUrl(url) {
  const body = {urlDest: url};

  http.post("/short", JSON.stringify(body))
    .then(res => res.json())
    .then(data => {
      urlShortened.value = data.urlRef.replace("http://localhost:1001/", "sh.linky.cat/");
    });
} 

function copyUrl(url) {
  navigator.clipboard.writeText(url);
}

</script>

<template>
  <header class="container title flex f-column ">
      <h1>URL Shortener</h1>
      <i>by Linky Cat™</i>
    
  </header>
  <main class="container flex f-column f-centered">
    <section class="container">
      <UrlFormComponent @click="shortenUrl" type="shorten" v-if="!urlShortened" />
      <UrlFormComponent @click="copyUrl" type="shortened" :value="urlShortened" v-else />
    </section>
  </main>
  <footer class="footer flex f-centered" >
      <img title="Linky Cat" class="linkycat-logo" :src="logo" alt="Linky Cat logo, a cat moving it's tail.">
  </footer>
</template>

<style scoped>

section:first-of-type {
  /* padding-bottom: 200px; */
}

.container {
  max-width: 1040px;
  width: 98%;
  margin: auto;
}

.title {
  margin-top: -100px;

  padding: 25px;

  h1 {
    text-align: center;

    font-size: 28pt;
    font-weight: 500;
  }
  i {
    text-align: center;
    margin-top: -5px;
    /* margin-left: -160px; */
    font-size: 10pt;
  }
}

.footer {
  width: 100%;
  padding: 20px 0;

  position: absolute;
  bottom: 0px;
}
.linkycat-logo {
  width: 40px;
  /* margin-left: -15px; */
}
</style>
