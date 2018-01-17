if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION ENV')
  module.exports = require('./configureStore.prod')
} else {
  console.log('DEVELOPMENT ENV')
  module.exports = require('./configureStore.dev')
}