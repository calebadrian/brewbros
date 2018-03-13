<template>
    <div class="foot d-flex justify-content-between">
        <h4>Brew Bros</h4>
        <div>
            <i class="fab fa-2x fa-twitter-square"></i>
            <i class="fab fa-2x fa-facebook"></i>
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
</style>