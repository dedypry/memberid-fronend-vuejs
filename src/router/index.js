// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      guestOnly: true,
    }
  },
  {
    path: "/award",
    component: () => import("../layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "award",
        component: () => import("@/views/award/list.vue"),
      },
    ],
    meta: {
      authOnly: true,
    }
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
