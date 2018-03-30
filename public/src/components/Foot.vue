<template>
    <div class="foot row">
        <div class="col-sm-12 footer">
            <img class="breweryDB" src="../assets/Powered-By-BreweryDB.png">
            <div>
                <img src="../assets/twitter-original.svg" class="svg">
                <img src="../assets/facebook-original.svg" class="svg">
                <img src="../assets/github-original-wordmark.svg" class="svg">
            </div>
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
        /* height: 4rem; */
        background-color: rgb(50, 50, 50);
        color: white;
        /* display: inline-flex;
        justify-content: space-between;
        align-items: center; */
    }
    .footer{
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .breweryDB {
        /* width: 100%; */
        max-height: 3rem
    }

    .svg {
        width: 2rem;
        height: 2rem;
    }
</style>