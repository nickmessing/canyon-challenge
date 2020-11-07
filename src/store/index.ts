import Vue from 'vue'
import Vuex from 'vuex'

import getters, { Getters } from './getters'
import mutations, { Commit, Mutations } from './mutations'
import actions, { Actions } from './actions'
import state, { State } from './state'
import { Dispatch } from 'vuex'

Vue.use(Vuex)

export interface Context {
  dispatch: Dispatch
  commit: Commit
  state: State
  getters: Getters
}

export { getters, mutations, actions, state, Getters, Commit, State, Mutations, Actions }

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
