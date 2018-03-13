import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import createRecipe from '@/components/createRecipe'
import Profile from '@/components/Profile'
import Results from '@/components/Results'

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
            component: createRecipe
        },
        {
            path: '/profile/:profileId',
            name: 'profile',
            component: Profile
        },
        {
            path: '/browse',
            name: 'browse',
            component: Results
        }
    ]
})