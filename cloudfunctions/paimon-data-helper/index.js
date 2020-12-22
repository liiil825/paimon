const handler = require('./dist/main')

exports.main = async (event, context) => {
  return await handler.default(event, context)
}