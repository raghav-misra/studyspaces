import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";


import LandingPage from "@/views/LandingPage.vue";
import AuthPage from '@/views/AuthPage.vue';
import DashboardPage from '@/views/DashboardPage.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage
    },
    {
        path: '/auth',
        name: 'Auth',
        component: AuthPage
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardPage
    }
]

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router
