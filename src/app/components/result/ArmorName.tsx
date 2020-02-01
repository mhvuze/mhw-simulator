import React, { useCallback, useState } from 'react'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { arm, body, charm, head, leg, wst } from '~/app/util/generatedUtil'
import Table from '../common/Table'
import Modal from '../modal/Modal'
import SkillTable from './SkillTable'
import SlotTable from './SlotTable'

require('./ArmorName.css')

const info: Record<string, typeof arm> = { arm, body, charm, head, leg, wst }

const getEquipInfo = (type: string, name: string) => {
  const ref = info[type]

  return ref ? ref[name] : null
}

interface Props {
  name: string | undefined
  type: string
}

const ArmorName: React.FC<Props> = ({ name, type }) => {
  const ignoreArmor = useIgnoreArmors()
  const { toggle } = useIgnoreArmorsActions()
  const toggleArmor = useCallback(() => name && toggle(name), [name])

  const isIgnore = name && ignoreArmor[name] === 0

  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = useCallback(() => setModalOpen(state => !state), [])

  const info = isModalOpen ? getEquipInfo(type, name!) : null

  return (
    <>
      <span className={`ArmorName ${name ? 'on' : ''}`} onClick={name ? toggleModal : undefined}>
        {name || 'No Equipment'}
      </span>
      {info &&
        <Modal title={name} onClose={toggleModal}>
          <Table className="ArmorName-table">
            <tbody>
              <tr>
                <th colSpan={3}>Defense</th>
                <th colSpan={5}>Elemental</th>
              </tr>
              <tr>
                <th>Base</th>
                <th>Max.</th>
                <th>Aug.</th>
                <th>Fire</th>
                <th>Water</th>
                <th>Thunder</th>
                <th>Ice</th>
                <th>Dragon</th>
              </tr>
              <tr>
                <td>{info.def}</td>
                <td>{info.maxDef}</td>
                <td>{info.customDef}</td>
                <td>{info.fire}</td>
                <td>{info.water}</td>
                <td>{info.thunder}</td>
                <td>{info.ice}</td>
                <td>{info.dragon}</td>
              </tr>
            </tbody>
          </Table>
          <SlotTable slots={[info.slot1, info.slot2, info.slot3]} />
          <SkillTable skillList={info.skill} />
          <p>Uncheck the armor piece below to exclude it.</p>
          <label>
            <input type="checkbox" checked={!isIgnore} onChange={toggleArmor} />
            {' '}
            {name}
          </label>
        </Modal>
      }
    </>
  )
}

export default ArmorName
