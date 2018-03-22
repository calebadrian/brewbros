import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import swal from 'sweetalert2'
import Home from '@/components/Home'
import createRecipe from '@/components/createRecipe'
import Profile from '@/components/Profile'
import Results from '@/components/BrowseRecipes'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/createRecipe',
            name: 'createRecipe',
            component: createRecipe,
            beforeEnter: (to, from, next) => {
                if (!store.state.user.name && from.name){
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Please login to continue!'
                    })
                    next(false)
                } else {
                    next()
                }
            }
        },
        {
            path: '/profile/:profileId',
            name: 'profile',
            component: Profile,
            beforeEnter: (to, from, next) => {
                if (!store.state.user.name && from.name){
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Please login to continue!'
                    })
                    next(false)
                } else {
                    next()
                }
            }
        },
        {
            path: '/browse',
            name: 'browse',
            component: Results
        }
    ]
})