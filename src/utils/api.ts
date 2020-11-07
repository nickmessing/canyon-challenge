import { Connector, DBStage, DBCard } from './db'

const connection = new Connector()

export class Stage implements Omit<DBStage, 'cards'> {
  id = connection.uuid()
  title = ''
  order = -1
  cards = [] as Card[]

  constructor(stage?: DBStage) {
    if (stage) {
      this.id = stage.id
      this.title = stage.title
      this.order = stage.order
      this.cards = stage.cards.map(card => new Card(this, card)).sort((a, b) => a.order - b.order)
    }
    if (this.order === -1) {
      let order = 1
      connection.data.stages.forEach(stage => {
        if (stage.order >= order) {
          order = stage.order + 1
        }
      })
      this.order = order
    }
  }

  // Utility API

  get raw(): DBStage {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      cards: this.cards.map(card => card.raw),
    }
  }

  get newCardOrder() {
    let order = 1
    this.cards.forEach(card => {
      if (card.order >= order) {
        order = card.order + 1
      }
    })
    return order
  }

  replaceOrAddCard(card: Card) {
    this.cards = [...this.cards.filter(el => el.id !== card.id), card]
    return this.save()
  }

  removeCard(id: string) {
    this.cards = [...this.cards.filter(el => el.id !== id)]
    return this.save()
  }

  // Public API

  static async all() {
    const data = await connection.read()
    return data.stages.map(stage => new Stage(stage)).sort((a, b) => a.order - b.order)
  }
  static async single(id: string) {
    const data = await connection.read()
    const stage = data.stages.find(stage => stage.id === id)
    return stage ? new Stage(stage) : null
  }
  async save() {
    connection.data.stages = [...connection.data.stages.filter(stage => stage.id !== this.id), this.raw]
    return connection.write()
  }
  async remove() {
    connection.data.stages = connection.data.stages.filter(stage => stage.id !== this.id)
    return connection.write()
  }
  static async bulkSave(stages: (Stage | DBStage)[]) {
    connection.data.stages = stages.map(stage => ('raw' in stage ? stage.raw : stage))
    return connection.write()
  }
}

export class Card implements DBCard {
  id = connection.uuid()
  title = ''
  reference = -1
  order = -1
  color = ''

  private parentStageId: string

  constructor(parentStage: Stage)
  constructor(parentStage: Stage, card: DBCard)
  constructor(parentStage: Stage, card?: DBCard) {
    this.parentStageId = parentStage.id
    if (card) {
      this.id = card.id
      this.title = card.title
      this.reference = card.reference
      this.order = card.order
      this.color = card.color
    }
    if (this.order === -1) {
      this.order = parentStage.newCardOrder
    }
    if (this.reference === -1) {
      this.reference = ++connection.data.lastReference
    }
  }

  // Utility API

  get raw(): DBCard {
    return {
      id: this.id,
      title: this.title,
      reference: this.reference,
      order: this.order,
      color: this.color,
    }
  }

  // Public API

  async save() {
    const parentStage = await Stage.single(this.parentStageId)
    if (!parentStage) {
      throw new Error('Parent stage ID not found')
    }
    return parentStage.replaceOrAddCard(this)
  }
  async remove() {
    const parentStage = await Stage.single(this.parentStageId)
    if (!parentStage) {
      throw new Error('Parent stage ID not found')
    }
    return parentStage.removeCard(this.id)
  }
}
