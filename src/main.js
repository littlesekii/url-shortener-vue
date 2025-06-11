import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { VueReCaptcha } from "vue-recaptcha-v3";

const app = createApp(App);

app.use(router);
app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY
});

app.mount("#app");

//changes logo based on browser theme
const setFavicon = () => {
  const favicon = document.querySelector("link[rel='icon']");
  favicon.href = (window.matchMedia("(prefers-color-scheme: dark)").matches) 
    ? "/favicon_dark.ico"
    : "/favicon_light.ico";
};

setFavicon();