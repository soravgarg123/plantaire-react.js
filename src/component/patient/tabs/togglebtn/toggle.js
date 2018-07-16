import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';

import './toogle.css'
export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: props.isOn };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isToggleOn: nextProps.isOn });
  }

  handleClick() {
    this.setState(function (prevState) {
      return { isToggleOn: !prevState.isToggleOn };
    });
    this.props.onHandeler(this.state.isToggleOn, this.props.label);
  }

  render() {
    return (this.state.isToggleOn ?
      <RaisedButton label={this.props.label} style={this.props.btnStyle} onClick={this.handleClick} backgroundColor="#06569b" labelColor="#fff"/>
      : <RaisedButton label={this.props.label} style={this.props.btnStyle} onClick={this.handleClick} />
    );
  }
}