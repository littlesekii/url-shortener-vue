import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { inject } from "@vercel/analytics"

const app = createApp(App);

app.use(router);

app.mount("#app");

//changes logo based on browser theme
const setFavicon = () => {
  const favicon = document.querySelector("link[rel='icon']");
  favicon.href = (window.matchMedia("(prefers-color-scheme: dark)").matches) 
    ? "/favicon_dark.ico"
    : "/favicon_light.ico";
};

setFavicon();


inject();