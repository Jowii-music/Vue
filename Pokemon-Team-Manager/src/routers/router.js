import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home.vue'
import Pokedex from '../views/pokedex.vue'
import Teams from '../views/teams.vue'

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/pokedex',
            component: Pokedex
        },
        {
            path: '/teams',
            component: Teams
        }
    ]
})

export default router