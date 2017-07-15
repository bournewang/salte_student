import React, { Component } from 'react';
import { Container,Content,Tabs, Tab, Header } from 'native-base';
import { NavigationActions } from 'react-navigation'
import KnowledgePointList from './KnowledgePointList';
import Foot from './Foot';
const fetch = require('react-native-cancelable-fetch');

export default class KnowledgePoints extends Component {

  constructor(props){
    super(props);
  }

  static navigationOptions = {
    title: '知识点',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
         <Content >
            <Tabs initialPage={0}>
              {
                config.subjects.map((subject) => {
                  return (
                    <Tab heading={subject[1]} key={subject[0]}>
                      <KnowledgePointList subject={subject} navigation={this.props.navigation}/>
                    </Tab>)
                })
              }
            </Tabs>
         </Content>
         <Foot navigation={this.props.navigation} current='KnowledgePoints'/>
      </Container>
    );
  }

}
