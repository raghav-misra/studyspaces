<template>
    <div :class="`card d-${hidden ? 'none' : 'inline-flex'}`">
        <div v-if="type === 'preview' && deckObject">
            <img
                class="card-img-top"
                alt="Deck Image"
                :src="deckObject.img || placeholder"
            />
            <div class="card-body">
                <h5 class="card-title">{{ deckObject.title }}</h5>
                <router-link :to="`/host/${deck}`" class="btn btn-success"
                    >Start Game</router-link
                >
                <br />
                <router-link :to="`/decks/edit/${deck}`" class="btn btn-info"
                    >Edit Deck</router-link
                >
                <br />
                <a @click="deleteDeck" class="btn btn-danger">Delete Deck</a>
            </div>
        </div>
        <div class="create-card" v-else-if="type === 'create'">
            <h1><i class="fas fa-plus"></i></h1>
            <h4>
                create <br />
                a deck
            </h4>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { APIGetDeck, APIRemoveDeck } from "@/services/APIWrapper";
import store from "@/store";

export default Vue.extend({
    async created() {
        if (this.deck) {
            const deckObject = await APIGetDeck(this.deck);
            await this.loadDeck(deckObject);
        } else this.hidden = false;
    },
    props: {
        type: {
            type: String,
            default: "preview",
        },
        deck: {
            type: String,
        },
    },
    data() {
        return { deckObject: null, hidden: true };
    },
    computed: {
        placeholder() {
            return `/static/img/tmp-${Math.floor(Math.random() * 4) + 1}.png`;
        },
    },
    methods: {
        loadDeck(deckObject: Object) {
            if (deckObject) {
                this.deckObject = deckObject as any;
                this.hidden = false;
            }
        },
        async deleteDeck() {
            const success: boolean = await APIRemoveDeck(
                store.token as string,
                this.deck
            );
            if (await success) this.hide();
        },
        hide() {
            this.hidden = true;
        },
    },
});
</script>

<style scoped>
.card {
    width: 20rem;
    height: 23.75rem;
    margin: 10px;
    text-align: center;
    border-radius: 5px;
    border: 1px var(--primary) solid;
    overflow: hidden;
    flex-direction: column;
    vertical-align: top;
}

.create-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--primary);
    flex: 1;
    transition: background 0.25s ease-in-out, border 0.25s ease-in-out;
}

a:hover {
    text-decoration: none !important;
}

.create-card:hover {
    background: var(--success);
    border-color: var(--success);
}

.create-card h1,
.create-card h4 {
    color: white;
    text-decoration: none !important;
}

img {
    max-width: 20rem;
    max-height: 10rem;
    height: 10rem !important;
    width: 20rem !important;
}

.card-body > a {
    width: 100%;
    border: 1.5px solid white;
}

.card-body > a:first-of-type {
    border-bottom: none;
}

.card-body > a:last-of-type {
    border-top: none;
    color: white;
}
</style>
