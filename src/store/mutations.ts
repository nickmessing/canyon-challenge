import { DBStage, DBCard } from '@/utils/db'
import { MutationTree } from 'vuex'
import { State } from './state'
import { CommitUtility, MappedActionOrMutationUtility } from './type-utils'

export const mutations = {
  setStages(state: State, payload: DBStage[]) {
    state.stages = payload
  },
  addStage(state: State, payload: DBStage) {
    state.stages.push(payload)
  },
  removeStage(state: State, payload: DBStage) {
    state.stages = state.stages.filter(stage => stage.id !== payload.id)
  },
  renameStage(state: State, payload: { stage: DBStage; title: string }) {
    const stage = state.stages.find(stage => stage.id === payload.stage.id)
    if (stage) {
      stage.title = payload.title
    }
  },
  addCard(state: State, payload: { stage: DBStage; card: DBCard }) {
    const stage = state.stages.find(stage => stage.id === payload.stage.id)
    if (stage) {
      stage.cards.push(payload.card)
    }
  },
  removeCard(state: State, payload: { stage: DBStage; card: DBCard }) {
    const stage = state.stages.find(stage => stage.id === payload.stage.id)
    if (stage) {
      stage.cards = stage.cards.filter(card => card.id !== payload.card.id)
    }
  },
  renameCard(state: State, payload: { stage: DBStage; card: DBCard; title: string }) {
    const stage = state.stages.find(stage => stage.id === payload.stage.id)
    if (stage) {
      const card = stage.cards.find(card => card.id === payload.card.id)
      if (card) {
        card.title = payload.title
      }
    }
  },
  replaceCards(state: State, payload: { stage: DBStage; cards: DBCard[] }) {
    const stage = state.stages.find(stage => stage.id === payload.stage.id)
    if (stage) {
      stage.cards = payload.cards
    }
  },
}

export type Commit = CommitUtility<typeof mutations>
export type Mutations = MappedActionOrMutationUtility<typeof mutations>

export default mutations as MutationTree<State>
