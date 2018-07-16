import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import { fields } from '../layout/titlefield';
import './covers.css'


export default class CoversForm extends Component {

  onChange = (formData) => {
    this.props.onChange(formData);
  }

  render() {
    const { patient } = this.props
    const { schema, formData } = patient;
    return (schema ? schema.jsonschema && schema.uischema ?
      <div className="covers-form">
        <Form
          formData={formData}
          schema={schema.jsonschema}
          uiSchema={schema.uischema}
          fields={fields}
          liveValidate
          showErrorList={false}
          noHtml5Validate={true}
          onChange={this.onChange}
          FieldTemplate={this.props.fieldTemplate} >
          <div></div>
        </Form>
      </div>
      : null : null
    )
  }
}

