<template>
    <div class="Home container-fluid">
        <div class="row">
            <navbar></navbar>
        </div>
        <div class="row">
            <div class="col-sm-12 hero">
                <h1>Welcome to BrewBros</h1>
                <h2>Organizing all of your Homebrewing needs</h2>
                <div class="hero-content">
                    <router-link :to="{name: 'browse'}">
                        <button class="btn btn-success my-2 my-sm-0">Browse Recipes</button>
                    </router-link>
                    <div v-if="user.name">
                        <router-link :to="{name: 'createRecipe'}">
                            <button class="btn btn-primary my-2 my-sm-0 ml-2">Create Recipe</button>
                        </router-link>
                    </div>
                    <div v-else>
                        <button class="btn btn-primary my-2 my-sm-0 ml-2" data-toggle="modal" data-target="#registerModal">Register</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row description-section">
            <div class="col-12 summary">
                <h4>WHAT WE'VE BREWED UP FOR YOU:</h4>
                <p>BrewBros is a home-brew assistance and tracking app. You can create a recipe from scratch, favorite and use
                    an already created recipe or re-visit a recipe you previously created. Each recipe is open for ratings
                    so you know if someone else recipe is good or one to pass on. This social aspect bleeds over into the
                    profiles where you can follow your friends and have their recipes display in their own special section
                    on the Browse Recipes page. Use your profile to organize your recipes, create a shopping list, or remove
                    recipes that you didn’t like!
                </p>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <h4>CREATE A RECIPE:</h4>
                        <p>Our create a recipe page features an advanced form to add each brewing ingredient, amount, boil time
                            and brewing instructions to your recipe. Need help finding your ingredient? Just start typing,
                            every field is searchable. Once you’ve added each ingredient and completed the form, it will
                            automatically run the calculations needed to determine metrics of your new beer and will indicate
                            if your beer will match the style you’ve selected.</p>
                        <p>By default each new recipe is displayed on the Browse Recipes page. Don’t want others to see your
                            secret recipe? Make it private and it will only be displayed on your profile for you to see.</p>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <img src="../assets/tim-gouw-463601-unsplash.jpg">
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <img src="../assets/stefan-cosma-521680-unsplash.jpg">
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <h4>BROWSE RECIPES:</h4>
                        <p>The hub of the site, browse recipes, is where you can see your recipes, search all submitted recipes,
                            favorite and/or rate them. Don’t care about all of the recipes? Tab over and view only the recipes
                            of the brewers that you’ve chosen to follow. See something you do like? Favorite it and it will
                            be added to your profile for later brewing.</p>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <h4>BREWER PROFILE:</h4>
                        <P>Your profile is the hub of your activities, from here you can keep track of anything your currently
                            brewing, browse the recipes you’ve favorited, edit or remove the recipes you’ve created or if
                            you need supplies, add a recipe to your shopping list! Want to get social? Search the other members
                            of the site and follow them, it’ll add a link to their profile onto yours and add any of their
                            recipes to the “Followed Brewers” section of the Browse Recipes page.</P>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <img src="../assets/karolina-szczur-504607-unsplash.jpg">
                    </div>
                </div>
            </div>
        </div>
        <foot></foot>
    </div>
</template>

<script>
    import navbar from './Navbar'
    import foot from './Foot'
    export default {
        name: 'Home',
        data() {
            return {

            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        components: {
            navbar,
            foot
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hero {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('../assets/karolina-szczur-504609-unsplash.jpg');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 91.5vh;
        width: 100%;
        color: white;
    }

    .hero-content {
        display: flex;
    }

    .description-section {
        min-height: 65vh;
        background: black;
        color: white;
        padding: 1rem;
        justify-content: flex-start;
    }

    .summary {
        text-align: center;
        padding: 1rem 0;
    }

    h1 {
        font-size: 6rem;
        text-shadow: 4px 4px 10px rgba(147, 220, 251, 0.8);
        font-family: 'Viga', sans-serif;
        font-style: italic;
    }

    @media screen and (max-width: 1024px) {
        h1 {
            font-size: 4rem;
            text-shadow: 4px 4px 10px rgba(147, 220, 251, 0.8);
            font-family: 'Viga', sans-serif;
            font-style: italic;
        }
    }

    h2 {
        font-size: 2rem;
        text-shadow: 4px 4px 10px rgba(147, 220, 251, 0.8);
        font-family: 'Viga', sans-serif;
    }

    h4 {
        text-align: center;
        padding: 1rem 0;
    }

    p {
        font-size: 1.15rem;
    }

    img {
        width: 100%;
    }
</style>