import React, { Component } from 'react';
import { Footer, FooterTab } from 'native-base';
import FootTab from './FootTab';

export default class Foot extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
        return (

          <Footer >
              <FootTab navigation={this.props.navigation} current={this.props.current}/>
          </Footer>
        );
  }
}
