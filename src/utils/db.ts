import { v4 as uuidv4 } from 'uuid'

export interface Database {
  lastReference: number
  stages: DBStage[]
}

export interface DBStage {
  id: string
  title: string
  order: number
  cards: DBCard[]
}

export interface DBCard {
  id: string
  title: string
  reference: number
  order: number
  color: string
}

const defaultDatabase: Database = {
  lastReference: 3,
  stages: [
    {
      id: 'b87e0c52-fe4e-4de3-a335-af046bbc07d9',
      title: 'To do',
      order: 0,
      cards: [
        {
          id: 'a4202556-8421-40e9-b05d-7774b586b3f3',
          title: 'My first matter',
          reference: 1,
          order: 0,
          color: '#2c7be5',
        },
        {
          id: '71d79108-302d-4ff2-ac58-23e0c4002b62',
          title: 'My second matter',
          reference: 2,
          order: 1,
          color: '#00d97e',
        },
      ],
    },
    {
      id: '14c8c00f-8a4e-4c6d-89b6-613511362f70',
      title: 'Doing',
      order: 1,
      cards: [
        {
          id: 'acb6e0d4-1e38-4332-94ea-78955f850a3b',
          title: 'My third matter',
          reference: 3,
          order: 0,
          color: '#2c7be5',
        },
      ],
    },
    {
      id: '4205e382-c167-49bb-ac82-43cc652cc966',
      title: 'Done',
      order: 2,
      cards: [],
    },
  ],
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const randomDatabaseDelay = (min = 40, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min
const throwErrorSometimes = (probability = 0) => {
  if (Math.random() <= probability) {
    throw new Error('database error')
  }
}

export class Connector {
  data: Database
  constructor() {
    this.data = this.readLocalStorageData() ?? defaultDatabase
  }

  readLocalStorageData() {
    const json = localStorage.getItem('canyon-database')
    if (json == null) {
      return null
    }
    let data: null | Database = null
    try {
      data = JSON.parse(json)
    } catch (e) {
      console.error('Database is broken, initializing new database')
    }
    return data
  }

  uuid() {
    return uuidv4()
  }

  async read() {
    await sleep(randomDatabaseDelay())
    throwErrorSometimes()
    return this.data
  }

  async write() {
    await sleep(randomDatabaseDelay())
    throwErrorSometimes()
    localStorage.setItem('canyon-database', JSON.stringify(this.data))
  }
}
