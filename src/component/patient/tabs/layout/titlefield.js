import React from 'react'
import LayoutField from './layout'
const TitleField = (props) => {

  const { title, required, id } = props
  let legend = `${title}${(required ? '*' : '')}`
  return <label className="control-label" htmlFor={id}>{legend}</label>
}

export const fields = {
  layout: LayoutField,
  TitleField: TitleField
}