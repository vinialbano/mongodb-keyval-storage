const MongoStorage = require('../src/MongoStorage')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { MongoClient } = require('mongodb')

let mongod

beforeAll(() => {
  mongod = new MongoMemoryServer()
})

afterAll(async () => {
  await mongod.stop()
})

describe('when a connection string is passed', () => {
  let storage
  beforeAll(async () => {
    const db = await mongod.getConnectionString()
    storage = new MongoStorage({
      db,
      collectionName: 'collection'
    })
  })

  test('storage API', async () => {
    ['get', 'set', 'delete'].forEach(method => {
      expect(storage[method]).toBeInstanceOf(Function)
    })
  })

  test('storage set/get', async () => {
    storage.set('abc', 123)
    storage.set('another', 'foo')
    const found = await storage.get('abc')
    expect(found).toBe(123)
  })

  test('storage delete/get', async () => {
    await storage.delete('abc')
    const abc = await storage.get('abc')
    const another = await storage.get('another')
    expect(abc).toBeUndefined()
    expect(another).toBe('foo')
  })
})

describe('when a database connection is passed', () => {
  let storage
  beforeAll(async () => {
    const client = await MongoClient.connect(await mongod.getConnectionString(), { useNewUrlParser: true })
    const db = client.db()
    storage = new MongoStorage({ db, collectionName: 'collection' })
  })

  test('storage API', async () => {
    ['get', 'set', 'delete'].forEach(method => {
      expect(storage[method]).toBeInstanceOf(Function)
    })
  })

  test('storage set/get', async () => {
    storage.set('abc', 123)
    storage.set('another', 'foo')
    const found = await storage.get('abc')
    expect(found).toBe(123)
  })

  test('storage delete/get', async () => {
    await storage.delete('abc')
    const abc = await storage.get('abc')
    const another = await storage.get('another')
    expect(abc).toBeUndefined()
    expect(another).toBe('foo')
  })
})
