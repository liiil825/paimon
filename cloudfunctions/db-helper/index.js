const get = require('./common/get')
const add = require('./common/add')
const remove = require('./common/delete')
const update = require('./common/update')

exports.main = async (event, context) => {
  const { ACTION, ...parms } = event;
  switch (ACTION) {
    case 'ADD':
      return await add(parms, context)
    case 'DELETE':
      return await remove(parms, context)
    case 'UPDATE':
      return await update(parms, context)
  }

  return await get(parms, context)
};