import React, { useMemo, useState } from 'react'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { flat, unique } from '~/app/util/array'
import { charm } from '~/app/util/generatedUtil'
import charmGroup from '~/generated/charmGroup.json'
import Button from '../common/Button'
import TextFild from '../common/TextFild'
import CharmTable from './CharmTable'

interface Props {
}

const skillList = unique(flat(Object.values(charm).map(c => c.skill.map(s => s.name))))

const getDisplayList = (armorGroups: (readonly [string, (string | null)[]])[]) =>
  flat(armorGroups.map(([_, equips]) => equips.filter(Boolean) as string[]))

const Charms: React.FC<Props> = () => {
  const ignoreArmors = useIgnoreArmors()
  const { toggle, ignoreFromList, clearFromList } = useIgnoreArmorsActions()
  const [filter, setFilter] = useState('')

  // フィルタを適応した、護石のリスト
  // スキル名によるフィルタは、護石のレベルでスキルが変動しないことが前提
  const charmList = useMemo(() => (
    Object.entries(charmGroup).filter(([name, [child]]) =>
      name.includes(filter) || charm[child].skill.some(s => s.name === filter)
    )
  ), [filter])

  const checkFromDisplay = () => {
    if (!confirm('You are about to include all charms.')) return

    clearFromList(getDisplayList(charmList))
  }

  const uncheckFromDisplay = () => {
    if (!confirm('You are about to exclude all charms.')) return

    ignoreFromList(getDisplayList(charmList))
  }

  return (
    <div>
      <p>
        Exclude charms by unchecking them below.
        <br />
        Your selection will be saved but may be reset due to development reasons.
      </p>
      <TextFild
        type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder="Filter: Name or Skill"
        datalist={skillList}
      />
      <div>
        <Button label="Include all" onClick={checkFromDisplay} />
        <Button label="Exclude all" onClick={uncheckFromDisplay} />
      </div>
      <CharmTable charmGroups={charmList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
    </div>
  )
}

export default Charms
