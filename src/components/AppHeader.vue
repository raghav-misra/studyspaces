<template>
    <header>
        <router-link to="/"><h1 class="d-inline-block">StudyCove</h1></router-link>
        <div class="btn-group d-inline-block float-right" role="group">
            <router-link to="/dashboard" class="btn btn-info">
                Dashboard
            </router-link>

            <button @click="logOut" class="btn btn-danger">
                Logout <i class="fas fa-sign-out-alt"></i>
            </button>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from "vue";
import { APILogOut } from "@/services/api";

export default Vue.extend({
    methods: {
        logOut() {
            APILogOut();
        },
    },
});
</script>

<style scoped>
header {
    padding: 20px 10px;
    background: var(--primary);
}

h1 {
    position: relative;
    top: 5px;
    color: white;
}
</style>
