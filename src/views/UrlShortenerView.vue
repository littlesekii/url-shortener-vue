<script setup>
import UrlFormComponent from "@/components/UrlFormComponent.vue";
import NotificationTrayComponent from "@/components/Notification/NotificationTrayComponent.vue";

import { computed, ref, useTemplateRef } from "vue";

import LOADING_ICON from "@/assets/icons/loading.svg";
import LOGO_DARK_ICON from "@/assets/icons/logo-dark.gif";
import LOGO_LIGHT_ICON from "@/assets/icons/logo-light.gif";

import http from "@/utils/http";

const notificationTrayRef = useTemplateRef("notification-tray");

const LOGO_ICON = computed(() => {
  return (window.matchMedia("(prefers-color-scheme: dark)").matches) ? LOGO_DARK_ICON : LOGO_LIGHT_ICON;
});

const urlShortened = ref("");
const isLoading = ref(false);
const isReady = ref(false);

function shortenUrl(url) {
  isLoading.value = true;

  const body = {urlDest: url};

  http.post("/short", JSON.stringify(body))
    .then(res => { 
      if (res.ok) { return res.json(); }
      else {
        throw new Error();
      }    
    })
    .then(data => {
      urlShortened.value = data.urlRef.replace("http://localhost:1001/", "https://sh.linky.cat/");
      
      isLoading.value = false;
      isReady.value = true;
      notificationTrayRef.value.notify(true, "URL shortened");
    })
    .catch(() => {
      isLoading.value = false;
      isReady.value = false;
      notificationTrayRef.value.notify(false, "Invalid URL");
    });
} 

function copyUrl(url) {
  navigator.clipboard.writeText(url);
  isReady.value = false;

  notificationTrayRef.value.notify(true, "Copied URL to clipboard");
}

</script>

<template>

  <header class="container title flex f-column ">
      <h1>URL Shortener</h1>
      <i>by Linky Cat™</i> 
  </header>

  <main class="container flex f-column f-centered">
    <section class="container flex f-column f-centered">
      <img class="loading" :src="LOADING_ICON" alt="" v-if="isLoading">
      <UrlFormComponent @click="shortenUrl" type="shorten" ref="urlshortener-input" v-if="!isLoading && !isReady" />
      <UrlFormComponent @click="copyUrl" type="shortened" :value="urlShortened" v-if="isReady" />
    </section>

    
  </main>

  <footer class="footer flex f-centered" >
      <img title="Linky Cat" class="linkycat-logo" :src="LOGO_ICON" alt="Linky Cat logo, a cat moving it's tail.">
  </footer>

  <NotificationTrayComponent ref="notification-tray" />
</template>

<style scoped>

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

.loading {
  width: 40px;
}

.footer {
  width: 100%;
  padding: 20px 0;

  position: absolute;
  bottom: 0px;

  .linkycat-logo {
    width: 40px;
    /* margin-left: -15px; */
  }
}

</style>
