<script setup>
import UrlFormComponent from "@/components/UrlFormComponent.vue";
import NotificationTrayComponent from "@/components/Notification/NotificationTrayComponent.vue";

import { computed, ref, useTemplateRef } from "vue";
import { useReCaptcha } from "vue-recaptcha-v3";

import LOADING_ICON from "@/assets/icons/loading.svg";
import LOGO_DARK_ICON from "@/assets/icons/logo_dark.gif";
import LOGO_LIGHT_ICON from "@/assets/icons/logo_light.gif";

import SHORTEN_EXAMPLE_PNG from "@/assets/images/shorten_example.png";
import SHORTEN_EXAMPLE_GIF from "@/assets/images/shorten_example.gif";
import SHARING_EXAMPLE_PNG from "@/assets/images/sharing_example.png";
import SHARING_EXAMPLE_GIF from "@/assets/images/sharing_example.gif";

import FRIENDLY_LIGHT_ICON from "@/assets/icons/friendly.svg";
import FRIENDLY_DARK_ICON from "@/assets/icons/friendly_dark.svg";
import SHORT_LIGHT_ICON from "@/assets/icons/short.svg";
import SHORT_DARK_ICON from "@/assets/icons/short_dark.svg";
import REUSABLE_LIGHT_ICON from "@/assets/icons/reusable.svg";
import REUSABLE_DARK_ICON from "@/assets/icons/reusable_dark.svg";
import FAST_LIGHT_ICON from "@/assets/icons/fast.svg";
import FAST_DARK_ICON from "@/assets/icons/fast_dark.svg";
import SECURE_LIGHT_ICON from "@/assets/icons/secure.svg";
import SECURE_DARK_ICON from "@/assets/icons/secure_dark.svg";
import ANALYSABLE_LIGHT_ICON from "@/assets/icons/analysable.svg";
import ANALYSABLE_DARK_ICON from "@/assets/icons/analysable_dark.svg";

import http from "@/utils/http";
import util from "@/utils/util";

const notificationTrayRef = useTemplateRef("notification-tray");

const LOGO_ICON       = computed(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? LOGO_DARK_ICON : LOGO_LIGHT_ICON);
const FRIENDLY_ICON   = computed(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? FRIENDLY_DARK_ICON : FRIENDLY_LIGHT_ICON);
const SHORT_ICON      = computed(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? SHORT_DARK_ICON : SHORT_LIGHT_ICON);
const REUSABLE_ICON   = computed(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? REUSABLE_DARK_ICON : REUSABLE_LIGHT_ICON);
const FAST_ICON       = computed(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? FAST_DARK_ICON : FAST_LIGHT_ICON);
const SECURE_ICON     = computed(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? SECURE_DARK_ICON : SECURE_LIGHT_ICON);
const ANALYSABLE_ICON = computed(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? ANALYSABLE_DARK_ICON : ANALYSABLE_LIGHT_ICON);

const shortenedUrl = ref("");
const isLoading = ref(false);
const isReady = ref(false);

const recaptcha = useReCaptcha();

