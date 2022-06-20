import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

// With debounce:
//---------------
export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined)
  }, 2000)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </span>
  )
}

// Without debounce:
//------------------
// export const GlobalFilter = ({ filter, setFilter }) => {
//   return (
//     <span>
//       Search: {' '}
//       <input value={filter || ''} onChange={e => setFilter(e.target.value)} />
//     </span>
//   )
// }
