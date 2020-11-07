import { GetterTree } from 'vuex'
import { GetterResultsUtility } from './type-utils'
import { State } from './'

export const stages = (state: State) => state.stages
export const getters = {
  stages,
}

export type Getters = GetterResultsUtility<typeof getters>

export default getters as GetterTree<State, unknown>
