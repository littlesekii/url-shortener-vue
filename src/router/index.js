import { createRouter, createWebHistory } from "vue-router";
import UrlShortenerView from "../views/UrlShortenerView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "urlShortener",
      component: UrlShortenerView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "tree",
      component: () => import("../views/RedirectView.vue"),
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
