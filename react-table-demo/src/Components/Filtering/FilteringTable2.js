// import useGlobalFilter hook for global filtering and useFilters for column level filtering purpose
// rendering columns level Filter input field conditionally in <thead> tag
import { useMemo } from 'react'
import { useTable, useGlobalFilter, useFilters } from 'react-table'
import { COLUMNS } from '../columns'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import MOCK_DATA from '../MOCK_DATA.json'
import '../table.css'

export const FilteringTableTwo = () => {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  // specifying a common Filter Column which is common to all columns
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter, 
    }
  }, [])

  const tableInstance = useTable({
      columns: columns,
      data: data,
      defaultColumn: defaultColumn
    },
    useFilters,
    useGlobalFilter)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = tableInstance

  const { globalFilter } = state

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <table {...getTableProps()}>

        <thead>
          { 
            headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              { 
                headerGroup.headers.map((column) => (
                 <th {...column.getHeaderProps()}> 
                    {column.render('Header')} 
                    <div> {column.canFilter ? column.render('Filter') : null} </div>
                 </th>
                ))
              }
            </tr>
           ))
          }
        </thead>

        <tbody {...getTableBodyProps()}>
          { 
            rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                { 
                   row.cells.map((cell) => (
                   <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                  ))
                }
              </tr>
            )
           })
          }
        </tbody>

        {/* <tfoot>
          { 
            footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getHeaderGroupProps()}>
              { 
                footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}> {column.render('Footer')} </td>
               ))
              }
            </tr>
            ))
          }
        </tfoot> */}

      </table>
    </>
  )
}

