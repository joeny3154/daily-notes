import Vue from 'vue'
import Vuex from 'vuex'
import { getNpmInfo } from '../api'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }) {
        return getNpmInfo().then(items => {
          commit('setItem', { items })
        })
      }
    },
    mutations: {
      setItem(state, { items }) {
        console.log('items==>', items)
        state.items = items
        // Vue.set(state.items, id, item)
      }
    }
  })
}