const tcb = require('@cloudbase/node-sdk')
const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV,
});

const db = app.database();

module.exports = async (event, context) => {
  const {
    _id,
    collection
  } = event;
  if (!_id) {
    return {
      status: -2,
      msg: '没传入_id',
    };
  }
	const col = db.collection(collection)
	const doc = await col.where({ _id }).get()
	if (!doc.data || doc.data.length === 0) {
		return {
			status: -1,
			msg: `集合${collection}内没有数据${_id}`
		}
	}
	const res = await col.doc(_id).remove()
	if (res.deleted === 1) {
		return {
			status: 0,
			msg: `成功删除${collection}内数据${_id}`
		}
	} else {
		return {
			status: -2,
			msg: '删除数据失败'
    }
  }
};