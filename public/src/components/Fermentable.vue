<template>
    <div class="steepingGrains">
        <form @submit.prevent>
            <div class="form-group">
                <label for="fermentableAmount">lbs</label>
                <input type="number" name="fermentableAmount" v-model="defaultValues.quantity" class="form-control" id="fermentableAmount"
                    placeholder="#">
                <label for="fermentable">Fermentable</label>
                <select type="text" class="form-control" id="fermentable" plaecholder="Fermentable" v-model="fermentable"></select>
                <option v-for="fermentable in fermentables" :value='fermentable'>{{fermentable.name}}</option>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Fermentable',
        mounted() {
            this.$store.dispatch('getFermentables')
        },
        data() {
            return {
                defaultValues: {
                    quantity: 1
                },
                fermentable: {}
            }
        },
        computed: {
            fermentables() {
                return this.$store.state.fermentables
            }
        },
        methods: {
            addFermentable() {
                this.fermentable.quantity = this.defaulftValues.quantity
                this.$store.dispatch('addNewRecipeFermentable', this.fermentable)
                this.$parent.calcGravities()
            }
        },
    }
</script>

<style scoped>
</style>