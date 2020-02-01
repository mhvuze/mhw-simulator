import React, { useReducer } from 'react'
import Armors from '../armors/Armors'
import Charms from '../charms/Charms'
import Decos from '../decos/Decos'
import Modal from '../modal/Modal'

require('./HeaderNav.css')

interface Props {
}

const list: [string, React.FC][] = [
  ['Armor Settings', Armors],
  ['Charm Settings', Charms],
  ['Deco Settings', Decos],
]

const HeaderNav: React.FC<Props> = () => {
  const [state, dispatch] = useReducer((state: Record<string, boolean>, type: string) => (
    { ...state, [type]: !state[type] }
  ), {})

  return (
    <ul className="HeaderNav">
      {list.map(([name, Component]) =>
        <React.Fragment key={name}>
          <li className="HeaderNav-li" onClick={() => dispatch(name)}          >
            {name}
          </li>
          {state[name] &&
            <Modal className="HeaderNav-modal" title={name} onClose={() => dispatch(name)}>
              <Component />
            </Modal>
          }
        </React.Fragment>
      )}
    </ul>
  )
}

export default HeaderNav
