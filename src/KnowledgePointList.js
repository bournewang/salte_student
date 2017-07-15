import React, { Component } from 'react';
import { ListView, View, TextInput  } from 'react-native';
import { Body,Button,Container,Content,Icon,Left,ListItem,Right,Text,Spinner,Header,Item,Input } from 'native-base';
import { NavigationActions } from 'react-navigation'
import KnowledgePoint from './KnowledgePoint';
const fetch = require('react-native-cancelable-fetch');

export default class KnowledgePointList extends Component {

  constructor(props){
    super(props);
    this.state = {
      list_loading: true,
      item_loading: false,
      subject: props.subject,
      save_key: "KnowledgePoints"+props.subject[0],
      query: '',
      data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  // static navigationOptions = {
  //   title: '知识点',
  // };

  render() {
    const { navigate } = this.props.navigation;

    return (
         <View >
           <Header searchBar rounded>
              <Item>
                <Input placeholder="输入关键词" value={this.state.query}
                  onChangeText={(query) => {this.setState({query});}}
                  onSubmitEditing={(event) => {this.fetchData()}}/>
                <Icon name="ios-close" onPress={()=>{this.state.query = ''; this.fetchData()}}/>
                <Icon name="ios-search" onPress={() => {this.fetchData()}} />
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
           </Header>
           <ListView
             dataSource={this.state.data}
             enableEmptySections={true}
             renderRow={(row) =>
               <ListItem icon>
                 <Left>
                     <Icon name="ios-information-circle-outline" style={{fontSize: 26}}/>
                 </Left>
                 <Body>
                   <Text>{row.knowledge_set_name}: {row.name}</Text>
                 </Body>
                 <Right>
                    <Button transparent onPress={() => {this.setState({item_loading: true});navigate('KnowledgePoint', {knowledge_point: row})}} >
                     <Icon name="arrow-forward" />
                    </Button>
                 </Right>
               </ListItem>
               }
             />
             {this.state.list_loading && <Spinner color='lightgreen' />}
         </View>
    );
  }

  componentDidMount(){
    this.setState({item_loading: false});
    // 组件加载完成，开始加载网络数据
     storage.load({
       key: this.state.save_key,
     }).then(items => {
      //  this.setState({list_loading: false});
       this.setState({
         data:this.state.data.cloneWithRows(items),
         loaded:true,
       })
     }).catch(err => {
       console.warn('catch error: '+err.message);

     })
     this.fetchData();
  }
  componentWillUnmount(){
    fetch.abort(this);
    this.setState({
      list_loading: false,
      item_loading: false
    });
  }

  fetchData(){
    this.setState({list_loading: true});
    var url = config.get_api_knowledge_points_url(this.state.subject[0], this.state.query);
    fetch(url, null, this)
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
      storage.save({
        key: this.state.save_key,
        data: responseData.items,
        expires: null
      });

      this.setState({
        data:this.state.data.cloneWithRows(responseData.items),
        loaded:true,
      })
    })
    .catch((error) => {
      console.debug(error);
    })
    .done();
  }
}
