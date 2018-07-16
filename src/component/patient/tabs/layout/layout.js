import React from 'react'
import ObjectField from 'react-jsonschema-form/lib/components/fields/ObjectField'
import { retrieveSchema } from 'react-jsonschema-form/lib/utils'
import { connect } from "react-redux";

class GridField extends ObjectField {
  state = { firstName: 'hasldf' }
  render() {
    const {
      uiSchema,
      errorSchema,
      idSchema,
      required,
      disabled,
      readonly,
      onBlur,
      formData,
      patient
    } = this.props
    const { definitions, fields, formContext } = this.props.registry
    const { SchemaField, TitleField, DescriptionField } = fields
    const schema = retrieveSchema(this.props.schema, definitions)
    const title = (schema.title === undefined) ? '' : schema.title

    const layout = uiSchema['ui:layout']

    let preFormDat = {};
    if (patient.c_tab) {
      preFormDat = patient[patient[patient.tabs[patient.c_tab]].pretab].formData;
    }
    // eslint-disable-next-line
    const isFilled = (fieldName) => (formData[fieldName] && formData[fieldName].length) ? true : false;
    // eslint-disable-next-line
    const isChoiceSelected = (property, required, inverse = false) => {
      const result = formData[property] === required;
      if (inverse) {
        return !result;
      }
      console.log(`isChoiceSelected property : ${formData[property]} ;  required : ${required}`);
      return result
      //return (console.log(`property : ${formData[property]} ;  required : ${required}`));
    }


    const isTrue = (fieldName) => (formData[fieldName]);
    // eslint-disable-next-line
    const preparePreFormData = (fieldName) => {
      if (!preFormDat) return false;
      return (preFormDat[fieldName]);
    }

    return (
      <fieldset>
        {title ? <TitleField
          id={`${idSchema.$id}__title`}
          title={title}
          required={required}
          formContext={formContext} /> : null}
        {schema.description ?
          <DescriptionField
            id={`${idSchema.$id}__description`}
            description={schema.description}
            formContext={formContext} /> : null}
        {
          layout.map((row, index) => {
            return (
              <div className="row" style={{ margin: "0px" }} key={index}>
                {
                  Object.keys(row).map((name, index) => {
                    const { doshow, ...rowProps } = row[name];
                    let style = {}
                    let classname = "";
                    // eslint-disable-next-line

                    if (doshow && !eval(doshow)) {
                      style = { pointerEvents: "none" }
                      classname = "disabled-filed"
                    }
                    // console.error(schema.properties)
                    if (schema.properties[name]) {
                      return (
                        <div className={classname} {...rowProps} key={index} style={style}>
                          <SchemaField
                            name={name}
                            required={this.isRequired(name)}
                            schema={schema.properties[name]}
                            uiSchema={uiSchema[name]}
                            errorSchema={errorSchema[name]}
                            idSchema={idSchema[name]}
                            formData={formData[name]}
                            onChange={this.onPropertyChange(name)}
                            onBlur={onBlur}
                            registry={this.props.registry}
                            disabled={disabled}
                            readonly={readonly} />
                        </div>
                      )
                    } else {
                      const { render, ...rowProps } = row[name]
                      let UIComponent = () => null

                      if (render) {
                        UIComponent = render
                      }
                      return (
                        <div {...rowProps} key={index} style={style}>
                          <UIComponent
                            name={name}
                            formData={formData}
                            errorSchema={errorSchema}
                            uiSchema={uiSchema}
                            schema={schema}
                            registry={this.props.registry}
                          />
                        </div>
                      )
                    }
                  })
                }
              </div>
            )
          })
        }</fieldset>
    )
  }
}
function mapStateToProps(state) {
  return { patient: state.patient };
}
export default connect(
  mapStateToProps
)(GridField);
