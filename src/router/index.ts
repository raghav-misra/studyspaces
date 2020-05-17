import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import LandingPage from "@/views/LandingPage.vue";
import AuthPage from "@/views/AuthPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import DeckEditPage from "@/views/deck/EditPage.vue";
import HostPage from "@/views/HostPage.vue";
import TestFactoryPage from "@/views/games/TestFactoryPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Landing",
        component: LandingPage,
    },
    {
        path: "/auth",
        name: "Auth",
        component: AuthPage,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardPage,
    },
    {
        path: "/decks/edit/:id",
        name: "DeckEdit",
        component: DeckEditPage,
        props: true,
    },
    {
        path: "/host/:id",
        name: "Host",
        component: HostPage,
        props: true
    },
    {
        path: "/play/test-factory/:urlCode",
        name: "TestFactoryWithCode",
        component: TestFactoryPage,
        props: true
    },
    {
        path: "/play/test-factory",
        name: "TestFactory",
        component: TestFactoryPage
    }
];

const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;