function shortenUrl(url) {
  
  isLoading.value = true;

  recaptcha.recaptchaLoaded().then(() => {
    recaptcha.executeRecaptcha("shorten").then((token) => {    
      const body = {targetUrl: url, recaptchaToken: token};
      http.post("/api/shorten", JSON.stringify(body))
        .then(res => { 
          if (res.ok) { return res.json(); }
          else {
            throw new Error();
          }    
        })
        .then(data => {
          shortenedUrl.value = data.shortUrl;
          
          isLoading.value = false;
          isReady.value = true;
          notificationTrayRef.value.notify(true, "URL shortened");
        })
        .catch(() => {
          isLoading.value = false;
          isReady.value = false;
          notificationTrayRef.value.notify(false, "Invalid URL");
        });

    });
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

  <main class="container main flex f-column f-centered">

    <section class="section-form flex f-column f-centered">
      <div class="form-intro">
        <p>Paste the URL to be shortened.</p>
      </div>
      <img class="loading" :src="LOADING_ICON" alt="" v-if="isLoading">
      <UrlFormComponent @click="shortenUrl" type="shorten" ref="urlshortener-input" v-if="!isLoading && !isReady" />
      <UrlFormComponent @click="copyUrl" type="shortened" :value="shortenedUrl" v-if="isReady" />

      <div class="form-intro">
        <p>Create links that are friendly, easier to share and remember.</p>
      </div>
    </section>
    
    <!-- <div class="separator"></div> -->

    <section class="section-about flex f-column">
      <article class="about-description flex f-column">
        <h2>Modern and fast URL Shortener!</h2>
        <p>URL Shortener by Linky Cat allows you to shorten long links from 
          <a target="_blank" href="https://www.google.com">Google</a>, 
          <a target="_blank" href="https://www.instagram.com">Instagram</a>,
          <a target="_blank" href="https://www.tiktok.com">TikTok</a>,
          <a target="_blank" href="https://www.youtube.com">YouTube</a>, 
          <a target="_blank" href="https://www.x.com">X</a>, 
          <a target="_blank" href="https://www.facebook.com">Facebook</a>, 
          <a target="_blank" href="https://www.linkedin.com">LinkedIn</a>, 
           blogs and many other sites. When your short link is ready, just copy and share it everywhere! 
           <!-- After shortening the URL, check how many clicks it received. -->
        </p>
        <h2>Big links no more!</h2>
        <p>
          With URL Shortener by Linky Cat you can turn links like this: <br>
          <a target="_blank" href="https://pets24.co.za/wp-content/uploads/2023/10/cute-sleeping-kitten-cat-2022-11-16-19-07-00-utc-scaled.webp">
            https://pets24.co.za/wp-content/uploads/2023/10/cute-sleeping-kitten-cat-2022-11-16-19-07-00-utc-scaled.webp
          </a>
        </p>
        
        <!-- <br> -->
        <p>Into a link like this: <br>
          <a target="_blank" href="https://sh.linky.cat/BX35T">
            https://sh.linky.cat/BX35T
          </a>
      </p>
        
        
        <h2>How to use:</h2>
        <p>1. Paste your long URL (from Google, Instagram, TikTok, etc.) in the field above.</p>
        <p>2. Click "Shorten URL" and done!</p>
        <p>3. Copy your new short link and share it anywhere.</p>
        <div class="wrapper-example-gif flex f-column f-centered">
          <p>Click image below to see a animated example</p>
          <img 
            class="example-gif"
            :src="SHORTEN_EXAMPLE_PNG" 
            @click="(e) => e.target.src = util.getFileExtension(e.target.src).indexOf('png') > -1 ? SHORTEN_EXAMPLE_GIF : SHORTEN_EXAMPLE_PNG"
            alt="
              Example of a url being shortened by pasting a link into the field and clicking the 'Shorten URL' button. 
              After the shortening the shortened url is copied by clicking 'Copy URL' button.
            "
          >
          &darr;
          <p>Click image below to see a animated example</p>
          <img 
            class="example-gif"
            :src="SHARING_EXAMPLE_PNG" 
            @click="(e) => e.target.src = util.getFileExtension(e.target.src).indexOf('png') > -1 ? SHARING_EXAMPLE_GIF : SHARING_EXAMPLE_PNG"
            alt="
              Example of a url being shortened by pasting a link into the field and clicking the 'Shorten URL' button. 
              After the shortening the shortened url is copied by clicking 'Copy URL' button.
            "
          >
        </div>

      </article>
      
      <aside class="about-cards flex f-column f-centered">
        <h2>Why use URL Shortener by Linky Cat?</h2>
        <div class="about-cards-row flex">
          <div class="about-cards-card">
            <img :src="FRIENDLY_ICON" alt="Friendly Icon">
            <h3>Friendly</h3>
            <p>Short links are memorable, more legible and easier to be written.</p>
          </div>
          <div class="about-cards-card">
            <img :src="SHORT_ICON" alt="Short Icon">
            <h3>Short</h3>
            <p>Shorten any link from any website, regardless of its length.</p>
          </div>
          <div class="about-cards-card">
            <img :src="FAST_ICON" alt="Fast Icon">
            <h3>Fast</h3>
            <p>Shortened, copied, shared, accessed. Just like that. </p>
          </div>
        </div>

        <div class="about-cards-row flex">
          <div class="about-cards-card">
            <img :src="REUSABLE_ICON" alt="Reusable Icon">
            <h3>Reusable</h3>
            <p>Shorten once, share whenever and wherever you want.</p>
          </div>
          <div class="about-cards-card">
            <img :src="SECURE_ICON" alt="Secure Icon">
            <h3>Secure</h3>
            <p>URL Shortener service has HTTPS protocol and data encryption.</p>
          </div>
          <div class="about-cards-card">
            <img :src="ANALYSABLE_ICON" alt="Analysable Icon">
            <h3>Analysable</h3>
            <p>Check useful data from shortened URL using the analytics tool. (Coming Soon)</p>
          </div>
        </div>
      </aside>
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

.section-about {
  width: 100%;
  
  margin-top: 25px;
  /* border-radius: 10px;

  padding: 20px 25px; */
}

.about-description {
  
  h2 {
    font-size: 17pt;
    font-weight: 500;
    margin-top: 25px;
  }
  p {
    margin-top: 5px;
    font-size: 11pt;
    text-align: justify;
    font-weight: 100;
  }
}

.wrapper-example-gif {
  margin-top: 20px;
  justify-content: space-around;
  
  font-size: 15pt;
  font-weight: bolder;
}

.example-gif {
  max-width: 99%;
  width: 400px;
  margin: 10px 0;
  padding: 5px;


  border: 1px dashed var(--gray);
  border-radius: 15px;
  cursor: pointer;
}

.about-cards {
  margin-top: 15px;

  h2 {
    font-weight: 500;
    text-align: center;
  }
}

.about-cards-card {
  /* height: 250px; */
  flex: 1;

  text-align: center;

  /* border: 1px solid white; */

  padding: 15px;

  img {
    width: 70px;
    fill: aquamarine;
  }
  h3 {
    /* height: 10px; */
    font-weight: 400px;
  }
  p {
    margin-top: 5px;
    font-size: 12pt;
    
    font-weight: 100; 

    hyphens: auto;
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

.separator {
  height: 1px;
  width: 90%;
  margin: 20px;
  
  background-color: var(--color-text);
}

a {
  text-decoration: none;
  color: var(--color-link);
}

</style>
