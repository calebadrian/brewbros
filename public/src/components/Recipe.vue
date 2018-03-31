<template>
  <div class="recipe">
    <div class="card-header">
      <h3>{{recipe.name}}</h3>
    </div>
    <div class="card-body">
      <p class="text-muted">
        <strong>Style: </strong>{{recipe.style}}</p>
      <p class="text-muted">
        <strong>Sub-Style: </strong>{{recipe.subStyle}}</p>
      <ul>
        <li>Boil Time: {{recipe.boilTime}}</li>
        <li>Batch Size: {{recipe.batchSize}}</li>
        <li>Rating: </li>
        <li>Created By:
          <router-link :to="{name: 'profile', params: {profileId: recipe.creatorId}}">
            {{recipe.creatorName}}</router-link>
        </li>
      </ul>
      <p>Average Rating: {{avgRating.toFixed(2)}}</p>
      <p>Number of Ratings: {{Object.keys(recipe.ratings).length}}</p>
      <div v-if="user.name">
        <p>My Rating:</p>
        <fa-rating :glyph="beer" v-if="!recipe.ratings[user._id]" v-model="rating" @rating-selected="addRating" inactive-color="#e6e6e6"
          active-color="#e1b871" :increment="0.25" :fixed-points="2">
        </fa-rating>
        <fa-rating :glyph="beer" v-else v-model="recipe.ratings[user._id]" @rating-selected="editRating" inactive-color="#e6e6e6"
          active-color="#e1b871" :increment="0.25" :fixed-points="2">
        </fa-rating>
      </div>
      <span class="favorited">
        <h6>
          <b>{{recipe.favorited.length}}</b>
        </h6>
        <img class="hop" src="../assets/hopIcon.png" alt="">
      </span>
    </div>
    <!-- Footer of the card is on each page. Not included in this recipe component because it is where we have custom settings to view buttons etc. -->
    <!-- Begin Modal Content -->
    <div class="modal fade" :id="recipe._id" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">{{recipe.name}}</h3>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>Fermentables</h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Fermentable</th>
                  <th scope="col">Potential</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fermentable in recipe.fermentables">
                  <th scope="row">1</th>
                  <td>{{fermentable.quantity}} lb(s)</td>
                  <td>{{fermentable.name}}</td>
                  <td>{{fermentable.potential}}</td>
                </tr>
              </tbody>
            </table>
            <h5>Hops</h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Hop</th>
                  <th scope="col">Boil Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="hop in recipe.hops">
                  <th scope="row">1</th>
                  <td>{{hop.quantity}} oz(s)</td>
                  <td>{{hop.name}}</td>
                  <td>{{hop.boilTime}} min</td>
                </tr>
              </tbody>
            </table>
            <h5>Steeping Grains</h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Grain</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="grain in recipe.steepingGrains">
                  <th scope="row">1</th>
                  <td>{{grain.quantity}} lb(s)</td>
                  <td>{{grain.name}}</td>
                </tr>
              </tbody>
            </table>
            <h5>Other Ingredients</h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Ingredient</th>
                  <th scope="col">Boil Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="adjunct in recipe.adjuncts">
                  <th scope="row">1</th>
                  <td>{{adjunct.quantity}} oz(s)</td>
                  <td>{{adjunct.name}}</td>
                  <td>{{adjunct.boilTime}} min</td>
                </tr>
              </tbody>
            </table>
            <h5>Yeast</h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Yeast</th>
                  <th scope="col">Pitch</th>
                  <th scope="col">Temp(F)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="yeast in recipe.yeasts">
                  <th scope="row">1</th>
                  <td>{{yeast.name}}</td>
                  <td>{{yeast.pitch}}</td>
                  <td>{{yeast.temp}} F</td>
                </tr>
              </tbody>
            </table>
            <h5>Notes/Comments:</h5>
            <p>{{recipe.personalComments}}</p>
          </div>
          <div class="modal-footer">
            {{recipe.creatorName}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Beer from 'vue-rate-it/glyphs/beer';

  export default {
    name: 'recipe',
    props: ['recipe'],
    mounted() {
      // this.$store.dispatch('authenticate')
      // this.$store.dispatch('getRecipes')
      this.avgRatingCalc()
    },
    data() {
      return {
        beer: '',
        rating: 0,
        avgRating: 0,
        userRating: 0
      }
    },
    methods: {
      avgRatingCalc() {
        var ratings = this.recipe.ratings
        var sum = 0
        var count = 0
        for (const key in ratings) {
          if (ratings.hasOwnProperty(key)) {
            const rating = ratings[key];
            sum += rating
            count++
          }
        }
        this.avgRating = sum / count
      },
      addRating() {
        this.$store.dispatch('addRating', { rating: this.rating, recipeId: this.recipe._id, userId: this.user._id })
        this.userRating = this.rating
      },
      editRating() {
        this.$store.dispatch('addRating', { rating: this.recipe.ratings[this.user._id], recipeId: this.recipe._id, userId: this.user._id })
        this.userRating = this.recipe.ratings[this.user._id]
      }
    },
    computed: {
      allRecipes() {
        return this.$store.state.allRecipes
      },
      user() {
        return this.$store.state.user
      }
    },
    created() {
      this.beer = Beer
    },
    watch: {
      userRating: function (val) {
        this.avgRatingCalc()
      }
    },
    components: {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h6 {
    font-size: 1.3rem;
  }

  .favorited {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .hop {
    height: 40px;
  }

  .text-muted {
    color: black;
    margin-top: 4px;
    margin-bottom: 4px
  }

  .recipe {
    margin: 1rem 0;
  }

  .card-body {
    background-color: rgba(210, 180, 140, 0.6);
    box-shadow: 5px 5px 20px rgba(210, 180, 140, 0.75);

  }

  .card-header {
    background-color: rgba(210, 180, 140, .8);
    box-shadow: 5px 0px 10px rgba(210, 180, 140, 0.75);

  }
</style>