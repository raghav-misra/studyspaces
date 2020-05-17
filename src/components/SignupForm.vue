<template>
    <form @submit.prevent="formSubmit">
        <h3>Signup</h3>
        <br />
        <div class="form-group">
            <label>Username</label>
            <input
                v-model="username"
                type="text"
                class="form-control"
                placeholder="ILoveHTHS"
            />
        </div>
        <div class="form-group">
            <label>Password</label>
            <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Shhh! It's a secret."
            />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue";
import { APISignUp } from "@/services/APIWrapper";

export default Vue.extend({
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async formSubmit() {
            if (this.username.trim() === "")
                return alert("Please enter a username.");
            else if (this.password.length <= 8)
                alert("Password must be longer than 8 characters.");
            else {
                await APISignUp(this.username, this.password);
            }
        },
    },
});
</script>
