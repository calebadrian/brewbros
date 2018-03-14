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
        hops: []

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
        }
    },
    actions: {
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

        //user and login actions
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
    }
})