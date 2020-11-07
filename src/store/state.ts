import { DBStage } from '@/utils/db'

export interface State {
  stages: DBStage[]
}

export const state: State = {
  stages: [],
}

export default state
