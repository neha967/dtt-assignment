import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource"
import VueRouter from "vue-router"
import Routes from "./routes"
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import XMLWriter from "xml-writer"

Vue.use(BootstrapVue)

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: "history"
})

function getRoutesList(routes, pre) {
  return routes.reduce((array, route) => {
    const path = `${pre}${route.path}`;

    if(route.path === "/detail/:code"){
      let allCountries = localStorage.getItem("allCountries")
      let parsedJSONCountries = JSON.parse(allCountries);

      for(let i = 0; i < parsedJSONCountries.length; i++){
        let dynamicDetailPath = `${pre}/detail/${parsedJSONCountries[i].alpha3Code}`
        array.push(dynamicDetailPath);
      }
    }

    if (route.path !== '*' && route.path !== "/detail/:code") {
      array.push(path);
    }

    if (route.children) {
      array.push(...getRoutesList(route.children, `${path}/`));
    }

    return array;
  }, []);
}

function getRoutesXML() {
  let xw;
  xw = new XMLWriter;
  xw.startDocument();
  const list = getRoutesList(router.options.routes, 'http://localhost:8080')
    .map(route => {
      xw.startElement('url')
      xw.startElement('loc')
      xw.text(route);
      xw.endElement('loc')
      xw.endElement('url')
    })
    .join('\r\n');
    xw.endDocument();
    return xw.toString()
}

console.log(getRoutesXML());

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})