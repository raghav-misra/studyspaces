<template>
    <section class="container text-center">
        <h1>Hello {{ username }}!</h1>
        <hr />
        <div>
            <h2>Your Decks</h2>
            <DeckCard v-for="(deck, i) in decks" :key="i" :deck="deck" />
            <router-link to="/decks/edit/new-deck">
                <DeckCard type="create" />
            </router-link>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";

import { APITokenExists, APIGetData, APILogOut } from "@/services/APIWrapper";
import DeckCard from "@/components/DeckCard.vue";
import store from "@/store";

export default Vue.extend({
    data() {
        return {
            username: "",
            decks: [] as string[],
        };
    },

    // Check if logged in, if not, redirect:
    async created() {
        if (!APITokenExists()) {
            APILogOut();
        } else {
            const data = await APIGetData(store.token as string);
            await this.loadData(data);
        }
    },

    methods: {
        loadData(data: Record<string, any> | null) {
            this.username = (data as any).username;
            this.decks.push(...(data as any).decks);
        },
    },

    components: { DeckCard },
});
</script>

<style scoped>
section {
    padding-top: 20px;
}
</style>
