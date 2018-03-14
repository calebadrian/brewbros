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
            <button type="submit" class="btn-success">Add Hop</button>
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
                hop: {
                    name: '',
                    quantity: 0,
                    boilTime: 60
                }
            }
        },
        computed: {
            hops() {
                return this.$store.state.hops
            }
        },
        methods: {
            addHop() {
                this.$store.dispatch('addNewRecipeHop', this.hop)
            }
        },
    }
</script>

<style scoped>
</style>