<template>
    <section class="container">
        <div class="card" v-for="(game, i) in gameData" :key="i">
            <div class="card-body">
                <h2>{{ game.title }}</h2>
                <br />
                <p class="lead">{{ game.description }}</p>
                <br />
                <div v-if="game.enabled">
                    <button @click="startGame(game.code)" class="btn btn-success">Launch Game!</button>
                </div>
                <div v-else>
                    <button class="btn btn-primary" disabled>Coming Soon!</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import gameData from "@/services/GameInfo";
import store from "@/store";
import { APIStartGame } from "@/services/APIWrapper";

export default Vue.extend({
    props: { id: String },

    data() {
        return {
            gameData
        };
    },
    methods: {
        async startGame(code: string) {
            await APIStartGame(store.token as string, code, this.id);
        }
    }
});
</script>

<style scoped>
.card { margin: 15px; }
</style>