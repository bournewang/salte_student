import React, { Component } from 'react';
import { Icon } from 'native-base';

export default class IconUnfinished extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
        return (
          <Icon name={'ios-square-outline'} style={{fontSize: config.icon_size, color: 'gray'}}/>
        );
  }
}
