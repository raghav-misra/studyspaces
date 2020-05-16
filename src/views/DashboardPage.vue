<template>
    <div>

    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    // Check if logged in, if not, redirect:
    created() {
        this.$router.push("/auth");
    }
});
</script>

<style scoped>

</style>