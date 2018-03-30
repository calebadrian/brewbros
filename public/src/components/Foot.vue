<template>
    <div class="foot container-fluid d-flex justify-content-between align-items-center">
        <h4>BrewBros</h4>
        <img class="breweryDB" src="../assets/Powered-By-BreweryDB.png">
        <div class="d-flex justify-content-between">
            <img src="../assets/twitter-original.svg" class="svg">
            <img src="../assets/facebook-original.svg" class="svg">
            <img src="../assets/github-original-wordmark.svg" class="svg">
        </div>
        <div>
            <h5>Contact Us!</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Foot',
        data() {
            return {

            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .foot {
        height: 4rem;
        background-color: rgb(50, 50, 50);
        color: white;
    }
    
    .breweryDB {
        height: 4rem
    }
    
    .svg {
        width: 2rem;
        height: 2rem;
    }
</style>