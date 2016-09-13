'use strict'

const { MongoClient: { connect } } = require('mongodb')

const { argv: [,, ...filter] } = process

const MONGODB_URL = 'mongodb://localhost:27017/test'

const name = RegExp(`^${filter.join(' ')}`, 'i')

connect(MONGODB_URL)
  .then(db => {
    db.collection('restaurants')
      .find({ name })
      .sort({ name: 1 })
      // .toArray()
      // .then((restaurants) => {
      //   restaurants.forEach(restaurant => {
      //     if (restaurant.name) {
      //       console.log(restaurant.name)
      //     }
      //   })
      // })
      // .then(() => db.close())
      .forEach(restaurant => {
        if (restaurant.name) {
          console.log(restaurant.name)
        }
      }, () => db.close())
  })
  .catch(console.error)
