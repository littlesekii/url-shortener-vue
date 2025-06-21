<script setup>
import UrlFormComponent from "@/components/UrlFormComponent.vue";
import LineChartComponent from "@/components/LineChartComponent.vue";
import NotificationTrayComponent from "@/components/Notification/NotificationTrayComponent.vue";

import { computed, reactive, ref, useTemplateRef } from "vue";

import LOADING_ICON from "@/assets/icons/loading.svg";
import LOGO_DARK_ICON from "@/assets/icons/logo_dark.gif";
import LOGO_LIGHT_ICON from "@/assets/icons/logo_light.gif";

import http from "@/utils/http";

const notificationTrayRef = useTemplateRef("notification-tray");

const LOGO_ICON = computed(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? LOGO_DARK_ICON : LOGO_LIGHT_ICON);

const isLoading = ref(false);
const isReady = ref(false);

const shortUrlAnalytics = reactive({
  shortUrl: "",
  targetUrl: "",
  createdAt: 0,
  clicks: 0,
  interactions: {
    label: [],
    value: []
  }
}); 
  
async function analyzeURL(shortUrl) {

  if (shortUrl === "") {
    notificationTrayRef.value.notify(false, "URL cannot be empty");
    return;
  }

  if (
    !(shortUrl.indexOf(import.meta.env.VITE_SERVER_URL) > -1) && 
    !(shortUrl.indexOf("sh.linky.cat/") > -1) && 
    !(shortUrl.indexOf("shorturl.linky.cat/") > -1)
  ) {
    notificationTrayRef.value.notify(false, "Invalid shortened URL");
    return;
  }

  let shortUrlHash = shortUrl.trim();
  shortUrlHash = shortUrl.replace("https://", "");
  

  shortUrlHash = shortUrlHash.replace("sh.linky.cat/", "");
  shortUrlHash = shortUrlHash.replace("shorturl.linky.cat/", "");

  //dev
  shortUrlHash = shortUrlHash.replace("http://", "");
  shortUrlHash = shortUrlHash.replace("localhost:1001/", "");

  if (shortUrlHash === "") {
    notificationTrayRef.value.notify(false, "Invalid shortened URL");
    return;
  }

  isReady.value = false;
  isLoading.value = true;
  
  let res; 
  res = await http.async.get(`/api/shorturl/${shortUrlHash}`);

  if (!res.ok) {
    notificationTrayRef.value.notify(false, "Shortened URL not found");
    isLoading.value = false;
    return;
  }

  const shortUrlData = await res.json();

  res = await http.async.get(`/api/interaction/${shortUrlData.id}`);
  const shortUrlInteractionData = await res.json();

  res = await http.async.get(`/api/interaction/chart/day/${shortUrlData.id}?day=2002-04-13`);
  const shortUrlInteractionChartDayData = await res.json();

  shortUrlAnalytics.shortUrl = shortUrlData.shortUrl;
  shortUrlAnalytics.targetUrl = shortUrlData.targetUrl;
  shortUrlAnalytics.clicks = shortUrlInteractionData.length.toLocaleString();
  shortUrlAnalytics.createdAt = new Date(shortUrlData.createdAt).toLocaleDateString(
    navigator.language || "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }
  );

  shortUrlAnalytics.interactions.label = shortUrlInteractionChartDayData.label;
  shortUrlAnalytics.interactions.value = shortUrlInteractionChartDayData.value;


  isLoading.value = false;
  isReady.value = true;
}



</script>

<template>
  <header class="container title flex f-column ">
      <a href="/"><h1>URL Shortener</h1></a>
      <i>by Linky Cat™</i> 
  </header>

  <main class="container main flex f-column f-centered">

    <section class="section-form flex f-column f-centered">
      <div class="form-intro">
        <p>Paste the URL to be analyzed.</p>
      </div>
      <img class="loading" :src="LOADING_ICON" alt="" v-if="isLoading">
      <UrlFormComponent @click="analyzeURL" type="analytics" ref="urlshortener-input" v-if="!isLoading"/>
      <div class="form-intro">
        <p>Track useful data from your shortened URL.</p>
      </div>
    </section>

    <section class="section-analytics flex f-column f-centered" v-if="isReady" >
      
      <h2>Analytics</h2>

      <div class="analytics-info flex f-column f-centered">
        <p>Shortened URL</p>
        <a :href="shortUrlAnalytics.shortUrl" target="_blank">
            {{ shortUrlAnalytics.shortUrl }}
        </a>

        <p>Target URL</p>
        <a :href="shortUrlAnalytics.targetUrl" target="_blank">
            {{ shortUrlAnalytics.targetUrl  }}
        </a>

        <p>Shortened at</p>
        {{ shortUrlAnalytics.createdAt }}
      </div>
      

      <h3>Your shortened URL got {{ shortUrlAnalytics.clicks }} clicks.</h3>
      <LineChartComponent class="analytics-chart" :data="shortUrlAnalytics.interactions"  />
      <p><span>Hover the graphic to see detailed info.</span></p>
    </section>
  </main>

  <footer class="footer flex f-centered" >
      <img title="Linky Cat" class="linkycat-logo" :src="LOGO_ICON" alt="Linky Cat logo, a cat moving it's tail.">
  </footer>
  <NotificationTrayComponent ref="notification-tray" />
</template>

<style scoped>

.container {
  max-width: 615px;
  width: 95%;
  margin: auto;
}

.title {
  margin-top: 50px;
  padding: 20px;

  align-items: center;

  a {
    color: var(--color-text);
  }
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

main {
  section {
    /* border: 1px solid black; */
    /* margin-bottom: 100px; */
  }
}

.section-form  {
  width: 100%;

  margin-top: 50px;
  padding: 20px 25px;

  border-radius: 10px;

  background-color: var(--color-container);
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
}

.form-intro:first-child {
  margin-bottom: 20px;
  text-align: center;
}

.form-intro:last-child {
  margin-top: 20px;
  text-align: center;
}

.section-analytics {
  width: 100%;
  margin-top: 20px;
  text-align: center;

  h2, h3, p {
    text-align: center;
  }
  h3 {
    margin-top: 10px;
  }
  p {
    margin-top: 10px;

    span {
      font-size: 10pt;

    }
  }

  .analytics-info {
    width: inherit;
    margin: 15px 0px;
  }

  .analytics-chart {
    margin-top: 25px;
  }
}

.loading {
  width: 42px;
}

.footer {
  width: 100%;
  padding: 20px 0;

  .linkycat-logo {
    width: 40px;
    /* margin-left: -15px; */
  }
}

a {
  text-decoration: none;
  color: var(--color-link);
}

</style>
