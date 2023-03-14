import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../pages/auth/SignIn";
import YyLayout from "../layouts/YyLayout";

// Page
import OverViewPage from "../pages/overview/OverviewPage.vue";
import ExplorePage from "../pages/explore/ExplorePage.vue";

// result page
import NotFound from "../pages/result/NotFound.vue";

const routes = [
  {
    path: "/login",
    component: SignIn,
  },
  {
    path: "/",
    component: YyLayout,
    redirect: '/huaisun',
    children: [
      { path: "/:username", component: OverViewPage },
      { path: "explore", component: ExplorePage },
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
