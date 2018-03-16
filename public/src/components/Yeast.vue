<template>
  <div class="Yeast">
    <div class="card-body">
      <form @submit.prevent="addYeast">
        <div class="form-group">
          <label for="yeastVariety">Variety</label>
          <v-select label="name" v-model="yeast" :options="yeasts"></v-select>
          <label for="yeastTemp">Temp (F)</label>
          <input type="number" class="form-control" id="yeastTemp" v-model="defaultValues.temp" min="0">
          <label for="yeastPitch">Pitch</label>
          <input type="number" class="form-control" id="yeastPitch" v-model="defaultValues.pitch" min="0">
        </div>
        <button type="submit" class="btn-success">Add Yeast</button>
      </form>
    </div>
    <div class="card-footer">
      <div v-if="newRecipeYeasts.length > 0">
        <h5>Current Yeasts:</h5>
        <div v-for="newYeast in newRecipeYeasts">
          <h6>{{newYeast.name}} with attenuation of {{newYeast.attenuationMin}}%</h6>
          <i class="fas fa-2x fa-ban" @click="removeYeast(newYeast)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Yeast',
    mounted() {
      this.$store.dispatch('getYeasts')
    },
    data() {
      return {
        yeast: '',
        defaultValues: {
          temp: 1,
          pitch: 1
        }
      }
    },
    methods: {
      addYeast() {
        this.yeast.temp = Number(this.defaultValues.temp)
        this.yeast.pitch = Number(this.defaultValues.pitch)
        this.$store.dispatch('addNewRecipeYeast', this.yeast)
        this.$parent.calcGravities()
        this.$parent.checkStyle()
      },
      removeYeast(yeast) {
        for (var i = 0; i < this.$store.state.newRecipe.yeasts.length; i++) {
          var search = this.$store.state.newRecipe.yeasts[i]
          if (search.name == yeast.name) {
            this.$store.state.newRecipe.yeasts.splice(i, 1)
          }
        }
        this.$parent.calcGravities()
        this.$parent.checkStyle()
      }
    },
    computed: {
      yeasts() {
        return this.$store.state.yeasts
      },
      newRecipeYeasts() {
        return this.$store.state.newRecipe.yeasts
      }
    },
    components: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>