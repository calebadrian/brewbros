import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

var production = !window.location.host.includes('localhost')
var key = '?key=e96ab9f00ea6c4d6e6ad50967fc0627d&format=json'
var baseUrl = production ? '//brewbook.herokuapp.com/' : '//localhost:3000/'

let beerDB = axios.create({
    baseURL: 'http://api.brewerydb.com/v2/',
    timeout: 10000
})

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

    },
    mutations: {
        setStyles(state, payload) {
            state.styles = payload
        }
    },
    actions: {
        getStyles({ commit, dispatch }, payload) {
            beerDB.get('styles')
                .then(res => {
                    commit('setStyles', payload)

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})