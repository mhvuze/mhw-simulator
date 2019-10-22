import { getCharm } from './generate/charm'
import { getDeco } from './generate/deco'
import { getEquip } from './generate/equips'
import { getSkillList } from './generate/skill'
import { writeJson } from './util/fileUtil'
import fromEntries from './util/fromEntries'

const main = async () => {
  // スキル
  const skillList = await getSkillList()
  await writeJson('src/generated/skillList.json', skillList)

  const skillIndexMap = new Map(skillList.map((v, i) => [v.name, i]))

  // 防具
  const equipTypes = ['head', 'body', 'arm', 'wst', 'leg']
  const equips = await Promise.all(equipTypes.map(async type =>
    [type, await getEquip(type, skillIndexMap)] as const
  ))

  for (const [type, list] of equips) {
    const hash = fromEntries(list.map(([name, ...list]) => [name, list]))
    await writeJson(`src/generated/${type}.json`, hash)
  }

  // 護石
  const charm = await getCharm(skillIndexMap)
  const charmHash = fromEntries(charm.map(([name, ...list]) => [name, list]))
  await writeJson('src/generated/charm.json', charmHash)

  // 装飾品
  const deco = await getDeco(skillIndexMap)
  const decoHash = fromEntries(deco.map(([name, ...list]) => [name, list]))
  await writeJson('src/generated/deco.json', decoHash)
}

main()