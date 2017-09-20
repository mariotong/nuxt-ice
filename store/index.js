import Vuex from 'Vuex'
import actions from './actions'
import getters from './getters'
import mutations from ' ./mutations'

const createStore = () => {
  return new Vuex.store({
    state: {

    },
    getters,
    actions,
    mutations
  })
}

export default createStore
