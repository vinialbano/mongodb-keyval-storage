# mongodb-keyval-storage
Key Value Storage for MongoDB with a simple API

[![Build Status](https://travis-ci.org/vinialbano/mongodb-keyval-storage.svg?branch=master)](https://travis-ci.org/vinialbano/mongodb-keyval-storage)
[![Coverage Status](https://coveralls.io/repos/github/vinialbano/mongodb-keyval-storage/badge.svg?branch=master)](https://coveralls.io/github/vinialbano/mongodb-keyval-storage?branch=master)

## Installation

  `npm install mongodb-keyval-storage`
  
## Usage

### Configure Strategy

  The MongoStorage constructor receives two parameters:

  * `db`: A MongoDB database connection or a connection string.
  * `collectionName`: The name of the collection used to save the data.
  
  ```javascript
    const storage = new MongoStorage({
      db: 'mongodb://localhost:27017/db',
      collectionName: 'myCollection'
    })
  ```
  
### API

#### Set
  Adds a value with it's respective key to the database. Returns a promise.
  
  ```javascript
  await storage.set('key', 'value')
  ```
  
#### Get
  Returns promise that resolves to a value given it's respective key.
  
  ```javascript
  const value = await storage.get('key')
  ```  
  
#### Delete
  Removes the key and value from the database, given the key. Returns a promise.
  
  ```javascript
  await storage.delete('key')
  ```
