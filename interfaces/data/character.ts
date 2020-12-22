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

interface baseDB {
  _id?: string,
  name: string,
  describe?: string,
}

interface actDT {
  Level: number
  Base_ATK: number
  ATK_Percent: number
  CRIT_Rate?: number
  CRIT_DMG?: number
  Physical_DMG_Bonus?: number
  Weapon_Type?: weaponType
  Elemental_Type: element
  Elemental_DMG_Bonus?: number
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

export { weaponType, actDT, baseDB }