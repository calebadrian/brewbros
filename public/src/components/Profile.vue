<template>
    <div class="Profile">
        <div class="container-fluid">
            <div class="row">
                <navbar></navbar>
            </div>
        </div>
        <div class="main-profile">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6 d-flex flex-column">
                        <h1 class="align-self-center">{{profileUser.name}}</h1>
                        <div class="d-flex justify-content-around">
                            <img v-if="profileUser.profilePic" :src="profileUser.profilePic" class="profile-pic">
                            <img v-else src="../assets/not-found.png" class="profile-pic">
                        </div>
                        <div class="d-flex justify-content-around">
                            <div class="mt-4">
                                <button class="btn btn-info" v-if="profileUser._id == user._id" data-toggle="modal" data-target="#editModal">Edit Profile</button>
                                <button class="btn btn-main" v-else-if="!user.following.find(hasProfileUser)" @click="addFollower">Follow This Person</button>
                            </div>
                            <div class="mt-4">
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        Who <span v-if="profileUser._id == user._id">You</span><span v-else>They</span> Follow
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <a class="dropdown-item" type="button" v-for="follower in profileUser.following">
                                            <router-link :to="{name: 'profile', params: {profileId: follower._id}}">{{follower.name}}</router-link>
                                            <i class="far fa-times-circle" v-if="profileUser._id == user._id" @click="removeFollower(follower)"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Edit Your Profile</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form @submit.prevent="editProfile" class="d-flex flex-column">
                                                    <input v-model="profileUser.name">
                                                    <input v-model="profileUser.email">
                                                    <input v-model="profileUser.profilePic">
                                                    <button type="submit" class="btn btn-positive">Edit Profile</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 d-flex flex-column text-center">
                        <h4>Currently Brewing:</h4>
                        <div v-for="(brewingSession, i) in brewingSessions">
                            <div v-if="i < 4">
                                <div class="card current-brew-card">
                                    <div class="card-body">
                                        <h5 class="card-title">{{brewingSession.recipe.name}}</h5>
                                        <div class="row">
                                            <div class="col-sm-6 justify-start">
                                                <h6>Start Date:</h6>
                                                <p class="card-text" maxlenght="30">{{moment(brewingSession.startBrewing).format("MMM Do YYYY")}}</p>
                                            </div>
                                            <div class="col-sm-6 justify-end">
                                                <h6>End Date:</h6>
                                                <p class="card-text" maxlenght="30">{{moment(brewingSession.endBrewing).format("MMM Do YYYY")}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <button class="btn btn-danger" v-if="profileUser._id == user._id" @click="deleteBrewingSession(brewingSession)">End Brew Session</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="favorites-tab" data-toggle="tab" href="#favorites" role="tab" aria-controls="favorites" aria-selected="true">Favorites</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="recipes-tab" data-toggle="tab" href="#recipes" role="tab" aria-controls="recipes" aria-selected="false">My Recipes</a>
            </li>
            <li class="nav-item" v-if="profileUser._id == user._id">
                <a class="nav-link" id="shopping-tab" data-toggle="tab" href="#shopping" role="tab" aria-controls="shopping" aria-selected="false">Shopping</a>
            </li>
            <li class="nav-item" v-if="profileUser._id == user._id">
                <a class="nav-link" id="brewing-tab" data-toggle="tab" href="#brewing" role="tab">Currently Brewing</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="favorites" role="tabpanel" aria-labelledby="favorites-tab">
                <h2>My Favorites:</h2>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3 col-sm-12" v-for="recipe in myFavorites">
                            <recipe :recipe="recipe"></recipe>
                            <div>
                                <div class="row btns">
                                    <div class="col-sm-12">
                                        <button type="button" class="btn btn-main" data-toggle="modal" :recipe='recipe' :data-target="'#'+recipe._id">
                                            <i class="fas fa-2x fa-external-link-alt"></i>
                                        </button>
                                        <button class="btn btn-positive" @click="addToShopping(recipe)" v-if="profileUser._id == user._id">
                                            <i class="far fa-2x fa-clipboard"></i>
                                        </button>
                                    </div>
                                    <div class="col-sm-12">
                                        <button type="button" class="btn btn-negative" :recipe='recipe' @click="removeFavRecipe(recipe)" v-if="profileUser._id == user._id">
                                            Remove
                                        </button>
                                        <button type="button" class="btn btn-main" data-toggle="modal" data-target="#startBrewingModal">
                                            Start
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="recipes" role="tabpanel" aria-labelledby="recipes-tab">
                <h2>My Recipes:</h2>
                <div class="container-fluid">
                    <div class="row my-recipes margin-top">
                        <div class="col-md-3 col-sm-12" v-for="recipe in myRecipes">
                            <recipe :recipe="recipe"></recipe>
                            <div>
                                <div class="row btns">
                                    <div class="col-sm-12">
                                        <button type="button" class="btn btn-main" data-toggle="modal" :recipe='recipe' :data-target="'#'+recipe._id">
                                            <i class="fas fa-2x fa-external-link-alt"></i>
                                        </button>
                                        <button class="btn btn-positive" @click="addToShopping(recipe)" v-if="profileUser._id == user._id">
                                            <i class="far fa-2x fa-clipboard"></i>
                                        </button>
                                        <button class="btn btn-positive" @click="favorite(recipe)" v-else-if="!recipe.favorited.includes(user._id)">
                                            <i class="far fa-2x fa-heart"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <button class="btn btn-negative" @click="removeRecipe(recipe)" v-if="profileUser._id == user._id">Remove Recipe</button>
                                    <button type="button" class="btn btn-main" v-if="profileUser._id == user._id" data-toggle="modal" data-target="#startBrewingModal">
                                        Start Brewing
                                    </button>
                                </div>

                                <!-- Modal -->
                                <div class="modal fade" id="startBrewingModal" tabindex="-1" role="dialog" aria-labelledby="startBrewingModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="startBrewingModalLabel">Time Selector Brewing</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <!-- <v-calendar is-extended :attributes='attrs'>
                                                    </v-calendar> -->
                                                <v-date-picker :min-date='new Date(Date.now())' is-double-paned v-model='selectedDays.startBrewing' show-caps @dayclick="selectDate"
                                                    mode="range">
                                                </v-date-picker>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-negative" @click="createBrewingSession(recipe)">
                                                    <i class="far fa-2x fa-clock"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="shopping" role="tabpanel" aria-labelledby="shopping-tab" v-if="profileUser._id == user._id">
                <h2>My Shopping List:</h2>
                <div class="container padding-top" v-if="shoppingList != undefined">
                    <h5>Fermentables</h5>
                    <button class="btn btn-negative" @click="clearShoppingList">Clear Shopping List</button>
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
                            <tr v-for="(fermentable, i) in shoppingList.fermentables" v-if="shoppingList.fermentables.length > 0">
                                <th scope="row">{{i + 1}}</th>
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
                            <tr v-for="(hop, i) in shoppingList.hops" v-if="shoppingList.hops.length > 0">
                                <th scope="row">{{i + 1}}</th>
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
                            <tr v-for="(grain, i) in shoppingList.steepingGrains" v-if="shoppingList.steepingGrains.length > 0">
                                <th scope="row">{{i + 1}}</th>
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
                            <tr v-for="(adjunct, i) in shoppingList.adjuncts" v-if="shoppingList.adjuncts.length > 0">
                                <th scope="row">{{i + 1}}</th>
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
                            <tr v-for="(yeast, i) in shoppingList.yeasts" v-if="shoppingList.yeasts.length > 0">
                                <th scope="row">{{i + 1}}</th>
                                <td>{{yeast.name}}</td>
                                <td>{{yeast.pitch}}</td>
                                <td>{{yeast.temp}} F</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="tab-pane fade" id="brewing" role="tabpanel" aria-labelledby="brewing-tab">
                <h2>Currently Brewing:</h2>
                <div class="container-fluid">
                    <div class="row my-recipes margin-top">
                        <div class="col-sm-12 d-flex justify-content-center">
                        </div>
                        <div class="col-sm-3" v-for="(brewingSession, i) in brewingSessions">
                            <div class="card current-brew-card">
                                <div class="card-body">
                                    <h5 class="card-title">{{brewingSession.recipe.name}}</h5>
                                    <div class="row">
                                        <div class="col-sm-6 justify-start">
                                            <h6>Start Date:</h6>
                                            <p class="card-text" maxlenght="30">{{moment(brewingSession.startBrewing).format("MMM Do YYYY")}}</p>
                                        </div>
                                        <div class="col-sm-6 justify-end">
                                            <h6>End Date:</h6>
                                            <p class="card-text" maxlenght="30">{{moment(brewingSession.endBrewing).format("MMM Do YYYY")}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-danger" v-if="profileUser._id == user._id" @click="deleteBrewingSession(brewingSession)">End Brew Session</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <foot></foot>
        </div>
    </div>
</template>

<script>
    import navbar from './Navbar'
    import recipe from './Recipe'
    import foot from './Foot'
    export default {
        name: 'Profile',
        mounted() {
            this.$store.dispatch('authenticate')
            this.$store.dispatch('getProfileUser', this.$route.params.profileId)
            this.$store.dispatch('getMyRecipes', this.$route.params.profileId)
            this.$store.dispatch('getMyFavorites', this.$route.params.profileId)
            this.$store.dispatch('getBrewingSessions', this.$route.params.profileId)
        },
        data() {
            return {
                attrs: [{
                    highlight: {
                        backgroundColor: '#BADA55'
                    },
                }],

                selectedDays: {
                    startBrewing: new Date(Date.now()),
                }
            }
        },
        methods: {
            // getDateString(date) {
            //     const options = {
            //         weekday: 'short',
            //         year: 'numeric',
            //         month: 'short',
            //         day: 'numeric'
            //     };
            //     return date.toLocaleDateString(window.navigator.userLanguage || window.navigator.language, options);
            // },
            selectDate(day) {
                // var addTime = 2592000000
                // this.selectedDay.start = day;
                this.selectedDays.endBrewing = new Date(day);
            },
            removeFavRecipe(recipe) {
                for (let i = 0; i < recipe.favorited.length; i++) {
                    const userId = recipe.favorited[i];
                    if (this.$store.state.user._id == userId) {
                        recipe.favorited.splice(i, 1)
                    }
                }
                this.$store.dispatch('updateFavorites', {
                    userId: this.user._id,
                    recipe: recipe
                })
            },
            addToShopping(recipe) {
                this.$store.dispatch('updateShoppingList', {
                    userId: this.user._id,
                    recipe: recipe
                })
            },
            favorite(recipe) {
                recipe.favorited.push(this.$store.state.user._id)
                this.$store.dispatch('updateFavorites', {
                    userId: this.user._id,
                    recipe: recipe
                })
            },
            getProfileUser(userId) {
                this.$store.dispatch('getProfileUser', userId)
            },
            getMyRecipes(userId) {
                this.$store.dispatch('getMyRecipes', userId)
            },
            getMyFavorites(userId) {
                this.$store.dispatch('getMyFavorites', userId)
            },
            clearShoppingList() {
                this.$store.dispatch('clearShoppingList', {
                    fermentables: [],
                    hops: [],
                    steepingGrains: [],
                    adjuncts: [],
                    yeasts: []
                })
            },
            removeRecipe(recipe) {
                this.$store.dispatch('removeRecipe', recipe)
            },
            createBrewingSession(recipe) {
                this.$store.dispatch('createBrewingSession', {
                    recipe: recipe,
                    startBrewing: this.selectedDays.startBrewing.start,
                    endBrewing: this.selectedDays.startBrewing.end
                })
                $("#startBrewingModal").modal('hide')
            },
            deleteBrewingSession(brewingSession) {
                this.$store.dispatch('deleteBrewingSession', brewingSession)
            },
            editProfile() {
                this.$store.dispatch('editProfile', this.profileUser)
            },
            getBrewingSession(userId) {
                this.$store.dispatch('getBrewingSessions', userId)
            },
            addFollower() {
                this.$store.dispatch('addFollower', {
                    user: this.user,
                    follower: {
                        name: this.profileUser.name,
                        _id: this.profileUser._id,
                        profilePic: this.profileUser.profilePic
                    }
                })
            },
            removeFollower(follower) {
                this.$store.dispatch('removeFollower', follower)
            },
            hasProfileUser(element, index, array) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i]._id == this.profileUser._id) {
                        return true
                    }
                }
                return false
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            profileUser() {
                return this.$store.state.profileUser
            },
            myRecipes() {
                return this.$store.state.myRecipes
            },
            myFavorites() {
                return this.$store.state.myFavorites
            },
            shoppingList() {
                return this.$store.state.shoppingList
            },
            brewingSessions() {
                return this.$store.state.brewingSessions
            },
            date() {
                return this.attribute.targetDate
            },
            isDate() {
                return this.date.isDate;
            },
            isRange() {
                return this.date.isRange;
            },
        },
        beforeRouteUpdate(to, from, next) {
            this.profileUser = this.getProfileUser(to.params.profileId)
            this.myRecipes = this.getMyRecipes(to.params.profileId)
            this.myFavorites = this.getMyFavorites(to.params.profileId)
            this.brewingSessions = this.getBrewingSession(to.params.profileId)
            next()
        },
        components: {
            navbar,
            recipe,
            foot
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .profile-pic {
        width: auto;
        height: 250px;
    }

    .main-profile,
    .nav {
        background-color: rgba(210, 180, 140, 0.4);
        padding-top: 1rem;
    }

    #recipes {
        min-height: 30%;
    }

    #shopping {
        min-height: 30%;
    }

    #favorites {
        min-height: 21.5vh;
    }

    .tab-content {
        padding-bottom: 1rem;
    }

    .btns .col-sm-12 {
        display: flex;
        justify-content: center;
    }

    .col-sm-12 .btn {
        margin: .1rem .5rem;
    }

    .my-recipes {
        justify-content: space-around
    }

    .padding-top {
        padding-top: 2rem
    }

    .margin-top {
        margin-top: 2rem
    }

    .re-adjust {
        margin-left: 0px;
        margin-right: 0px;
        margin-top: 2rem
    }

    .current-brew-card {
        margin-bottom: 2rem;
        text-align: center
    }

    h2 {
        padding: 15px 15px;
    }
</style>