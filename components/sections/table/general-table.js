import React, { useState, useEffect } from "react"
import { DataGrid, GridToolbar } from "@material-ui/data-grid"
import Markdown from "react-markdown"
import RenderExpandableCell from "./render-expandable-cell"

const columns = [
  { field: "id", hide: true, headerName: "ID", width: 10 },
  {
    field: "Repository",
    headerName: "Repository",
    headerClassName: "general-table-headers",
    sortable: false,
    filterable: false,
    width: 160,
    // eslint-disable-next-line react/display-name
    renderCell: ({ row }) => (
      <Markdown linkTarget="_blank" className="general-table">
        {row.Repository}
      </Markdown>
    ),
  },
  {
    field: "Descriptive Tags",
    headerName: "Descriptive Tags",
    headerClassName: "general-table-headers",
    width: 170,
    sortable: false,
    cellClass: "overflow",
    // eslint-disable-next-line react/display-name
    renderCell: ({ row }) => (
      <RenderExpandableCell data={row["Descriptive Tags"]} />
    ),
  },
  {
    field: "Organism",
    headerName: "Organism",
    headerClassName: "general-table-headers",
    width: 120,
    sortable: false,
    // eslint-disable-next-line react/display-name
    renderCell: ({ row }) => <RenderExpandableCell data={row["Organism"]} />,
  },
  {
    field: "IC/Program Required",
    headerName: "IC/Program Required?",
    headerClassName: "general-table-headers",
    width: 210,
    sortable: true,
    // eslint-disable-next-line react/display-name
    renderCell: ({ row }) => (
      <RenderExpandableCell data={row["IC/Program Required"]} />
    ),
  },
  {
    field: "IC/Program",
    headerName: "IC/Program",
    headerClassName: "general-table-headers",
    width: 130,
    sortable: false,
    // eslint-disable-next-line react/display-name
    renderCell: ({ row }) => <RenderExpandableCell data={row["IC/Program"]} />,
  },
  {
    field: "Accepts data from any HEAL study",
    headerName: "Accepts data from any HEAL study",
    headerClassName: "general-table-headers",
    width: 290,
    sortable: false,
    // eslint-disable-next-line react/display-name
    renderCell: ({ row }) => (
      <RenderExpandableCell data={row["Accepts data from any HEAL study"]} />
    ),
  },
  {
    field: "new1",
    headerName: "new1",
    headerClassName: "general-table-headers",
    width: 120,
    sortable: false,
    filterable: false,
    // eslint-disable-next-line react/display-name
    renderCell: ({ row }) => (
      <Markdown linkTarget="_blank" className="new1">
        {row.new1}
      </Markdown>
    ),
  },
  {
    field: "new2",
    headerName: "new2",
    headerClassName: "general-table-headers",
    width: 120,
    sortable: false,
    filterable: false,
    // eslint-disable-next-line react/display-name
    renderCell: ({ row }) => (
      <Markdown linkTarget="_blank" className="new2">
        {row.new2}
      </Markdown>
    ),
  },
  {
    field: "new3",
    headerName: "new 3",
    headerClassName: "general-table-headers",
    width: 120,
    sortable: false,
    filterable: false,
    // eslint-disable-next-line react/display-name
    renderCell: ({ row }) => (
      <Markdown linkTarget="_blank" className="new3">
        {row.new3}
      </Markdown>
    ),
  },
  {
    field: "Overview",
    headerName: "Overview",
    headerClassName: "general-table-headers",
    width: 120,
    sortable: false,
    filterable: false,
    // eslint-disable-next-line react/display-name
    renderCell: ({ row }) => (
      <Markdown linkTarget="_blank" className="general-table">
        {row.Overview}
      </Markdown>
    ),
  },
]

function createData(id, data) {
  let row = { ...data }

  for (const property in row) {
    let index = Number(property) + 1
    let newKey = columns[index].field
    row[newKey] = row[property]
    delete row[property]
  }
  row["id"] = id

  return row
}

export default function GeneralDataTable(data) {
  const [param, setParam] = useState(false)
  const [paramValue, setParamValue] = useState(false)
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)

    for (const [key, value] of queryParameters.entries()) {
      setParam(key)
      setParamValue(value)
    }
  }, [])

  let test = data.data.row.map((row, i) => {
    let bucket = row.columns.map((column, i) => {
      return column.column_data
    })

    return createData(i, bucket)
  })

  return (
    <div style={{ height: 600 }} className={"container mb-8"}>
      {!paramValue ? (
        <DataGrid
          rows={test}
          columns={columns}
          pageSize={26}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      ) : (
        <DataGrid
          rows={test}
          columns={columns}
          pageSize={26}
          components={{
            Toolbar: GridToolbar,
          }}
          filterModel={{
            items: [
              {
                columnField: param,
                operatorValue: "contains",
                value: paramValue,
              },
            ],
          }}
        />
      )}
    </div>
  )
}
