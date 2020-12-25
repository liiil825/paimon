import characterDT from '../../../interfaces/data/character'
import weaponDT from '../../../interfaces/data/weapon'
import _ from 'lodash'

// const ATK_DEFUAT_ADD = 311
const DEFAULT_WEAPON_DEF = 23

function getChartacterDMGBase(characterData: characterDT, weaponData: weaponDT) {
	if (_.isEmpty(characterData) || _.isEmpty(weaponData) ||
	 _.isNil(weaponData) || _.isNil(weaponData)) {
		 return {}
	}
	const data = _.assign({}, characterData)
	data.weaponName = weaponData.name
	data.Base_ATK = Number(characterData.Base_ATK) + Number(weaponData.Base_ATK) +
	- DEFAULT_WEAPON_DEF
	data.ATK_Percent = Number(characterData.ATK_Percent) / 100 + 
	 Number(weaponData.ATK_Percent) / 100 + 1
	data.Elemental_DMG_Bonus = Number(characterData.Elemental_DMG_Bonus) / 100 +
	 Number(weaponData.Elemental_DMG_Bonus) / 100 + 1
	data.CRIT_Rate = Number(characterData.CRIT_Rate) / 100 + Number(weaponData.CRIT_Rate) / 100 + 0.05
	data.CRIT_DMG = Number(characterData.CRIT_DMG) / 100 + Number(weaponData.CRIT_DMG) / 100 + 0.5
	// 沙漏添加攻击
	data.ATK_Percent += 0.466
	// 元素杯
	data.Elemental_DMG_Bonus += 0.466
	data.CRIT_Rate += 0.311
	return data
}

export { getChartacterDMGBase }