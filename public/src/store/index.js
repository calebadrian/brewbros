import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'


var production = !window.location.host.includes('localhost')
var baseUrl = production ? '//brewbook.herokuapp.com/' : '//localhost:3000/'


var ourDB = axios.create({
    baseURL: baseUrl + 'api/',
    timeout: 5000,
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
        styles: [],
        hops: [],
        adjuncts: [],
        yeasts: [],
        newRecipe: {
            adjuncts: [],
            fermentables: [],
            steepingGrains: [],
            hops: [],
            yeasts: []
        },
        myRecipes: []
    },
    mutations: {
        setStyles(state, payload) {
            state.styles = payload
        },
        updateUser(state, payload){
            state.user = payload
        },
        setHops(state, payload){
            state.hops = payload
        },
        setAdjuncts(state, payload){
            state.adjuncts = payload
        },
        setYeasts(state, payload){
            state.yeasts = payload
        },
        setMyRecipes(state, payload){
            state.myRecipes = payload
        },
        addNewRecipeAdjunct(state, payload){
            state.newRecipe.adjuncts.push(payload)
        },
        addNewRecipeYeast(state, payload){
            state.newRecipe.yeasts.push(payload)
        },
        addNewRecipeHop(state, payload){
            state.newRecipe.hops.push(payload)
        }
    },
    actions: {
        //region GET ACTIONS
        getStyles({ commit, dispatch }, payload) {
            ourDB.get('styles')
                .then(res => {
                    commit('setStyles', res.data)

                })
                .catch(err => {
                    console.log(err)
                })
        },
        getHops({commit, dispatch}, payload){
            ourDB.get('hops')
                .then(res => {
                    commit('setHops', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getAdjuncts({commit, dispatch}, payload){
            ourDB.get('adjuncts')
                .then(res => {
                    commit('setAdjuncts', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getYeasts({commit, dispatch}, payload){
            ourDB.get('yeasts')
                .then(res => {
                    commit('setYeasts', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getMyRecipes({commit, dispatch}, payload){
            ourDB.get('recipes')
                .then(res => {
                    commit('setMyRecipes', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        //endregion
        
        //region ADD TO NEW RECIPE ACTIONS
        addNewRecipeAdjunct({commit, dispatch}, payload){
            commit('addNewRecipeAdjunct', payload)
        },
        addNewRecipeHop({commit, dispatch}, payload){
            commit('addNewRecipeHop', payload)
        },
        addNewRecipeYeast({commit, dispatch}, payload){
            commit('addNewRecipeYeast', payload)
        },
        //endregion

        //region POSTING TO DB
        addRecipe({commit, dispatch}, payload){
            ourDB.post('recipes', payload)
                .then(res => {
                    dispatch('getMyRecipes')
                    router.push({name: 'profile', params: {profileId: payload.creatorId}})
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
                commit('updateUser', res.data.user)
                router.push({ name: 'profile', params: {profileId: state.user._id} })
            })
                .catch(err => {
                    console.log(err)
                })
        },
        login({ commit, dispatch, state }, payload) {
            auth.post('login', payload).then(res => {
                commit('updateUser', res.data.user)
                router.push({ name: 'profile', params: {profileId: state.user._id} })
            })
                .catch(err => {
                    console.log('Invalid Username or Password')
                })

        },
        authenticate({ commit, dispatch }, payload) {
            auth.get('authenticate', payload).then(res => {
                commit('updateUser', res.data)
            })
                .catch(err => {
                    console.log(err);
                })
        },
        logout({ commit, dispatch }, payload) {
            auth.delete('logout')
                .then(res => {
                    commit('updateUser', {})
                    router.push({name: 'Home'})
                })
                .catch(err => {
                    console.log(err)
                })
        }
        //endregion
    }
})