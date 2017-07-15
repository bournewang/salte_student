import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import {Container, Tabs, Tab, TabHeading, Icon} from 'native-base';

import SchoolWorks from './SchoolWorks';
import Profile from './Profile';
import Home from './Home';
import KnowledgePoints from './KnowledgePoints';


export default class Framework extends Component {
  // static navigationOptions = {
  //   title: 'PAGE 1',
  // };
  render() {
      //  const { navigate } = this.props.navigation;

        return (
          <Container>
              <Tabs tabBarPosition="bottom">
                <Tab heading={<TabHeading><Icon name="ios-list" /><Text>作业</Text></TabHeading>}>
                    <SchoolWorks />
                </Tab>
                <Tab heading={<TabHeading><Icon name="ios-information-circle-outline" /><Text>知识点</Text></TabHeading>}>
                    <KnowledgePoints />
                </Tab>
                <Tab heading={<TabHeading><Icon name="ios-people-outline" /><Text>同学</Text></TabHeading>}>
                    <Home />
                </Tab>
                <Tab heading={<TabHeading><Icon name="ios-person-outline" /><Text>我的</Text></TabHeading>}>
                    <Profile />
                </Tab>
            </Tabs>
          </Container>
        );
  }
}
