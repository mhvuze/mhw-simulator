import React, { useCallback } from 'react'
import { useWeapon } from '~/app/hooks/weapon'
import { sendSearchResultEvent, sendSearchSkillEvent } from '~/app/util/gtag'
import { useActiveSkill, useActiveSkillActions } from '../../hooks/activeSkill'
import { useAddableSkillActions } from '../../hooks/addableSkill'
import { useDecos } from '../../hooks/decos'
import { useIgnoreArmors } from '../../hooks/ignoreArmors'
import { useResultActions } from '../../hooks/result'
import { useSkillLogActions } from '../../hooks/skillLog'
import { terminate } from '../../util/calc/worker'
import Button from '../common/Button'

require('./Actions.css')

interface Props {
  skillList: string[]
  resetSkillScroll: () => void
  scrollOutputArea: () => void
}

const Actions: React.FC<Props> = ({ skillList, resetSkillScroll, scrollOutputArea }) => {
  const activeSkill = useActiveSkill()
  const { clear: clearActiveSkill } = useActiveSkillActions()
  const { search: searchAddableSkill, clear: clearAddableSkill } = useAddableSkillActions()
  const { update: updateSkillLog } = useSkillLogActions()
  const weapon = useWeapon()
  const ignoreArmors = useIgnoreArmors()
  const decos = useDecos()
  const { searchList } = useResultActions()

  const onSearchResult = useCallback(() => {
    clearAddableSkill()
    updateSkillLog(activeSkill)

    searchList(activeSkill, weapon, ignoreArmors, decos)

    resetSkillScroll()
    scrollOutputArea()
    sendSearchResultEvent()
  }, [activeSkill, weapon, ignoreArmors, decos, searchList])

  const onSearchSkill = useCallback(() => {
    searchAddableSkill(activeSkill, weapon, ignoreArmors, decos, skillList)

    resetSkillScroll()
    sendSearchSkillEvent()
  }, [activeSkill, weapon, ignoreArmors, decos, skillList])

  const onClear = useCallback(() => {
    clearActiveSkill()
    clearAddableSkill()
    terminate()
  }, [])

  return (
    <div className="Actions">
      <Button label="Search" onClick={onSearchResult} primary />
      <Button label="Reset" onClick={onClear} />
      <Button label="Extra Skills (β)" onClick={onSearchSkill} />
    </div>
  )
}

export default Actions
