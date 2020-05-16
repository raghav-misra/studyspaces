<template>
    <header>
        <br />
        <h1 class="text-center">Study App</h1>
        <br />
        <div class="btn-group d-block text-center" role="group" aria-label="Basic example">
            <router-link to="/dashboard" class="btn btn-info">Dashboard</router-link>
            <router-link to="/games" class="btn btn-success">View Games</router-link>
        </div>
        <hr />
    </header>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    
});
</script>

<style scoped>

</style>