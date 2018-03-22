<template>
    <div class="foot container-fluid d-flex justify-content-between align-items-center">
        <h4>Brew Bros</h4>
        <img class="breweryDB" src="../assets/Powered-By-BreweryDB.png">
        <div>
            <i class="fab fa-2x fa-twitter-square"></i>
            <i class="fb fab fa-2x fa-facebook"></i>
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
    .foot{
        min-height: 15vh;
    }
    .breweryDB{
        height: 10vh
    }
    .fb{
        color: rgb(73,103,173);
        background-color: white;
    }
</style>