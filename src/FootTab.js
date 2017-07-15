import React, { Component } from 'react';
import { FooterTab } from 'native-base';
import FootButton from './FootButton';

export default class FootTab extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
       const { navigate } = this.props.navigation;

        return (
              <FooterTab>
                <FootButton
                  navigation={this.props.navigation}
                  active={this.props.current == 'SchoolWorks'}
                  label='作业'
                  route='SchoolWorks'
                  icon="ios-paper"
                />
                <FootButton
                  navigation={this.props.navigation}
                  active={this.props.current == 'KnowledgePoints'}
                  label='知识点'
                  route='KnowledgePoints'
                  icon="ios-quote"
                />
                <FootButton
                  navigation={this.props.navigation}
                  active={this.props.current == 'Mistakes'}
                  label='错题本'
                  route='Mistakes'
                  icon="ios-stats"
                />
                <FootButton
                  navigation={this.props.navigation}
                  active={this.props.current == 'Profile'}
                  label='我的'
                  route='Profile'
                  icon="ios-person"
                />
              </FooterTab>
        );
  }
}
