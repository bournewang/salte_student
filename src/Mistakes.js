import React, { Component } from 'react';
import { ListView, RefreshControl } from 'react-native';
import { Body, Button, Container, Content, Icon, Image, Left, ListItem, Right, Text } from 'native-base';
import { NavigationActions } from 'react-navigation'
import Foundation from 'react-native-vector-icons/Foundation';
import IconCheck from './Icons/Check';
import IconTimes from './Icons/Times';
import IconFinished from './Icons/Finished';
import IconUnfinished from './Icons/Unfinished';

import Explanation from './Explanation';
import Foot from './Foot';
const fetch = require('react-native-cancelable-fetch');

export default class Mistakes extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      refreshing: true,
      mounted: false,
      error: false,
      error_message: null
    };
  }

  static navigationOptions = {
    title: '错题本'
  };
  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }
  render() {
    const { navigate } = this.props.navigation;

       return (
                  <Container>
                     <Content style={{flexDirection: 'column'}}>
                       <ListView
                         dataSource={this.state.data}
                         enableEmptySections={true}
                         style={{flex: 1}}
                         refreshControl={
                           <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this._onRefresh.bind(this)}
                            />
                          }
                         renderRow={(row) =>
                           <ListItem icon>
                             <Left>
                                 <Icon name="ios-create-outline" style={{fontSize: 30}}/>
                             </Left>
                             <Body>
                               <Text style={{fontSize: 12, height: 30}}>{row.question.content_text}</Text>
                             </Body>
                             <Right>
                                  {row.state && <IconCheck/>}{!row.state && <IconTimes/>}
                                  <Button transparent onPress={() => {console.log("you click me !");navigate('Explanation', {question: row.question})}}>
                                  <Icon name="ios-arrow-forward" />
                                 </Button>
                             </Right>
                           </ListItem>
                           }
                         />

                         { this.state.error && <Text style={{textAlign: 'center', color: '#e99002'}}>{this.state.error_message}</Text>}
                     </Content>
                     <Foot navigation={this.props.navigation} current='Mistakes'/>
                 </Container>
       );
   }

   componentDidMount(){
     console.log("componentDidMount");
     console.log("mounted state: "+this.state.mounted);
     this.setState({item_loading: false, error: false });
     // 组件加载完成，开始加载网络数据
      storage.load({
        key: 'Mistakes:'+config.user.cellphone,
      }).then(items => {
        this.setState({list_loading: false});
        this.setState({
          data:this.state.data.cloneWithRows(items),
          refreshing:false,
        })
      }).catch(err => {
        console.log('catch error: '+err.message);
      })
     this.fetchData();
    }
  componentWillUnmount(){
    fetch.abort(this);
  }

  fetchData(){
    return fetch(config.get_mistaks_url(), null, this)
    .then((response) =>{
      this.setState({list_loading: false});
      return response.json()
    })
    .then((responseData) =>{
      console.log("responseData.data=="+JSON.stringify(responseData))
      if (responseData.error && responseData.msg == 'TOKEN_ERROR'){
        this.props.navigation.navigate('Login');
        return
      }
      if (!responseData.items || responseData.items.length < 1)return;

      storage.save({
        key: "Mistakes",
        data: responseData.items,
        expires: null
      });

      this.setState({
        data:this.state.data.cloneWithRows(responseData.items),
        refreshing:false,
      })
    })
    .catch((error) => {
      console.debug(error);
      this.setState({
        error: true,
        error_message: error.message
      });
    });
  }

}
