import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Foot from './Foot';
import SchoolWorks from './SchoolWorks';
import Login from './Login';

export default class Home extends Component {
  static navigationOptions = {
    title: '思而拓',
  };
  render() {
       const { navigate } = this.props.navigation;

        return (
          <Container>
              <Content>
                <Image source={require('../img/home.jpg')} style={{resizeMode: 'cover'}}>
                </Image>
              </Content>
          </Container>
        );
  }

  componentDidMount(){
    const { navigate } = this.props.navigation;

    storage.load({
      key: 'loginState',
    }).then(ret => {
      console.log("load token: "+ret.token);
      config.token = ret.token;
      config.user = ret.user;
      navigate('SchoolWorks');
    }).catch(err => {
      console.warn(err.message);
      navigate('Login');
    })

 }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
