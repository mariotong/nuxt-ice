//import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

const createStore = () => {
  return new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
}

export default createStore
