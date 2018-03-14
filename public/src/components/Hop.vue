<template>
    <div class="hop">
        <form @submit.prevent="addHop">
            <div class="form-group">
                <h6>Amount: </h6>
                <input type="number" name="hopAmount">
                <label for="hopAmount">oz</label>
            </div>
            <div class="form-group">
                <h6>Hop: </h6>
                <select class="form-control" id="hop" placeholder="Hop">
                    <option v-for="hop in hops">{{hop.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <h6>Boil Time: </h6>
                <input type="number" name="boilTime">
                <label for="boilTime">min</label>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$store.dispatch('getHops')
        },
        data() {
            return {

            }
        },
        computed: {
            hops() {
                return this.$store.state.hops
            }
        },
    }
</script>

<style scoped>
</style>