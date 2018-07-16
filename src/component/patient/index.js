import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { browserHistory, withRouter } from 'react-router';
import * as patientActions from '../../actions/patient';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import { Tabs, Tab } from 'material-ui/Tabs';

import TabContent from './tabs';
import './less/patient.css';


/*const tabbuttonStyle = {
    backgroundColor: "#06569b"
}*/

class Patient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patient: props.patient
        };
        if(!(localStorage.getItem(toggleButton))){
            var toggleButton = {
                shell : true,
                addons : true,
                covers : true,
                rigidity : true        
            }
            localStorage.setItem('toggleButton', JSON.stringify(toggleButton));  
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ patient: nextProps.patient });
    };

    handleChange = (value) => {
        this.props.setTabIndex(value);
    };

    onFormChange = (data, toggle) => {
        this.props.setformData(data)
    };

    handleClick = (value) => {
        this.props.setTabIndex(value);
    };

    render() {
        const { patient } = this.state;
        const  user  = this.props.location.state.user;
        return (
            <MuiThemeProvider>
                <div className="patient-tab-bar">
                    <div className="row wizard-steps">
                        {patient.tabs.map((tab, key) => {
                            if(tab !== 'shell1'){
                                let className = key < patient.c_tab ? "completed-step" : key === patient.c_tab ? "active-step" : '';
                                return (
                                    <div key={key} className={className + " step"}>
                                        {key > 0 ? <div className="a-before"></div> : null}
                                        <a onClick={this.handleClick.bind(this, key)}><span>{patient[tab].title}</span></a>
                                        <div className="a-after"></div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    {
                        patient.tabs.map((tab, key) => 
                        {   
                            if(tab !== 'shell1'){
                                if(tab === 'shell'){
                                   
                                    return patient.c_tab === key ? <TabContent key={key} patient={patient[tab]} shell1patient = {patient['shell1']} index={key} parent={patient} user={user} onFormChange={this.onFormChange} /> : null
                                }else if(tab === 'addons'){
                                    return patient.c_tab === key ? <TabContent key={key} patient={patient[tab]} addons1patient = {patient['addons1']} index={key} parent={patient} user={user} onFormChange={this.onFormChange} /> : null
                                }else if(tab === 'covers'){
                                    return patient.c_tab === key ? <TabContent key={key} patient={patient[tab]} covers1patient = {patient['covers1']} index={key} parent={patient} user={user} onFormChange={this.onFormChange} /> : null
                                }else if(tab === 'rigidity'){
                                    return patient.c_tab === key ? <TabContent key={key} patient={patient[tab]} rigidity1patient = {patient['rigidity1']} index={key} parent={patient} user={user} onFormChange={this.onFormChange} /> : null
                                }else{
                                    return patient.c_tab === key ? <TabContent key={key} patient={patient[tab]} index={key} parent={patient} user={user} onFormChange={this.onFormChange} /> : null
                                }
                            }else{
                                return true;
                            }
                            
                            
                        })
                    }
                    
                    {/* <Tabs value={patient.c_tab} onChange={this.handleChange} className="patient-tab-bar">
                        {
                            patient.tabs.map((tab, key) =>
                                <Tab
                                    buttonStyle={tabbuttonStyle}
                                    className={key < patient.c_tab ? "tab-button-done" : key === patient.c_tab ? "tab-button-active" : "tab-button"}
                                    label={patient[tab].title} value={key} key={key}>
                                    <TabContent patient={patient[tab]} index={key} onFormChange={this.onFormChange} />
                                </Tab>
                            )
                        }
                    </Tabs> */}
                </div>
            </MuiThemeProvider>

        )
    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(patientActions, dispatch);
}

function mapStateToProps(state) {
    return { patient: state.patient };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Patient);