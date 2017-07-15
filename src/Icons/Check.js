import React, { Component } from 'react';
import { Icon } from 'native-base';

export default class IconCheck extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
        return (
          <Icon name={'md-checkmark'} style={{fontSize: config.icon_size, color: '#43ac6a'}}/>
        );
  }
}
