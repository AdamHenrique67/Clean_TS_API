import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
    this.uri = uri
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    const collection = await this.client.db().collection(name)
    return collection
  },

  map: (data: any): any => {
    const { _id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { id: _id.toHexString() })
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}
