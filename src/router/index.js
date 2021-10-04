import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/atendimento",
    name: "Atendimento",

    component: () =>
      import(/* webpackChunkName: "Page2" */ "../views/Attendance.vue"),
    meta: {
      title: "Início",
    },
  },
  {
    path: "/revisao",
    name: "Page3",
    component: () =>
      import(/* webpackChunkName: "Page3" */ "../views/Revision.vue"),
  },
  {
    path: "/finalizar",
    name: "Page4",
    component: () =>
      import(/* webpackChunkName: "Page3" */ "../views/FinishForm.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
