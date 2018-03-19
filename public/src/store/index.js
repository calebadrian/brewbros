import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import swal from 'sweetalert2'


var production = !window.location.host.includes('localhost')
var baseUrl = production ? '//brewbook.herokuapp.com/' : '//localhost:3000/'


var ourDB = axios.create({
    baseURL: baseUrl + 'api/',
    timeout: 10000,
    withCredentials: true
})

var auth = axios.create({
    baseURL: baseUrl + 'auth/',
    timeout: 5000,
    withCredentials: true
})

vue.use(vuex)

export default new vuex.Store({
    state: {
        user: {},
        profileUser: {},
        styles: [],
        categories: [],
        hops: [],
        adjuncts: [],
        yeasts: [],
        fermentables: [],
        newRecipe: {
            adjuncts: [],
            fermentables: [],
            steepingGrains: [],
            hops: [],
            yeasts: []
        },
        myRecipes: [],
        currentlyBrewing: [],
        myFavorites: [],
        allRecipes: [],
        shoppingList: {
            fermentables: [],
            hops: [],
            steepingGrains: [],
            adjuncts: [],
            yeasts: []
        }

    },
    mutations: {
        updateUser(state, payload) {
            state.user = payload
        },
        setProfileUser(state, payload) {
            state.profileUser = payload
        },
        setStyles(state, payload) {
            state.styles = payload
        },
        setCategories(state, payload) {
            state.categories = payload
        },
        setHops(state, payload) {
            state.hops = payload
        },
        setAdjuncts(state, payload) {
            state.adjuncts = payload
        },
        setYeasts(state, payload) {
            state.yeasts = payload
        },
        setFermentables(state, payload) {
            state.fermentables = payload
        },
        setCurrentlyBrewing(state, payload) {
            state.currentlyBrewing = payload
        },
        setMyRecipes(state, payload) {
            state.myRecipes = payload
        },
        setAllRecipes(state, payload) {
            state.allRecipes = payload
        },
        setMyFavorites(state, payload) {
            var tempArr = []
            for (let i = 0; i < payload.length; i++) {
                const recipe = payload[i];
                for (let x = 0; x < recipe.favorited.length; x++) {
                    const userId = recipe.favorited[x];
                    if (userId == state.user._id) {
                        tempArr.push(recipe)
                    }
                }
            }
            state.myFavorites = tempArr
        },
        addNewRecipeAdjunct(state, payload) {
            state.newRecipe.adjuncts.push(payload)
        },
        addNewRecipeYeast(state, payload) {
            state.newRecipe.yeasts.push(payload)
        },
        addNewRecipeHop(state, payload) {
            state.newRecipe.hops.push(payload)
        },
        addNewRecipeFermentable(state, payload) {
            state.newRecipe.fermentables.push(payload)
        },
        addNewRecipeSteepingGrain(state, payload) {
            state.newRecipe.steepingGrains.push(payload)
        },
        setShoppingList(state, payload){
            state.shoppingList = payload
        },
        updateShoppingListFermentables(state, payload) {
            for (var i = 0; i < payload.fermentables.length; i++) {
                var found = false
                for (var j = 0; j < state.shoppingList.fermentables.length; j++) {
                    if (payload.fermentables[i].name == state.shoppingList.fermentables[j].name) {
                        state.shoppingList.fermentables[j].quantity += payload.fermentables[i].quantity
                        found = true
                    }
                }
                if (!found) {
                    state.shoppingList.fermentables.push(payload.fermentables[i])
                }
            }
        },
        updateShoppingListHops(state, payload) {
            for (var i = 0; i < payload.hops.length; i++) {
                var found = false
                for (var j = 0; j < state.shoppingList.hops.length; j++) {
                    if (payload.hops[i].name == state.shoppingList.hops[j].name) {
                        state.shoppingList.hops[j].quantity += payload.hops[i].quantity
                        found = true
                    }
                }
                if (!found) {
                    state.shoppingList.hops.push(payload.hops[i])
                }
            }
        },
        updateShoppingListSteepingGrains(state, payload) {
            for (var i = 0; i < payload.steepingGrains.length; i++) {
                var found = false
                for (var j = 0; j < state.shoppingList.steepingGrains.length; j++) {
                    if (payload.steepingGrains[i].name == state.shoppingList.steepingGrains[j].name) {
                        state.shoppingList.steepingGrains[j].quantity += payload.steepingGrains[i].quantity
                        found = true
                    }
                }
                if (!found) {
                    state.shoppingList.steepingGrains.push(payload.steepingGrains[i])
                }
            }
        },
        updateShoppingListAdjuncts(state, payload) {
            for (var i = 0; i < payload.adjuncts.length; i++) {
                var found = false
                for (var j = 0; j < state.shoppingList.adjuncts.length; j++) {
                    if (payload.adjuncts[i].name == state.shoppingList.adjuncts[j].name) {
                        state.shoppingList.adjuncts[j].quantity += payload.adjuncts[i].quantity
                        found = true
                    }
                }
                if (!found) {
                    state.shoppingList.adjuncts.push(payload.adjuncts[i])
                }
            }
        },
        updateShoppingListYeasts(state, payload) {
            for (var i = 0; i < payload.yeasts.length; i++) {
                var found = false
                for (var j = 0; j < state.shoppingList.yeasts.length; j++) {
                    if (payload.yeasts[i].name == state.shoppingList.yeasts[j].name) {
                        state.shoppingList.yeasts[j].quantity += payload.yeasts[i].quantity
                        found = true
                    }
                }
                if (!found) {
                    state.shoppingList.yeasts.push(payload.yeasts[i])
                }
            }
        }

    },
    actions: {
        //region GET ACTIONS
        getStyles({ commit, dispatch, state }, payload) {
            var localData = localStorage.getItem('stylesData')
            if (localData) {
                console.log("localStorage")
                var stylesData = JSON.parse(localData);
                commit('setStyles', stylesData)
            } else {
                ourDB.get('styles')
                    .then(res => {
                        var stylesData = res.data;
                        localStorage.setItem('stylesData', JSON.stringify(stylesData))
                        commit('setStyles', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        getCategories({ commit, dispatch, state }, payload) {
            var localData = localStorage.getItem('categoriesData')
            if (localData) {
                console.log("localStorage")
                var categoriesData = JSON.parse(localData);
                commit('setCategories', categoriesData)
            } else {
                ourDB.get('categories')
                    .then(res => {
                        var categoriesData = res.data;
                        localStorage.setItem('categoriesData', JSON.stringify(categoriesData))
                        commit('setCategories', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        getHops({ commit, dispatch }, payload) {
            var localData = localStorage.getItem('hopsData')
            if (localData) {
                var hopsData = JSON.parse(localData);
                commit('setHops', hopsData)
            } else {
                ourDB.get('hops')
                    .then(res => {
                        var hopsData = res.data;
                        localStorage.setItem('hopsData', JSON.stringify(hopsData))
                        commit('setHops', res.data)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        },
        getAdjuncts({ commit, dispatch }, payload) {
            var localData = localStorage.getItem('adjunctData')
            if (localData) {
                var adjunctData = JSON.parse(localData);
                commit('setAdjuncts', adjunctData)
            } else {
                ourDB.get('adjuncts')
                    .then(res => {
                        var adjunctData = res.data;
                        localStorage.setItem('adjunctData', JSON.stringify(adjunctData))
                        commit('setAdjuncts', res.data)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        },
        getYeasts({ commit, dispatch }, payload) {
            var localData = localStorage.getItem('yeastData')
            if (localData) {
                var yeastData = JSON.parse(localData);
                commit('setYeasts', yeastData)
            } else {
                ourDB.get('yeasts')
                    .then(res => {
                        var yeastData = res.data;
                        localStorage.setItem('yeastData', JSON.stringify(yeastData))
                        commit('setYeasts', res.data)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        },
        getFermentables({ commit, dispatch }, payload) {
            var localData = localStorage.getItem('fermentableData')
            if (localData) {
                var fermentableData = JSON.parse(localData);
                commit('setFermentables', fermentableData)
            } else {
                ourDB.get('fermentables')
                    .then(res => {
                        var fermentableData = res.data;
                        localStorage.setItem('fermentableData', JSON.stringify(fermentableData))
                        commit('setFermentables', res.data)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        },
        getCurrentlyBrewing({ commit, dispatch }, paylaod) {
            ourDB.get('recipes/user/currentlyBrewing')
                .then(res => {
                    commit('setCurrentlyBrewing', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getProfileUser({ commit, dispatch }, payload) {
            ourDB.get('users/' + payload)
                .then(res => {
                    commit('setProfileUser', res.data)
                    commit('setShoppingList', res.data.shoppingList)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getMyRecipes({ commit, dispatch }, payload) {
            ourDB.get('recipes/user/' + payload)
                .then(res => {
                    commit('setMyRecipes', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getRecipes({ commit, dispatch }, payload) {
            ourDB.get('recipes')
                .then(res => {
                    commit('setAllRecipes', res.data)
                    commit('setMyFavorites', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        //endregion
        //Updating a recipe
        updateFavorites({ commit, dispatch }, payload) {
            ourDB.put('recipes/' + payload._id, payload.favorited)
                .then(res => {
                    dispatch('getRecipes')
                })
                .catch(err => {
                    console.error(err)
                })
        },
        updateShoppingList({ commit, dispatch, state }, payload) {
            ourDB.put('users/' + state.user._id, payload)
                .then(res => {
                    commit('updateUser', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
            commit('updateShoppingListFermentables', payload)
            commit('updateShoppingListHops', payload)
            commit('updateShoppingListSteepingGrains', payload)
            commit('updateShoppingListAdjuncts', payload)
            commit('updateShoppingListYeasts', payload)
        },
        clearShoppingList({commit, dispatch, state}, payload){
            ourDB.put('users/' + state.user._id, payload)
                .then(res => {
                    commit('updateUser', res.data)
                    commit('setShoppingList', res.data.shoppingList)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        //endregion

        //region ADD TO NEW RECIPE ACTIONS
        addNewRecipeAdjunct({ commit, dispatch }, payload) {
            commit('addNewRecipeAdjunct', payload)
        },
        addNewRecipeHop({ commit, dispatch }, payload) {
            commit('addNewRecipeHop', payload)
        },
        addNewRecipeYeast({ commit, dispatch }, payload) {
            commit('addNewRecipeYeast', payload)
        },
        addNewRecipeFermentable({ commit, dispatch }, payload) {
            commit('addNewRecipeFermentable', payload)
        },
        addNewRecipeSteepingGrain({ commit, dispatch }, payload) {
            commit('addNewRecipeSteepingGrain', payload)
        },
        //endregion

        //region POSTING TO DB
        addRecipe({ commit, dispatch }, payload) {
            ourDB.post('recipes', payload)
                .then(res => {
                    dispatch('getMyRecipes')
                    router.push({ name: 'profile', params: { profileId: payload.creatorId } })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        //endregion

        //region user and login actions
        createUser({ commit, dispatch, state }, payload) {
            auth.post('register', payload)
                .then(res => {
                    commit('updateUser', res.data)
                    swal({
                        position: 'top-end',
                        width: 300,
                        type: 'success',
                        title: 'Registration Successful',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    router.push({ name: 'profile', params: { profileId: state.user._id } })
                })
                .catch(err => {
                    console.error(err)
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                })
        },
        login({ commit, dispatch, state }, payload) {
            auth.post('login', payload)
                .then(res => {
                    commit('updateUser', res.data.user)
                    swal({
                        position: 'top-end',
                        width: 300,
                        type: 'success',
                        title: 'Login successful',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    router.push({ name: 'profile', params: { profileId: state.user._id } })
                })
                .catch(err => {
                    console.error(err)
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                })

        },
        authenticate({ commit, dispatch }, payload) {
            auth.get('authenticate', payload).then(res => {
                    commit('updateUser', res.data)
                })
                .catch(err => {
                    console.error(err);
                })
        },
        logout({ commit, dispatch }, payload) {
            auth.delete('logout')
                .then(res => {
                    commit('updateUser', {})
                    router.push({ name: 'Home' })
                })
                .catch(err => {
                    console.error(err)
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                })
        }
        //endregion
    }
})