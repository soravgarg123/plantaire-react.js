import React, { Component } from 'react'

import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Row, Col } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

import InfoForm from './info';
import ShellForm from './shell';
import ShellForm1 from './shell1';
import AddonsForm from './addons';
import AddonsForm1 from './addons1';
import CoversForm from './covers';
import CoversForm1 from './covers1';
import RigidityForm from './rigidity';
import RigidityForm1 from './rigidity1';
import SummaryForm from './summary';

const cardStyle = {
  boxShadow: "unset",
  backgroundColor: "unset"
}
const cardTitleStyle = {
  backgroundColor: "#01579B",
  textAlign: "center",
  fontWeight: 600,
  marginBottom: "15px",
  borderRadius: "5px",
  padding: 10
}
const cardTextStyle = {
  padding: "0px",
  boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
  borderRadius: "2px",
  border: "1px #cecece solid",
  backgroundColor: "#90CAF9"
}
const doneBtnStyle = {
  width: "28%",
}


export default class Tabcontent extends Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem('toggleButton')){
      var toggleValue = localStorage.getItem('toggleButton');
      toggleValue = JSON.parse(toggleValue);
      if(props.index == 1){
        this.state = {isToggleOn: toggleValue.shell};
      }else if(props.index == 2){
        this.state = {isToggleOn: toggleValue.addons};
      }else if(props.index == 3){
        this.state = {isToggleOn: toggleValue.covers};
      }else if(props.index == 4){
        this.state = {isToggleOn: toggleValue.rigidity};
      }else{
        this.state = {isToggleOn: true};
      }
    }else{
      this.state = {isToggleOn: true};
    }
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(function(prevState) {
      if(localStorage.getItem('toggleButton')){
        var toggleValue = JSON.parse(localStorage.getItem('toggleButton'));
        console.log(this.props)
        if(this.props.index == 1){

          toggleValue.shell = !prevState.isToggleOn;
        }else if(this.props.index == 2){
          toggleValue.addons = !prevState.isToggleOn;
        }else if(this.props.index == 3){
          toggleValue.covers = !prevState.isToggleOn;
        }else if(this.props.index == 4){
          toggleValue.rigidity = !prevState.isToggleOn;
        }
        localStorage.setItem('toggleButton', JSON.stringify(toggleValue))
      }
      return {isToggleOn: !prevState.isToggleOn};
    });
  }
 

  CustomFieldTemplate(props) {
    const { id, classNames, label, help, required, description, children, schema } = props;

    return (
      <div className={classNames}>
        {schema.type !== "boolean" && schema.type !== "object" ? <label htmlFor={id}>{label}{required ? "*" : null}</label> : null}
        {description}
        {children}
        {/* <div className="validation-error"> {errors}</div> */}
        {help}
      </div>
    );
  }

  onChange = (data) => {
    if (!data.errors.length)
      this.props.onFormChange({ ...data.formData });
  }

  onSubmit(e) {
    console.log('onSubmit', e)
  }

  getForms(dataStorage) {
    const { patient, index, parent, user} = this.props
    switch (index) {
      case 0:
        return (<InfoForm patient={patient} user={user} toggle={this.state.isToggleOn} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      case 1:
        return (<ShellForm patient={patient} toggle={this.state.isToggleOn} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      case 2:
        return (<AddonsForm patient={patient} toggle={this.state.isToggleOn} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      case 3:
        return (<CoversForm patient={patient} toggle={this.state.isToggleOn} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      case 4:
        return (<RigidityForm patient={patient} toggle={this.state.isToggleOn} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      case 5:
        return (<SummaryForm patient={patient} parent={parent} toggle={this.state.isToggleOn} user={user} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      default:
        return (<div></div>);
    }
  }

  getForms1(dataStorage) {
    const { patient, index, parent, user, shell1patient, addons1patient, covers1patient, rigidity1patient} = this.props
    switch (index) {
      case 0:
        return (<InfoForm patient={patient} toggle={this.state.isToggleOn} user={user} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      case 1:
        return (<ShellForm1 patient={patient} toggle={this.state.isToggleOn} shell1patient={shell1patient} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      case 2:
        return (<AddonsForm1 patient={patient} addons1patient={addons1patient} toggle={this.state.isToggleOn} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      case 3:
        return (<CoversForm1 patient={patient} covers1patient={covers1patient} toggle={this.state.isToggleOn} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      case 4:
        return (<RigidityForm1 patient={patient} rigidity1patient={rigidity1patient} toggle={this.state.isToggleOn} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      case 5:
        return (<SummaryForm patient={patient} toggle={this.state.isToggleOn} parent={parent} user={user} onChange={this.onChange} fieldTemplate={this.CustomFieldTemplate} />);
      default:
        return (<div></div>);
    }
  }

  render() {
    const { index, user} = this.props;
    
    if (index === 0 || index === 5) {
      return this.getForms();
    } else {
      return (
        <Row className="patient-tab-content">
          <Col xs={4} md={4} className="content-left customLeft">
            <Card style={cardStyle}>
              <CardTitle title="LEFT" titleColor="#fff" style={cardTitleStyle} />
              <CardText style={cardTextStyle}>
                {this.getForms()}
              </CardText>
            </Card>
          </Col>
          <Col xs={4} md={4} className="content-center">
            <div className="image-area">
              user : {user.name} 
            </div>
           
            <div className="action-area">
              <RaisedButton backgroundColor="#06569b" labelColor="#fff" label="Done" style={doneBtnStyle} />
            </div>
           
          </Col>
          
          <Col xs={4} md={4} className="content-right customRight">
            <Card style={cardStyle}>
           
              <CardTitle style={cardTitleStyle} titleColor="#fff" title="RIGHT" />
               <label className="left-lbl"> <input type="checkbox" defaultChecked={!this.state.isToggleOn} onChange={this.handleClick} /> Same as left</label>
              <CardText style={cardTextStyle} >
                {this.state.isToggleOn ?  this.getForms1() : this.getForms()}
              </CardText>
            </Card>
          </Col>
        </Row>
      )
    }
  }
}

