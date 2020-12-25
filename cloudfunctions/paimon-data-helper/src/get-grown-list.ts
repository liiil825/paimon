import characterDT from '../../../interfaces/data/character'
import _ from 'lodash'

const count = 39
// 最佳情况下，最少起码能提升 4 次攻击力
const plusACTCount = 4
// 最多提升攻击力的次数
const plusACTMax = 24
const plusPercent = 0.05
const plusCRITRateStep = plusPercent / 3
const plusCRITDMGStep = plusPercent * 2 / 3
const ATK_DEFUAT_ADD = 311
const CRITRate_Percent = 0.2

export default function getGrwonList(data: characterDT) {
	const list:Array<Array<number>> = []
	let bestGrownList:number[] = []
	const rateList:Array<Array<number>> = []
	const dmgList:Array<Array<number>> = []
	let maxDMG = 0
	const result = _.assign({}, data)
	for (let i = plusACTCount; i < plusACTMax; i++) {
    let dataCRITRate = data.CRIT_Rate
    let dataCRITDMG = data.CRIT_DMG
		list[i - plusACTCount] = []
		rateList[i - plusACTCount] = []
		dmgList[i - plusACTCount] = []
		for (let j = 0; j < i; j++) {
			list[i - plusACTCount][j] = ((data.ATK_Percent + plusPercent * (j + 1)) *
			 data.Base_ATK + ATK_DEFUAT_ADD) * (data.Elemental_DMG_Bonus) * (data.CRIT_Rate * data.CRIT_DMG + 1)
			list[i - plusACTCount][j] = Number(list[i - plusACTCount][j].toFixed(2))
		}
    let dataATK = data.Base_ATK * (data.ATK_Percent + plusPercent * plusACTCount) + ATK_DEFUAT_ADD
		for (let k = i; k < count; k++) {
			if (dataCRITRate < CRITRate_Percent ||
					(dataCRITRate < 1 &&
						(dataCRITRate + plusCRITRateStep * 2) * 2 < dataCRITDMG)
			) {
				dataCRITRate = _.min([dataCRITRate + plusCRITRateStep * 2, 1]);
				list[i - plusACTCount][k] = dataATK * (data.Elemental_DMG_Bonus) *
				 (dataCRITRate * dataCRITDMG + 1)
			} else if (dataCRITRate >= 1 ||
		 	  dataCRITRate * 2 > dataCRITDMG + plusCRITDMGStep * 2) {
				dataCRITDMG += plusCRITDMGStep * 2;
				list[i - plusACTCount][k] = dataATK * (data.Elemental_DMG_Bonus) *
				 (dataCRITRate * dataCRITDMG + 1)
			} else {
				dataCRITRate = _.min([dataCRITRate + plusCRITRateStep, 1]);
				dataCRITDMG += plusCRITDMGStep
				list[i - plusACTCount][k] = dataATK * (data.Elemental_DMG_Bonus) *
				 (dataCRITRate * dataCRITDMG + 1)
			}
			list[i - plusACTCount][k] = Number(list[i - plusACTCount][k].toFixed(2))
			rateList[i - plusACTCount][k] = dataCRITRate
			dmgList[i - plusACTCount][k] = dataCRITDMG
		}
		if (list[i - plusACTCount][count - 1] > maxDMG) {
			maxDMG = list[i - plusACTCount][count - 1]
			bestGrownList = list[i - plusACTCount]
			result.flag = i
			result.CRIT_Rate = dataCRITRate;
			result.CRIT_DMG = dataCRITDMG;
			result.maxDMG = maxDMG;
			result.ATK_Percent = data.ATK_Percent + plusPercent * (i + 1);
			result.bestGrownList = bestGrownList
			result.rateList = rateList[i - plusACTCount]
			result.dmgList = dmgList[i - plusACTCount]
		}
	}
	return result
}