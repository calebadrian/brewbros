import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import createRecipe from '@/components/createRecipe'

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
        }
    ]
})