<template>
    <details class="editor-field text-left" open>
        <summary class="h4 text-left">
            {{ formattedQuestion }}
            <button @click="remove" class="trash-btn btn btn-danger float-right">
                <i class="fas fa-trash"></i>
            </button>
        </summary>

        <small>Question:</small>
        <input type="text" placeholder="Type your question..." 
            class="form-control question-field" v-model="question">

        <small>Correct Answer:</small>
        <textarea placeholder="What's the correct answer?"
            class="form-control answer-field" v-model="answer"></textarea>

        <small>Wrong Answer Choices:</small>
        <div class="wrong-answers">
            <textarea class="form-control answer-field"
                placeholder="Incorrect Choice #1"
                v-model="incorrect[0]"></textarea>
            <textarea class="form-control answer-field"
                placeholder="Incorrect Choice #2" 
                v-model="incorrect[1]"></textarea>
            <textarea class="form-control answer-field"
                placeholder="Incorrect Choice #3"
                v-model="incorrect[2]"></textarea>
        </div>
    </details>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: { id: Number },

    data() {
        return {
            question: "",
            answer: "",
            incorrect: ["", "", ""]
        }
    },

    computed: {
        formattedQuestion(): string { 
            return this.question.trim() === "" ? "Question..." : this.question; 
        },
        incorrect0(): string { return this.incorrect[0]; },
        incorrect1(): string { return this.incorrect[1]; },
        incorrect3(): string { return this.incorrect[2]; }
    },

    methods: {
        update(field: string | number, newValue: string) {
            this.$emit("update", this.id, field, newValue);
        },
        remove() {
            this.$emit("remove", this.id);
        }
    },

    watch: {
        question(newValue) { this.update("question", newValue); },
        answer(newValue) { this.update("answer", newValue); },
        incorrect0(newValue) { this.update(0, newValue); },
        incorrect1(newValue) { this.update(1, newValue); },
        incorrect2(newValue) { this.update(2, newValue); }
    }
});
</script>

<style scoped>
.editor-field {
    padding: 10px;
}

.wrong-answers {
    text-align: center;
}

.wrong-answers textarea {
    display: inline-block;
    width: 20vw;
    margin: 10px;
    min-width: 250px;
}

textarea, input {
    border: 1.5px solid var(--primary);
}

summary {
    padding: 10px;
}

.editor-field > * {
    margin: 10px;
}

.trash-btn {
    padding: 5px 11.25px;
    border-radius: 50%;
    position: relative;
    bottom: 5px;
}
</style>