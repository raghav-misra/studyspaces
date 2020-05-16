<template>
    <div>

    </div>
</template>

<script lang="ts">
import Vue from "vue";

import { APITokenExists } from "@/services/api";

export default Vue.extend({
    // Check if logged in, if not, redirect:
    created() {
        if (!APITokenExists()) {
            this.$router.push("/auth");
        }
    }
});
</script>

<style scoped>

</style>