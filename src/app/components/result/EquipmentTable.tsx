import React from 'react'
import { Equipment } from '~/app/util/calc'
import Table from '../common/Table'
import ArmorName from './ArmorName'
import CharmName from './CharmName'
import DecoName from './DecoName'

require('./EquipmentTable.css')

interface Props {
  equipment: Equipment
}

const EquipmentTable: React.FC<Props> = ({ equipment }) =>
  <Table className="EquipmentTable">
    <tbody>
      <tr>
        <th>Defense</th>
        <td>{equipment.def}</td>
      </tr>
      {equipment.weaponSkill !== 'none' && (
        <tr>
          <th>Awakened Skill</th>
          <td>{equipment.weaponSkill}</td>
        </tr>
      )}
      <tr>
        <th>Head</th>
        <td><ArmorName type="head" name={equipment.head} /></td>
      </tr>
      <tr>
        <th>Body</th>
        <td><ArmorName type="body" name={equipment.body} /></td>
      </tr>
      <tr>
        <th>Arms</th>
        <td><ArmorName type="arm" name={equipment.arm} /></td>
      </tr>
      <tr>
        <th>Waist</th>
        <td><ArmorName type="wst" name={equipment.wst} /></td>
      </tr>
      <tr>
        <th>Legs</th>
        <td><ArmorName type="leg" name={equipment.leg} /></td>
      </tr>
      <tr>
        <th>Charm</th>
        <td><CharmName name={equipment.charm} /></td>
      </tr>
      <tr>
        <th>Decos</th>
        <td>
          <ul className="EquipmentTable-decos">
            {equipment.decos.map(({ name, value }) =>
              <li key={name}><DecoName name={name} /> x{value}</li>
            )}
            {!!equipment.slot1 &&
              <li>Unused Lv1 Slot x{equipment.slot1}</li>
            }
            {!!equipment.slot2 &&
              <li>Unused Lv2 Slot x{equipment.slot2}</li>
            }
            {!!equipment.slot3 &&
              <li>Unused Lv3 Slot x{equipment.slot3}</li>
            }
            {!!equipment.slot4 &&
              <li>Unused Lv4 Slot x{equipment.slot4}</li>
            }
          </ul>
        </td>
      </tr>
    </tbody>
  </Table>

export default EquipmentTable
