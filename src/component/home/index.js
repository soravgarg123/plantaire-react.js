import React, { Component } from 'react';
// import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import { connect } from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import Drawer from 'material-ui/Drawer';
import './home.css';
const style = {
    margin: 12,
    width: 200,
    height: 70,
};


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    }
    handleClose = () => this.setState({ open: false });
    patientHandler(user) {
        browserHistory.push({
            pathname: '/patient',
            state: { user : user}
        });
    }
    render() {
        const { height } = this.state;
        return (
            <div style={{ height: height,overflow: "hidden",  background: "#fff"  }}>
                <div className="header_box row">
                    {/* <div className="tablebox col-md-2" >
                        <div className="tablestyle row">
                            <div className="row ">
                                <div className="col-md-6 header_title">Practicionner</div>
                                <div className="col-md-6 header_title">Dr Pied</div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 header_title">Clinic</div>
                                <div className="col-md-6 header_title">Centre du pied</div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 header_title">Total orders</div>
                                <div className="col-md-6 header_title">12</div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="header_right col-md-1 col-md-offset-9">
                        <img
                            src={require('../../assets/icon-small.png')}
                            onClick={this.handleToggle}
                            alt="Log"
                        />
                    </div> */}
                </div>
                <div className="row logobox">
                    <div className="container col-md-5"></div>
                    <div className="container col-md-1" >
                        <img alt="T" src={require('../../assets/icon.png')} />
                    </div>
                    <div className="logotitle col-md-1">
                        OssKin
                        </div>
                    <div className="container col-md-5"></div>
                </div>
                <div className="home_buttons">
                    <div className="container col-md-5"></div>
                    <div className="container col-md-5">
                        <MuiThemeProvider>
                            <RaisedButton label="Marie-Chantal - New Patient" primary={true} style={style} onClick={this.patientHandler.bind(this, {"id" : 0 ,"name": "Marie-Chantal"})} />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <RaisedButton label="Vincent -  New patient" primary={true} style={style} onClick={this.patientHandler.bind(this, {"id" : 1 ,"name": "Vincent"})} />
                        </MuiThemeProvider>
                        {/* <MuiThemeProvider>
                            <RaisedButton label="+ New configuration" primary={true} style={style} />
                        </MuiThemeProvider> */}
                    </div>
                    <div className="container col-md-2"></div>
                </div>
                {/* <MuiThemeProvider>
                    <Drawer
                        openSecondary={true}
                        width={250}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({ open })}
                    >
                        <button type="button" className="close" aria-label="Close" onClick={this.handleClose}>
                            <span aria-hidden="true" className="closeicon">&times;</span>
                        </button>
                        <div>
                            <div>
                                <div className="orders"> Orders</div>
                                <div className="orders_patient_setting">
                                    <div className="orders_patient"> Patient 1</div>
                                    <div className="orders_patient"> Patient 2</div>
                                    <div className="orders_patient"> Patient 3</div>
                                    <div className="orders_patient"> Patient 4</div>
                                    <div className="orders_patient"> Patient 5</div>
                                    <div className="orders_patient"> Patient 6</div>
                                    <div className="orders_patient"> Patient 7</div>
                                </div>
                            </div>
                            <div>
                                <div className="settings"> Settings</div>
                                <div className="orders_patient_setting">
                                    <div className="settings_language"> Language</div>
                                    <div className="settings_profile"> Profile</div>
                                </div>
                            </div>
                        </div>
                    </Drawer>
                </MuiThemeProvider> */}
            </div>
        )
    }
}
export default connect(

)(Home);