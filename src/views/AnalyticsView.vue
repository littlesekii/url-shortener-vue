<script setup>
import UrlFormComponent from "@/components/UrlFormComponent.vue";
import LineChartComponent from "@/components/LineChartComponent.vue";

import { computed, onMounted, reactive, ref, useTemplateRef } from "vue";

import LOGO_DARK_ICON from "@/assets/icons/logo_dark.gif";
import LOGO_LIGHT_ICON from "@/assets/icons/logo_light.gif";

import router from "@/router";

import http from "@/utils/http";

const LOGO_ICON = computed(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? LOGO_DARK_ICON : LOGO_LIGHT_ICON);

const interactions = reactive({
  label: [],
  value: []
});

onMounted(async () => {
  //remove path prefix and get the short url hash
  const shortUrlHash = router.currentRoute.value.path.replace("/analytics/", "");

  let res; 
  
  res = await http.async.get(`/api/shorturl/${shortUrlHash}`);
  const shortUrlData = await res.json();

  res = await http.async.get(`/api/interaction/chart/day/${shortUrlData.id}?day=2002-04-13`);
  const shortUrlInteractionData = await res.json();

  console.log(shortUrlInteractionData);

  interactions.label = shortUrlInteractionData.label;
  interactions.value = shortUrlInteractionData.value;


  // http.post(`/api/interaction/${shortUrlHash}`, JSON.stringify(body))
  //   .then(res => { 
  //     if (res.ok) { return res.json(); }
  //     else {
  //       throw new Error();
  //     }    
  //   })
  //   .then(data => {
  //     shortenedUrl.value = data.shortUrl;
      
  //     isLoading.value = false;
  //     isReady.value = true;
  //     notificationTrayRef.value.notify(true, "URL shortened");
  //   })
  //   .catch(() => {
  //     isLoading.value = false;
  //     isReady.value = false;
  //     notificationTrayRef.value.notify(false, "Invalid URL");
  //   });
});




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
      <UrlFormComponent @click="" type="analytics" ref="urlshortener-input"/>

      <div class="form-intro">
        <p>Track useful data from your shortened URL.</p>
      </div>
    </section>

    <LineChartComponent :data="interactions" />
  </main>

  <footer class="footer flex f-centered" >
      <img title="Linky Cat" class="linkycat-logo" :src="LOGO_ICON" alt="Linky Cat logo, a cat moving it's tail.">
  </footer>
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
