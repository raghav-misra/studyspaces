<template>
    <section class="container">
        <h1 class="text-center">Hello {{ username }}!</h1>
        <div>
            <DeckCard v-for="(deck, i) in decks" deck="deck" :key="i" />
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";

import { APITokenExists } from "@/services/api";

export default Vue.extend({
    computed: {
        username() { return this.$store.state.username; }
    },

    // Check if logged in, if not, redirect:
    created() {
        if (!APITokenExists()) {
            this.$router.push("/auth");
        }
    }
});
</script>

<style scoped>
section {
    padding-top: 20px;
}
</style>