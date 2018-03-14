<template>
  <div class="Yeast">
    <form @submit.prevent="addYeast">
      <div class="form-group">
          <label for="yeastVariety">Variety</label>
          <select type="text" class="form-control" id="yeastVariety">
            <option v-for="yeast in yeasts">{{yeast.name}}</option>
          </select>
            <label for="yeastTemp">Temp (F)</label>
            <input type="number" class="form-control" id="yeastTemp">
            <label for="yeastPitch">Pitch</label>
            <input type="number" class="form-control" id="yeastPitch">
      </div>
      <!-- <i class="far fa-plus-square fa-2x" @click="addYeast"></i> -->
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

      }
    },
    methods: {
      addYeast(){

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