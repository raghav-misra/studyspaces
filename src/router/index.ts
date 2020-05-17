import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";


import LandingPage from "@/views/LandingPage.vue";
import AuthPage from "@/views/AuthPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import DeckEditPage from "@/views/deck/EditPage.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Landing",
        component: LandingPage
    },
    {
        path: "/auth",
        name: "Auth",
        component: AuthPage
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardPage
    },
    {
        path: "/decks/edit/:id",
        name: "DeckEdit",
        component: DeckEditPage,
        props: true
    }
]

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router
