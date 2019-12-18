import Home from "./components/Home.vue";
import Detail from "./components/Detail.vue"
import Categories from "./components/Categories.vue"
import Random from "./components/Random.vue"

export default [
    {path: "/", component: Home},
    {path: "/detail/:code", component: Detail},
    {path: "/categories", component: Categories},
    {path: "/random", component: Random}
]