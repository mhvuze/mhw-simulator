import React, { useMemo, useState } from 'react'
import { useDecos, useDecosActions } from '~/app/hooks/decos'
import { Decos } from '~/app/modules/decos'
import { flat, unique } from '~/app/util/array'
import { deco } from '~/app/util/generatedUtil'
import TextFild from '../common/TextFild'
import DecoTable from './DecoTable'

require('./Decos.css')

interface Props {
}

const allDecoList = Object.keys(deco)

const skillList = unique(flat(allDecoList.map(key => deco[key].skill.map(s => s.name))))

const createList = (filter: string, inputed: Decos, isInputedOnly: boolean) => {
  const decoList = isInputedOnly ? allDecoList.filter(name => inputed[name] != null) : allDecoList

  const matchList = decoList.filter(name =>
    name.includes(filter) || deco[name].skill.some(s => s.name === filter)
  )

  return matchList
}

const Decos: React.FC<Props> = () => {
  const decos = useDecos()
  const { set } = useDecosActions()
  const [filter, setFilter] = useState('')
  const [isInputedOnly, setInputedOnly] = useState(false)

  // decosはdepsに入れない
  const decoList = useMemo(() => (
    createList(filter, decos, isInputedOnly)
  ), [filter, isInputedOnly])

  return (
    <div>
      <p>
        Enter the maximum amount you want to use for each deco below.
        <br />
        Your input will be saved but may be reset due to development reasons.
      </p>
      <TextFild
        type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder="Filter: Name or Skill"
        datalist={skillList}
      />
      <div className="Decos-actions">
        <label>
          <input type="checkbox" checked={isInputedOnly} onChange={() => setInputedOnly(!isInputedOnly)} />
          {' '}
          Only show decos with input
        </label>
      </div>
      <DecoTable decoList={decoList} decos={decos} setDeco={set} />
    </div>
  )
}

export default Decos
