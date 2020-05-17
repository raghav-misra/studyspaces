<template>
    <form @submit.prevent="formSubmit" class="text-right">
        <h3>Login</h3>
        <br />
        <div class="form-group">
            <label>Username</label>
            <input
                v-model="username"
                type="text"
                class="form-control text-right"
                placeholder="HTHSHacksIsCool123"
            />
        </div>
        <div class="form-group">
            <label>Password</label>
            <input
                v-model="password"
                type="password"
                class="form-control text-right"
                placeholder="Shhh! It's a secret."
            />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue";

import { APILogIn } from "@/services/APIWrapper";

export default Vue.extend({
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        formSubmit() {
            APILogIn(this.username, this.password);
        },
    },
});
</script>
