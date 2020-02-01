import React, { useCallback, useState } from 'react'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { charm } from '~/app/util/generatedUtil'
import Modal from '../modal/Modal'
import SkillTable from './SkillTable'

require('./CharmName.css')

interface Props {
  name: string | undefined
}

const CharmName: React.FC<Props> = ({ name }) => {
  const ignoreArmor = useIgnoreArmors()
  const { toggle } = useIgnoreArmorsActions()
  const toggleArmor = useCallback(() => name && toggle(name), [name])

  const isIgnore = name && ignoreArmor[name] === 0

  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = useCallback(() => setModalOpen(state => !state), [])

  const info = isModalOpen ? charm[name!] : null

  return (
    <>
      <span className={`CharmName ${name ? 'on' : ''}`} onClick={name ? toggleModal : undefined}>
        {name || 'No Equipment'}
      </span>
      {info &&
        <Modal title={name} onClose={toggleModal}>
          <SkillTable skillList={info.skill} />
          <p>Uncheck the charm below to exclude it.</p>
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

export default CharmName
