import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/views/Todo'
import Config from '@/config'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: Config.URL_PREFIX + '/',
      name: 'Todo',
      component: Todo
    }
  ]
})
