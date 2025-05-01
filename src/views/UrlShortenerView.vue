<script setup>
import UrlFormComponent from "@/components/UrlFormComponent.vue";

import loading_icon from "@/assets/icons/loading.svg";
import logo_dark_icon from "@/assets/icons/logo-dark.gif";
import logo_light_icon from "@/assets/icons/logo-light.gif";

import { computed, ref, useTemplateRef } from "vue";
import http from "@/utils/http";
import NotificationTrayComponent from "@/components/Notification/NotificationTrayComponent.vue";

// const BASE_URL = "https://url-shortener-api-yand.onrender.com";

const notificationTray = useTemplateRef("notification-tray");

const logo_icon = computed(() => {
  return (window.matchMedia("(prefers-color-scheme: dark)").matches) ? logo_dark_icon : logo_light_icon;
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
      notificationTray.value.notify(true, "URL shortened");
    })
    .catch(() => {
      isLoading.value = false;
      isReady.value = false;
      notificationTray.value.notify(false, "Invalid URL");
    });
} 

function copyUrl(url) {
  navigator.clipboard.writeText(url);
  isReady.value = false;

  notificationTray.value.notify(true, "Copied URL to clipboard");
}

</script>

<template>
  <header class="container title flex f-column ">
      <h1>URL Shortener</h1>
      <i>by Linky Cat™</i>
    
  </header>
  <main class="container flex f-column f-centered">
    <section class="container flex f-column">
      <img class="loading" :src="loading_icon" alt="" v-if="isLoading">
      <UrlFormComponent @click="shortenUrl" ref="urlshortener-input" v-if="!isLoading && !isReady" />
      <UrlFormComponent @click="copyUrl" type="shortened" :value="urlShortened" v-if="isReady" />
    </section>
  </main>
  <footer class="footer flex f-centered" >
      <img title="Linky Cat" class="linkycat-logo" :src="logo_icon" alt="Linky Cat logo, a cat moving it's tail.">
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
  margin: auto;
  width: 40px;
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
