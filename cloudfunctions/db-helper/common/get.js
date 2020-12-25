const tcb = require('@cloudbase/node-sdk')
const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV,
});

const db = app.database();

module.exports = async (event, context) => {
  const {
    collection,
    page,
    count,
    _id,
  } = event;
  const col = db.collection(collection);
  if (_id) {
    return await col.where({ _id }).get();
  }

  const { condiction } = event
  if (condiction) {
    const { total } = await col.where(condiction).count()

    const data = await col.where(condiction).limit(count).skip((page - 1) * count).get()
    return {
      total,
      ...data
    }
  }

  const { total } = await col.count()
  const data = await col.limit(count).skip((page - 1) * count).get()
  return {
    total,
    ...data
  }
};