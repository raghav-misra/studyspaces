<template>
    <main id="app">
        <AppHeader />
        <router-view />
    </main>
</template>

<style>

</style>

<script lang="ts">
import Vue from "vue";

import AppHeader from '@/components/AppHeader.vue';

export default Vue.extend({
    components: { AppHeader }
});
</script>
