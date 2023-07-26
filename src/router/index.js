import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TimerView from "../views/TimerView.vue";
import AlarmView from "../views/AlarmView.vue";
import PomodoroView from "../views/PomodoroView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/timer",
    name: "timer",
    component: TimerView,
  },
  {
    path: "/alarm",
    name: "alarm",
    component: AlarmView,
  },
  {
    path: "/pomodoro",
    name: "pomodoro",
    component: PomodoroView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
