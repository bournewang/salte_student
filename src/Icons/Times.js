import React, { Component } from 'react';
import { Icon } from 'native-base';

export default class IconTimes extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
        return (
          <Icon name={'ios-close-circle-outline'} style={{fontSize: config.icon_size, color: '#ea2f10'}}/>
        );
  }
}
