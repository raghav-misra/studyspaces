<template>
    <section class="container">
        <h1 class="text-center">Hello {{ username }}!</h1>
        <hr />
        <div>
            <h2>Your Decks</h2>
            <DeckCard v-for="(deck, i) in decks" :key="i" :deck="deck" />
            <router-link to="/decks/create">
                <DeckCard type="create" />
            </router-link>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";

import { APITokenExists, APIGetData, APILogOut } from "@/services/api";
import DeckCard from "@/components/DeckCard.vue";
import store from "@/store";

export default Vue.extend({
    data() {
        return {
            username: "",
            decks: []
        }
    },

    // Check if logged in, if not, redirect:
    created() {
        if (!APITokenExists()) {
            APILogOut();
        }
        else {
            APIGetData(store.token as string, this);
        }
    },

    components: { DeckCard }
});
</script>

<style scoped>
section {
    padding-top: 20px;
}
</style>