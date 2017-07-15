import React, { Component } from 'react';
import { StyleSheet, WebView } from 'react-native';
import { Body, Badge, Container, Content, Text, Button,Footer, Spinner, H1, Icon, Left, View, Form, List, ListItem, Item, Label, CheckBox, Thumbnail, Input, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FootTab from './FootTab';
import Foot from './Foot';
import QaList from './QaList';
import System from './profile/System';
import IconLoading from './Icons/Loading';
import Webpage from './Webpage';
// import codePush from 'react-native-code-push';
import Avatar from './profile/Avatar';

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      anonymity: false,
      qa: '',
      qa_submiting: false,
      update: false,
      avatar: config.user.avatar.thumb
    };
  }
  static navigationOptions = {
    title: '我的',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content>
          <List>
          {
            config.user &&
            <ListItem avatar style={{marginLeft: 0,flexDirection: 'row', flex: 1, backgroundColor: '#3f51b5'}}>
              <Left><Thumbnail source={{uri: this.state.avatar}}/></Left>
              <Body style={{flex: 4, justifyContent: 'center'}}>
                <H1 style={{justifyContent: 'center', color: 'white'}}>{config.user.name}</H1>
                <Text style={{justifyContent: 'center', fontSize: 12, color: 'white'}}>{config.user.school}，{config.user.grade}，{config.user.ban}</Text>
              </Body>
              <Right style={{alignItems: 'center'}}><Icon name="ios-settings" style={{fontSize: 2 * config.icon_size}} onPress={() => navigate('Avatar')}/></Right>
            </ListItem>
          }

            <ListItem avatar>
              <Left><Icon name="ios-pie-outline" style={{color:'#d43f3a'}} /></Left>
              <Body><Text>画像</Text></Body>
              <Right style={{paddingTop: 0, paddingBottom: 0}}><Button transparent style={{marginTop: 0, marginBottom: 0}} onPress={() => navigate('Webpage', {url: config.get_profile_chart_url(), title: '我的画像', currentTab: 'Profile'})}><Icon name="ios-arrow-forward" /></Button></Right>
            </ListItem>
            <ListItem avatar>
              <Left><Icon name="ios-help-circle-outline" style={{color:'blue'}} /></Left>
              <Body><Text>问答</Text></Body>
              <Right style={{paddingTop: 0, paddingBottom: 0}}><Button transparent style={{marginTop: 0, marginBottom: 0}} onPress={() => navigate('QaList')}><Icon name="ios-arrow-forward" /></Button></Right>
            </ListItem>
            <ListItem avatar>
              <Left><Icon name="ios-information-circle-outline" style={{color:'blue'}} /></Left>
              <Body>{!this.state.update && <Text>系统更新</Text>}{this.state.update && <Text>有更新可用</Text>}</Body>
              <Right style={{paddingTop: 0, paddingBottom: 0}}><Button transparent style={{marginTop: 0, marginBottom: 0}} onPress={() => navigate('System')}><Icon name="ios-arrow-forward" /></Button></Right>
            </ListItem>
          </List>
          {this.state.loading && <IconLoading />}
        </Content>
        <Footer style={{flexDirection: 'column', height: 100}}>
          {config.token &&
            <Button full danger onPress={() => this.logout()} style={{flex: 1}}>
            <Icon name="ios-log-out"/>
            <Text>登出</Text>
            </Button>
          }
          <View style={{height: 56}}>
            <FootTab navigation={this.props.navigation} current={'Profile'}/>
          </View>
        </Footer>
      </Container>
    );
  }

  logout(){
    this.setState({loading: true});
    console.log("get api logout url: "+config.get_api_logout_url());

    fetch(config.get_api_logout_url(), null, this)
    .then((response) =>{
      return response.json()
    }).then((res) => {
      if (res.ok){
        storage.remove({
          key: 'loginState'
        }).then(ret => {
          console.log("removed loginState");
        }).done();

        const { navigate } = this.props.navigation;
        this.setState({loading: false});
        navigate('Login');
      }
    })
  }

  componentDidMount(){
    // codePush.checkForUpdate().then(update => {
    //     if (!update) {
    //         this.setState({update: null});
    //     }else{
    //         this.setState({update: update});
    //     }
    // })
  }
}

var styles = StyleSheet.create({
  right:{
      paddingTop: 0,
      paddingBottom: 0
  },
  inner_button: {
    marginTop: 0,
    marginBottom: 0
  }
});
