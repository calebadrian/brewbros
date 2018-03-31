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
        border-top: 2px solid rgb(229, 89, 52);
        background-color: #222321;
        color: white;
    }

    .footer {
        display: flex;
        justify-content: space-around;
        align-content: center;
        margin: 1rem 0;
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