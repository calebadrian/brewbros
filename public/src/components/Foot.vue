<template>
    <div class="foot col-12">
        <h4>BrewBros</h4>
        <img class="breweryDB" src="../assets/Powered-By-BreweryDB.png">
        <div>
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
    .foot{
        height: 8rem;
        background-color: rgb(50, 50, 50);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .breweryDB{
        height: 10vh
    }
    .svg{
        width: 2rem;
        height: 2rem;
    }
</style>