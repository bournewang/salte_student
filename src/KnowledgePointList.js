import React, { Component } from 'react';
import { ListView, View, TextInput, FlatList  } from 'react-native';
import { Body,Button,Container,Content,Icon,Left,ListItem,Right,Text,Spinner,Header,Item,Input } from 'native-base';
import { NavigationActions } from 'react-navigation'
import KnowledgePoint from './KnowledgePoint';
const fetch = require('react-native-cancelable-fetch');

export default class KnowledgePointList extends Component {

  constructor(props){
    super(props);
    this.state = {
      refreshing: true,
      item_loading: false,
      subject: props.subject,
      save_key: "KnowledgePoints"+props.subject[0],
      query: '',
      data: [],
      page: 1
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
           <FlatList
            refreshing={this.state.refreshing}
            onRefresh={() => this.fetchData()}
            // onEndReached={() => this.fetchData()}
            onEndReachedThreshold={0.5}
            onEndReached={(info)=>{
                        console.log("================== distance: "+info.distanceFromEnd);
                        }}
             data={this.state.data}
             renderItem={({item}) =>
               <ListItem icon key={item.id}>
                 <Left>
                     <Icon name="ios-information-circle-outline" style={{fontSize: 26}}/>
                 </Left>
                 <Body>
                   <Text style={{fontSize: 12, height: 18}}>{item.name}</Text>
                   <Text style={{color: 'gray', fontSize: 10}}>{item.knowledge_set_name}</Text>
                 </Body>
                 <Right>
                    <Button transparent onPress={() => {this.setState({item_loading: true});navigate('KnowledgePoint', {knowledge_point: item})}} >
                     <Icon name="ios-arrow-forward" />
                    </Button>
                 </Right>
               </ListItem>
               }
             />
         </View>
    );
  }

  componentDidMount(){
    this.setState({item_loading: false});
    // 组件加载完成，开始加载网络数据
     storage.load({
       key: this.state.save_key,
     }).then(items => {
      //  this.setState({refreshing: false});
       this.setState({
         data: items,
         refreshing: false,
         loaded:true,
       })
     }).catch(err => {
       console.log('catch error: '+err.message);

     })
     this.fetchData();
  }
  componentWillUnmount(){
    fetch.abort(this);
    this.setState({
      refreshing: false,
      item_loading: false
    });
  }

  fetchData(){
    this.setState({refreshing: true, page: 1});
    var url = config.get_api_knowledge_points_url(this.state.subject[0], this.state.query);
    fetch(url, null, this)
    .then((response) =>{
      this.setState({refreshing: false});
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
        data: responseData.items,
        pages: responseData.pages,
        loaded:true,
      })
    })
    .catch((error) => {
      console.debug(error);
    })
    .done();
  }
}
