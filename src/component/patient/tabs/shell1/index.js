import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import './shell.css'
import { fields } from '../layout/titlefield';


export default class Shell1Form extends Component {
   constructor(props) {
      super(props);
      this.state = {
        toggle: props.toggle
      };
    };
  onChange = (formData) => {
    if(formData.formData.angulation1 == 'Neutral'){
      formData.formData.angle1 = undefined; 
    }
    this.props.onChange(formData, this.props.toggle);
  }
  render() {
    const { patient, shell1patient, toggle } = this.props
    const { formData, schema } = shell1patient;

    if(!toggle){
     const { formData, schema } = patient;
    }
  
    return (schema ? schema.jsonschema && schema.uischema ?
      <div className="">
        <Form
          formData={formData}
          schema={schema.jsonschema}
          uiSchema={schema.uischema}
          fields={fields}
          liveValidate
          showErrorList={false}
          noHtml5Validate={true}
          onChange={this.onChange}
          FieldTemplate={this.props.fieldTemplate} ><div></div>
        </Form>
      </div>
      : null : null

    )
  }
}

