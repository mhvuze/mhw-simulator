import React, { useMemo, useState } from 'react'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { flat, unique } from '~/app/util/array'
import { arm, body, getEquip, head, leg, wst } from '~/app/util/generatedUtil'
import armorGroup from '~/generated/armorGroup.json'
import Button from '../common/Button'
import TextFild from '../common/TextFild'
import ArmorTable from './ArmorTable'

interface Props {
}

const armorGroupEntries = Object.entries(armorGroup)

const skillList = unique(
  flat(
    Object.values({ ...head, ...body, ...arm, ...wst, ...leg })
      .map(a => a.skill.map(s => s.name))
  )
)

const isMatchFilter = (name: string | null, filter: string) =>
  !name || name.includes(filter) || getEquip(name).skill.some(v => v.name === filter)

const getDisplayList = (armorGroups: (readonly [string, (string | null)[]])[]) =>
  flat(armorGroups.map(([_, equips]) => equips.filter(Boolean) as string[]))

const Armors: React.FC<Props> = () => {
  const ignoreArmors = useIgnoreArmors()
  const { toggle, ignoreFromList, clearFromList } = useIgnoreArmorsActions()
  const [filter, setFilter] = useState('')

  const armorGroups = useMemo(() => (
    armorGroupEntries
      .map(([group, equips]) => [group, equips.map(name => isMatchFilter(name, filter) ? name : null)] as const)
      .filter(([group, equips]) => equips.some(Boolean))
  ), [filter])

  const checkFromDisplay = () => {
    if (!confirm('You are about to include all armor pieces.')) return

    clearFromList(getDisplayList(armorGroups))
  }

  const uncheckFromDisplay = () => {
    if (!confirm('Your are about to exclude all armor pieces.')) return

    ignoreFromList(getDisplayList(armorGroups))
  }

  return (
    <div>
      <p>
        Exclude armor pieces by unchecking them below.
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
      <ArmorTable armorGroups={armorGroups} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
    </div>
  )
}

export default Armors
