if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod')
} else {
  console.log('DEVELOPMENT ENV')
  module.exports = require('./configureStore.dev')
}