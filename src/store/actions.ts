import { ActionTree } from 'vuex'
import { MappedActionOrMutationUtility } from './type-utils'
import { Context, State } from './'
import { Stage, Card } from '@/utils/api'
import { DBStage, DBCard } from '@/utils/db'

export interface RenameStagePayload {
  stage: DBStage
  title: string
}
export interface AddCardPayload {
  stage: DBStage
  title: string
  color: string
}
export interface RemoveCardPayload {
  card: DBCard
  stage: DBStage
}
export interface RenameCardPayload {
  stage: DBStage
  card: DBCard
  title: string
}
export interface ReorderCardsPayload {
  stage: DBStage
  cards: DBCard[]
}

export const actions = {
  async loadData({ commit }: Context) {
    commit(
      'setStages',
      (await Stage.all()).map(stage => stage.raw),
    )
  },
  async addStage({ commit, dispatch }: Context, stageTitle: string) {
    const stage = new Stage()
    stage.title = stageTitle
    commit('addStage', stage)
    try {
      await stage.save()
    } catch (e) {
      dispatch('throwError', e)
    }
  },
  async removeStage({ commit, dispatch }: Context, stage: DBStage) {
    commit('removeStage', stage)
    try {
      const connectedStage = await Stage.single(stage.id)
      if (!connectedStage) {
        return
      }
      await connectedStage.remove()
    } catch (e) {
      dispatch('throwError', e)
    }
  },
  async renameStage({ commit, dispatch }: Context, { stage, title }: RenameStagePayload) {
    commit('renameStage', { stage, title })
    try {
      const connectedStage = await Stage.single(stage.id)
      if (!connectedStage) {
        return
      }
      connectedStage.title = title
      await connectedStage.save()
    } catch (e) {
      dispatch('throwError', e)
    }
  },
  async reorderStages({ commit, dispatch }: Context, stages: DBStage[]) {
    const newList = stages.map((stage, index) => ({
      ...stage,
      order: index,
    }))
    commit('setStages', newList)
    try {
      await Stage.bulkSave(newList)
    } catch (e) {
      dispatch('throwError', e)
    }
  },
  async addCard({ commit, dispatch }: Context, { stage, title, color }: AddCardPayload) {
    const card = new Card(new Stage(stage))
    card.title = title
    card.color = color
    commit('addCard', { stage: stage, card: card.raw })
    try {
      await card.save()
    } catch (e) {
      dispatch('throwError', e)
    }
  },
  async removeCard({ commit, dispatch }: Context, { stage, card }: RemoveCardPayload) {
    commit('removeCard', { stage, card })
    try {
      await new Card(new Stage(stage), card).remove()
    } catch (e) {
      dispatch('throwError', e)
    }
  },
  async renameCard({ commit, dispatch }: Context, { stage, card, title }: RenameCardPayload) {
    commit('renameCard', { stage, card, title })
    const connectedCard = new Card(new Stage(stage), card)
    try {
      await connectedCard.save()
    } catch (e) {
      dispatch('throwError', e)
    }
  },
  async reorderCards({ commit, dispatch }: Context, { stage, cards }: ReorderCardsPayload) {
    const newList = cards.map((card, index) => ({
      ...card,
      order: index,
    }))
    commit('replaceCards', { stage, cards: newList })
    const connectedStage = new Stage(stage)
    connectedStage.cards = cards.map(card => new Card(connectedStage, card))
    try {
      await connectedStage.save()
    } catch (e) {
      dispatch('throwError', e)
    }
  },
  throwError(_: Context, err: unknown) {
    console.log(err)
  },
}

export type Actions = MappedActionOrMutationUtility<typeof actions>

export default actions as ActionTree<State, unknown>
