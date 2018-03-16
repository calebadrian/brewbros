<template>
    <div class="hop">
        <div class="card-body">
            <form @submit.prevent="addHop">
                <div class="form-group">
                    <h6>Amount: </h6>
                    <input type="number" name="hopAmount" v-model="defaultValues.quantity" step=".01" min='0'>
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
                    <input type="number" name="boilTime" v-model="defaultValues.boilTime" min='0'>
                    <label for="boilTime">min</label>
                </div>
                <button type="submit" class="btn-success">Add Hop</button>
            </form>
        </div>
        <div class="card-footer">
            <div v-if="newRecipeHops.length > 0">
                <h5>Current Hops:</h5>
                <div v-for="newHop in newRecipeHops">
                    <h6>{{newHop.quantity}}
                        <span v-if="newHop.quantity > 1">ozs</span>
                        <span v-else>oz</span> of {{newHop.name}}</h6>
                    <i class="fas fa-2x fa-ban" @click="removeHop(newHop)"></i>
                </div>
            </div>
        </div>
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
            },
            newRecipeHops() {
                return this.$store.state.newRecipe.hops
            }
        },
        methods: {
            addHop() {
                this.hop.boilTime = Number(this.defaultValues.boilTime)
                this.hop.quantity = Number(this.defaultValues.quantity)
                this.$store.dispatch('addNewRecipeHop', this.hop)
                this.$parent.calcIbu()
                this.$parent.checkStyle()
            },
            removeHop(hop){
                for (var i = 0; i < this.$store.state.newRecipe.hops.length; i++){
                    var search = this.$store.state.newRecipe.hops[i]
                    if (search.name == hop.name){
                        this.$store.state.newRecipe.hops.splice(i, 1)
                    }
                }
                this.$parent.calcIbu()
                this.$parent.checkStyle()
            }
        },
    }
</script>

<style scoped>
</style>