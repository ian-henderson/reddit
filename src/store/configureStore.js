if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod')
} else {
  console.log('In Development Mode')
  module.exports = require('./configureStore.dev')
}