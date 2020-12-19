const tcb = require("@cloudbase/node-sdk");
const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV,
});

const db = app.database();

module.exports = async (event, context) => {
  const {
    collection,
    ...data
  } = event;
  const col = db.collection(collection);

  return await col.add(data);
};