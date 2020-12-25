const count:number = 40
const x:Array<number> = []

for (let i = 0; i < count; i++) {
	x[i] = i
}

import * as tcb from '@cloudbase/node-sdk'
import * as _ from 'lodash'
import { getChartacterDMGBase } from './util'
import getGrwonList from './get-grown-list'

const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV,
});

const db = app.database();

export default async function getData({
	plusPercent = 0.05,
	_id,
	name,
	nickname,
}: {
	plusPercent: number,
	_id?: string,
	name?: string,
	nickname?: string,
}) {
	 const condition = _.omitBy({_id, name, nickname}, _.isNil)
   if (_.isEmpty(condition)) {
     return {
       status: -1,
       msg: '请传入_id, name, nickname中的一个'
     }
   }
  // const condition = { nickname: 'Diluc' }
   let rel = await db.collection('character').where(condition).get()
   const data = _.get(rel, 'data[0]')
   if (_.isEmpty(data)) {
     return {
       status: 404,
       msg: '没有查到数据'
     }
   }
   // 后期加入多等级角色数据...
   // 攻击力， 攻击百分比， 暴击率， 暴击伤害， 元素伤害加成
   const {
    Base_ATK,
    ATK_Percent,
    CRIT_Rate,
    CRIT_DMG,
    Physical_DMG_Bonus,
    Elemental_DMG_Bonus,
    Weapon_Type,
   } = data

   rel = await db.collection('weapon').where({ Weapon_Type }).get()
   let result = []
   for (let i = 0; i < rel.data.length; i++) {
     const baseData = getChartacterDMGBase(data, rel.data[i])
     result.push(getGrwonList(baseData))
   }
   return result
}