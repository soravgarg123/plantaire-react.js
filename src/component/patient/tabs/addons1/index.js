import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import { fields } from '../layout/titlefield';
import Toggle from '../togglebtn/toggle';
import './addons.css';


export default class Addons1Form extends Component {
 

  constructor(props) {
    super(props);
    this.state = {
      toggleValues: props.patient.formData,
    }
  }

  onChange = (formData) => {
   this.props.onChange(formData);
  }

  onHandelToggleBtn = (isOn, val) => {
    let f_data = this.props.patient.formData || {};
    let newForm = { errors: [], formData: f_data };
    if (!isOn) {
      newForm.formData.ext_iso1 = [val];
    } else {
      newForm.formData.ext_iso = [];
    }
    this.props.onChange(newForm);
  }

  isOnToggle = (v) => {
    let f_data = this.props.patient.formData || {};
    if (!f_data.ext_iso1) return false;
    if (!f_data.ext_iso1.length) return false;
    return f_data.ext_iso1[0] === v
  }

  render() {
    const { patient, addons1patient, toggle } = this.props
    const { formData, schema } = addons1patient;
    if(!toggle){
     const { formData, schema } = patient;
    }

    return (schema ? schema.jsonschema && schema.uischema ? (
      <div>
        <div className="togle-btn-area">
          <Toggle label="Extensions" isOn={this.isOnToggle("Extensions")} onHandeler={this.onHandelToggleBtn} />
          <strong> OR </strong>
          <Toggle label="Isolations" isOn={this.isOnToggle("Isolations")} onHandeler={this.onHandelToggleBtn} />
        </div>
        <div className="addons-form-area">
          <Form
            formData={formData}
            schema={schema.jsonschema}
            uiSchema={schema.uischema}
            fields={fields}
            liveValidate
            showErrorList={false}
            noHtml5Validate={true}
            onChange={this.onChange}
            FieldTemplate={this.props.fieldTemplate}>
            <div></div>
          </Form>
        </div>
      </div>
    )
      : null : null
    )
  }
}

