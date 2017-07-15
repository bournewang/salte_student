import React, { Component } from 'react';
import { ListView, View, TextInput, ScrollView  } from 'react-native';
import { Body,Button,Container,Content,Icon,Left,ListItem,Right,Text,Spinner,Header,Item,Input,Footer, FooterTab } from 'native-base';
import FootTab from './FootTab';
import Foot from './Foot';
import List from './List';
import IconFinished from './Icons/Finished';
import IconUnfinished from './Icons/Unfinished';

const fetch = require('react-native-cancelable-fetch');

export default class QaList extends Component {

  constructor(props){
    super(props);
    this.state = {
      list_loading: true,
      data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  static navigationOptions = {
    title: '我的问答',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content>
        <View style={{flex: 1}}>
          <List style={{
             justifyContent: 'center',
             flexDirection: 'row',
             flexWrap: 'wrap',
             flex:4,
           }}
            storage_key={"myQas"}
            data_url={config.get_api_my_qas_url()}
            navigation={this.props.navigation}
            renderRow={(row) =>
              <ListItem icon>
                <Left>
                  <Icon name="ios-help" style={{fontSize: 26}}/>
                </Left>
                <Body>
                  <Text style={{fontSize: 12}}>{row.subject}: {row.content.substring(0,40)}</Text>
                </Body>
                <Right>
                  {row.state  && <IconFinished/>}{!row.state && <IconUnfinished/>}
                </Right>
              </ListItem>
            }
          />

          </View>
        </Content>
        <Footer style={{flexDirection: 'column', height: 100}}>
          <Button full success onPress={() => navigate('QaForm')} style={{flex: 1}}>
            <Icon name="ios-add-circle-outline"/>
            <Text>提问</Text>
          </Button>
          <View style={{height: 56}}>
            <FootTab navigation={this.props.navigation} current={'Profile'}/>
          </View>
        </Footer>
      </Container>
    );
  }

}
