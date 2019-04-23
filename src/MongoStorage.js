const { MongoClient, Db } = require('mongodb')

class MongoStorage {
  constructor ({ db, collectionName }) {
    this.collectionName = collectionName
    this.db = db

    if (db instanceof Db) {
      this.connection = db
    } else if (typeof db === 'string') {
      this._connect()
    } else {
      throw new Error('Invalid parameter db')
    }
  }

  async _connect () {
    const client = await MongoClient.connect(this.db, { useNewUrlParser: true })
    this.connection = client.db()
  }

  async set (key, value) {
    if (!this.connection) {
      await this._connect()
    }
    return this.connection.collection(this.collectionName)
      .updateOne({ key }, { $set: { value } }, { upsert: true })
      .then(res => res.ok === 1)
  }

  async get (key) {
    if (!this.connection) {
      await this._connect()
    }
    return this.connection.collection(this.collectionName)
      .findOne({ key })
      .then(res => (res && res.value) || undefined)
  }

  async delete (key) {
    if (!this.connection) {
      await this._connect()
    }
    return this.connection.collection(this.collectionName)
      .deleteOne({ key })
      .then(res => !!res.deletedCount)
  }
}

module.exports = MongoStorage
