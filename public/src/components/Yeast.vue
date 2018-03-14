<template>
  <div class="Yeast">
    <form @submit.prevent="addYeast">
      <div class="form-group">
          <label for="yeastVariety">Variety</label>
          <select type="text" class="form-control" id="yeastVariety" v-model="variety">
            <option v-for="yeast in yeasts">{{yeast.name}}</option>
          </select>
            <label for="yeastTemp">Temp (F)</label>
            <input type="number" class="form-control" id="yeastTemp" v-model="temp">
            <label for="yeastPitch">Pitch</label>
            <input type="number" class="form-control" id="yeastPitch" v-model="pitch">
      </div>
    </form>

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
        yeast: {
          variety: '',
          temp: 0,
          pitch: 0
        }
      }
    },
    methods: {
      addYeast(){
        this.$store.dispatch('addNewRecipeYeast', this.yeast)
      },
    },
    computed: {
      yeasts() {
        return this.$store.state.yeasts
      }
    },
    components: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>