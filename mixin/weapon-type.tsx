import { Component, Vue } from 'vue-property-decorator' 
import { Weapon_Type_Name } from '~/interfaces/data/character'

@Component
export default class GetWeaponName extends Vue {
  getWeaponName(weaponTyep: number) {
    return Weapon_Type_Name[weaponTyep]
  }
}
