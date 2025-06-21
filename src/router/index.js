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
      path: "/analytics/:pathMatch(.*)*",
      name: "analytics",
      component: () => import("../views/AnalyticsView.vue"),
    },
    // {
    //   path: "/analytics",
    //   name: "analytics",
    //   component: () => import("../views/AnalyticsView.vue"),
    // },
    {
      path: "/:pathMatch(.*)*",
      name: "redirect",
      beforeEnter(to) {
        const path = to.params.pathMatch;
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/${path}`;
      },
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
