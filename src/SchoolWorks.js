import React, { Component } from 'react';
import { ListView, RefreshControl, Text, View } from 'react-native';
import { Container, Content, Tab, Tabs } from 'native-base';
import { NavigationActions } from 'react-navigation'
import SchoolWorkList from './SchoolWorkList';
import Foot from './Foot';

export default class SchoolWorks extends Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = {
    title: '我的作业'
  };

  render() {
    const { navigate } = this.props.navigation;

       return (
             <Container>
                 <Content style={{flexDirection: 'column', backgroundColor: 'white'}}>
                   <Tabs initialPage={0}>
                     {
                       config.school_work_groups.map((group) => {
                         return (
                           <Tab heading={group.label} key={group.label}>
                             <SchoolWorkList school_work_type={group.school_work_type} navigation={this.props.navigation}/>
                           </Tab>)
                       })
                     }
                   </Tabs>
                 </Content>
                 <Foot navigation={this.props.navigation} current='SchoolWorks'/>
             </Container>
       );
   }

}
