<template>
    <section class="text-center">
        <div class="jumbotron">
            <h1>
                Editing Deck:
                <code><input v-model="title" type="text" placeholder="Name your deck..." /></code>
            </h1>
            <p class="lead">
                Splash Image URL: 
                <code>
                    <input v-model="img" type="text" placeholder="Paste URL here...">
                </code>
            </p>
            <hr />
            <div>
                <EditorField
                    v-for="card in cards"
                    :id="card.id"
                    :key="card.id"
                    :baseCard="card"
                    @update="update"
                    @remove="remove"
                />
                <p class="lead" v-if="cards.length === 0">
                    No cards yet. Add one below!
                </p>
            </div>
            <hr />
            <div class="btn-group">
                <button @click="addCard" class="btn btn-info">
                    Add Card
                </button>
                <button @click="saveDeck" class="btn btn-success">
                    Save Deck
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { APIGetDeck, APICreateDeck, APIEditDeck } from "@/services/APIWrapper";
import EditorField from "@/components/EditorField.vue";
import store from "@/store";
import { IUICard, ICardField, IDeckParam, ICardParam } from "@/types";

export default Vue.extend({
    props: { id: String },

    data() {
        return {
            title: "New Deck",
            img: "",
            cards: [] as IUICard[],
            deckObject: {} as Record<string, any>,
            currentID: 0,
        };
    },

    async created() {
        // Load Existing Deck If Any:
        if (this.id !== "new-deck") {
            const deckObject = await APIGetDeck(this.id);
            await this.loadDeck(deckObject);
        }
    },

    computed: {
        newDeck(): boolean {
            return this.id === "new-deck";
        },
    },

    methods: {
        getCardById(id: number) {
            return this.cards.findIndex((item) => item.id === id);
        },
        loadDeck(deckObject: IDeckParam) {
            this.deckObject = deckObject;
            this.title = this.deckObject.title;
            let tmpID = -1;
            this.cards = this.deckObject.content.map((card: ICardParam) => {
                tmpID++;
                return {
                    question: card.q,
                    answer: card.a,
                    incorrect: card.wa.map(a => a.a),
                    id: tmpID
                } as IUICard;
            });
            this.currentID = tmpID + 1;
            if (deckObject.author !== store.username) {
                alert("You cannot edit this deck. It has a different author.");
                this.$router.push("/dashboard").catch(() => {});
            }
        },
        update(id: number, field: ICardField, newValue: string) {
            const card = this.getCardById(id);

            // Set incorrect index:
            if (typeof field === "number")
                this.cards[card].incorrect[field] = newValue;
            // Set Q or A
            else this.cards[card][field] = newValue;
        },
        remove(id: number) {
            const card = this.getCardById(id);
            this.cards.splice(card, 1);
        },
        addCard() {
            this.cards.push({
                question: "",
                answer: "",
                incorrect: ["", "", ""],
                id: parseInt("" + this.currentID),
            });

            this.currentID++;
        },
        async saveDeck() {
            // Create New Deck:
            if (this.newDeck) {
                const creationSuccess = await APICreateDeck(
                    store.token as string,
                    {
                        title: this.title,
                        cards: this.cards,
                        img: this.img,
                        id: this.id,
                    }
                );
                await this.$router.push("/dashboard");
            }
            // Overwrite existing deck:
            else {
                await APIEditDeck(store.token as string, {
                    title: this.title,
                    cards: this.cards,
                    img: this.img,
                    id: this.id,
                });
            }
        },
    },

    components: { EditorField },
});
</script>

<style scoped>
h1 > code:first-of-type {
    position: relative;
    bottom: 2.5px;
}

input:not(.form-control) {
    color: #e83e8c;
    font-weight: bold;
    border: 1.5px solid var(--primary);
    padding: 5px;
}
</style>
