import React, { Component } from 'react';
import { StyleSheet, Image, WebView, Dimensions } from 'react-native';
import {Container, Content} from 'native-base';
import Foot from './Foot';

var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
export default class Quiz extends Component {

  constructor(props){
    super(props);
    // this.props.navigation.state.params = this.props.navigation.state.params;
    this.state = {};
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.title
  });
  render() {
    var navigation = this.props.navigation;
        return (
          <Container>
              <Content>
                  <WebView
                    resizeMode='contain'
                    automaticallyAdjustContentInsets={true}
                    style={{width:deviceWidth, height:deviceHeight-135}}
                    startInLoadingState={true}
                    source={{uri: navigation.state.params.url}}
                    />
              </Content>
              <Foot navigation={navigation} current={navigation.state.params.currentTab}/>
          </Container>
        );
  }

}
