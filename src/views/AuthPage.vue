<template>
    <section class="container d-flex">
        <LoginForm />
        <div class="vertical-sep" />
        <SignupForm />
    </section>
</template>

<script lang="ts">
import Vue from "vue";

import LoginForm from "@/components/LoginForm.vue";
import SignupForm from "@/components/SignupForm.vue";

export default Vue.extend({
    components: { LoginForm, SignupForm }
});
</script>

<style scoped>
    form { flex: 1; margin: 0 2rem; }

    form {
        padding: 1.5rem;
    }

    div.vertical-sep {
        height: 50vh;
        width: 0.125rem;
        background: black;
    }
</style>