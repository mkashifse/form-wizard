import AppVue from "@/App.vue";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/formstep/0",
    },
    {
      path: "/formstep/:id",
      component: AppVue,
    },
  ],
});

export default router;
