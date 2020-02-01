import React from 'react'
import { useResult } from '~/app/hooks/result'
import HeadingTitle from '../common/HeadingTitle'
import Equipment from './Equipment'

interface Props {
}

const Result: React.FC<Props> = () => {
  const list = useResult()

  return (
    <>
      <HeadingTitle title="Search Results" />
      {list.filter(Boolean).map((result, i) =>
        <Equipment
          key={i}
          title={`Set ${i + 1} `}
          result={result}
          initState={i === 0}
        />
      )}
    </>
  )
}

export default Result
