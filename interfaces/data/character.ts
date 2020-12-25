enum element {
  fire = 1,
  water,
  ice,
  thunder,
  wind,
  rock,
  grass
}

enum region {
  mengde = 1,
  liyue,
  zhidong,
  lei,
  huo,
  shui,
  feng
}
enum weaponType {
  Claymore = 1,
  Catalyst,
  Bow,
  Sward,
  Polearm
}
const Weapon_Type_Name: any = {
  [weaponType.Claymore]: '双手剑',
  [weaponType.Catalyst]: '法器',
  [weaponType.Bow]: '弓',
  [weaponType.Sward]: '单手剑',
  [weaponType.Polearm]: '长柄武器',
}

interface baseDB {
  _id?: string,
  name: string,
  describe?: string,
}

interface actDT {
  Level: number
  Base_ATK: number
  ATK_Percent: number
  CRIT_Rate: number
  CRIT_DMG: number
  Physical_DMG_Bonus: number
  Weapon_Type: weaponType
  Elemental_Type: element
  Elemental_DMG_Bonus: number
  Elemental_Mastery?: number
  Energy_Recharge?: number
  rate?: number
  nickname?: string
}

interface character extends actDT, baseDB {
  HP: number
  Region?: region
}

export default character

export { weaponType, actDT, baseDB, Weapon_Type_Name }