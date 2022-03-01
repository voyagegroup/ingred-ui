import * as React from 'react'
import { VFC } from 'react'

const PropTable: VFC = React.memo((props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default Value</th>
        <th>Required</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(props).map((key) => {
        return (
          <tr key={key}>
            <td>
              <code>{key}</code>
            </td>
            <td>
              <code>{props[key].type?.name}</code>
            </td>
            <td>
              {props[key].defaultValue && <code>{props[key].defaultValue.value.toString()}</code>}
            </td>
            <td>{props[key].required ? 'Yes' : 'No'}</td>
            <td>{props[key].description}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
))

export default PropTable
