<template>
    <div class="code-entry-screen page-login">
        <div class="text-center">
            <h1 :class="`game-icon ${icon}`"></h1>
            <br /><br />
            <h2>Welcome to the...</h2>
            <h1 class="display-4">{{ gameName }}</h1>
            <br />
            <form @submit.prevent="login">
                <code>
                    <input class="form-control" v-model="username" 
                        type="text" placeholder="Enter your name!" />
                    <input class="form-control" v-model="code" 
                        type="text" placeholder="Enter your code!" />
                </code>
                <br />
                <button type="submit" class="btn btn-info">{{ submitText || "Play!" }}</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: { initial: String, gameName: String, icon: String, submitText: String },

    data() {
        return {
            code: this.initial || "",
            username: ""
        };
    },
    methods: {
        login() {
            if (this.username.length < 4) return alert("Username must be over 4 characters.");
            else if (this.username.length > 13) return alert("Username must be below 13 characters");
            else if (this.username.length === 0) return alert("Please enter a code");
            else this.$emit("login", this.code, this.username);
        }
    }
});
</script>

<style scoped>
.code-entry-screen {
    width: 100%;
    height: calc(100vh - 90px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10rem;
    background: var(--primary);
}

.game-icon {
    color: var(--success);
}

* {
    color: white !important;
}

input {
    text-align: center;
    background: none !important; 
    border: 1.5px white solid;
}

input:first-of-type {
    border-bottom: none;
}
</style>