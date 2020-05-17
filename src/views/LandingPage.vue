<template>
    <section>
        <div id="heading" class="jumbotron text-center">
        <div>
            <h1 class="display-3">Hey There!</h1>
            <hr>
            <h3>
                Let's combat COVID-19 together as a student community by
                studying online, where the virus has no chance to get us.
            </h3>
        </div>
    </div>

    <br><br>

    <div class="container text-center">
        <h2>Make Online Learning Fun!</h2>
        <hr>
        <p class="lead">
            School is a place for fun, friends, and most importantly, learning. The experience
            students gain at school rivals no other. 
            <br><br>
            However, we can always try our best at home. Friends and collaboration are a crucial part
            of a good education, and this has become harder due to the COVID-19 pandemic.
        </p>
        <hr>
        <p class="lead">
            Introducing... <b>StudySpaces</b>! A fun, new way to bring the collaboration back into education.
            Remote learning doesn't need to be associated with boredom, rather the opposite!
        </p>
        <br><br><br>
        <div class="btn-group">
            <router-link class="btn btn-info" to="/dashboard"><h1>Get Started!</h1></router-link>
        </div>
        <br><br><br>
    </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    
});
</script>

<style scoped>


#heading {
    background: url(https://images.unsplash.com/photo-1511889308929-2e76df9765e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80);    
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
#heading *, div *, * {
    color: white !important;
}

hr {
    border-color: white;
}

section {
    background: var(--primary);
    min-height: 100vh;
}

.card {padding: 20px 10px;}
</style>