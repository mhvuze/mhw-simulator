import ActionReducer from 'action-reducer'
import { fromEntries } from '../util/array'

export type Armors = Record<string, 0 | 1>

// 旧保存データの移行
const STORAGE_KEY = 'mhw-simulator/ignoreArmors/v1.1'
const initState: Armors = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

const { reducer, createAction } = ActionReducer(initState, 'ignoreArmors/')

export const toggle = createAction('toggle', (state, name: string) => {
  if (state[name] == 0) {
    const { [name]: _removed, ...rest } = state
    return rest
  }

  return { ...state, [name]: 0 }
})

export const ignoreFromList = createAction('ignoreFromList', (state, armors: string[]) =>
  ({ ...state, ...fromEntries(armors.map(name => [name, 0])) })
)

export const clearFromList = createAction('clearFromList', (state, armors: string[]) =>
  fromEntries(
    Object.entries(state).filter(([name]) => !armors.includes(name))
  )
)

export default reducer
