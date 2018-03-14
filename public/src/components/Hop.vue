<template>
    <div class="hop">
        <form @submit.prevent="addHop">
            <div class="form-group">
                <h6>Amount: </h6>
                <input type="number" name="hopAmount" v-model="defaultValues.quantity">
                <label for="hopAmount">oz</label>
            </div>
            <div class="form-group">
                <h6>Hop: </h6>
                <select class="form-control" id="hop" placeholder="Hop" v-model='hop'>
                    <option v-for="hop in hops" :value='hop'>{{hop.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <h6>Boil Time: </h6>
                <input type="number" name="boilTime" v-model="defaultValues.boilTime">
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
                defaultValues: {
                    boilTime: 60,
                    quantity: 1
                },
                hop: {}
            }
        },
        computed: {
            hops() {
                return this.$store.state.hops
            }
        },
        methods: {
            addHop() {
                this.hop.boilTime = Number(this.defaultValues.boilTime)
                this.hop.quantity = Number(this.defaultValues.quantity)
                this.$store.dispatch('addNewRecipeHop', this.hop)
            }
        },
    }
</script>

<style scoped>
</style>