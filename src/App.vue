<template>
    <main id="app">
        <AppHeader />
        <router-view />
    </main>
</template>

<script lang="ts">
import Vue from "vue";

import AppHeader from "@/components/AppHeader.vue";

export default Vue.extend({
    components: { AppHeader },
});
</script>
