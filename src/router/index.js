import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import YyLayout from "../layouts/YyLayout";
import VerifyCode from "../pages/auth/VerifyCode";

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
    path: "/register",
    component: SignUp,
  },
  {
    path: "/verify/code",
    component: VerifyCode,
  },
  {
    path: "/",
    component: YyLayout,
    redirect: '/login',
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
