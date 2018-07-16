import React, { Component } from 'react'
import { Row } from 'react-bootstrap';

import Form from "react-jsonschema-form";
import './info-schema-form.css';

export default class InfoForm extends Component {
  onChange = (formData) => {
    this.props.onChange(formData);
  }
  render() {
    // const { patient } = this.state;
    const { patient, user } = this.props
    const { schema, formData } = patient;
    return (
      <div className="infos_container">
        <Row>


          <div style={{ marginLeft: 'auto', marginRight: 'auto', display:"block", width : "200px"}}> 
            user : {user.name}
          </div>
        </Row>
        <Row className="patient-tab-content-infos">
          {
            schema ? schema.jsonschema && schema.uischema ?
              < Form
                schema={schema.jsonschema}
                uiSchema={schema.uischema}
                formData={formData}
                liveValidate
                showErrorList={false}
                noHtml5Validate={true}
                onChange={this.onChange}
                FieldTemplate={this.props.fieldTemplate}>
                <div></div>
              </Form>
              : null : null

          }
        </Row>

        <Row className="patient-tab-content-draganddrop">
          <h1>Drag and Drop</h1>
        </Row>
      </div>
    )
  }
}

