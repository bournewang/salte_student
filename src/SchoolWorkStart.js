import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, View, Content, Text, Button, H1 } from 'native-base';
// import { Col, Row, Grid } from "react-native-easy-grid";
import Foot from './Foot';

export default class SchoolWorkStart extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: `${navigation.state.params.school_work.school_work_type}${navigation.state.params.school_work.subject}${navigation.state.params.school_work.name}`, //`知识点： ${navigation.state.params.knowledge_point.name}`
    // headerRight: <Button color={screenProps.tintColor}></Button>,
  });
  render() {
      //  const { navigate } = this.props.navigation;
       const {navigate, state} = this.props.navigation;
       var school_work = state.params.school_work;
       console.log("school_work name: "+school_work.name);

        return (
          <Container>
              <Content>
                  <View >
                    <Text>{school_work.name}</Text>
                    <Text>共有5道题。</Text>
                    <Button success>
                      <Text>Start</Text>
                    </Button>
                  </View>
              </Content>
              <Foot navigation={this.props.navigation} current='SchoolWorks'/>
          </Container>
        );
  }
}

const styles = StyleSheet.create({
});
