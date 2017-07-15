import React, { Component } from 'react';
import { Spinner } from 'native-base';

export default class IconLoading extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
        return (
          <Spinner color='lightgreen'/>
        );
  }
}
