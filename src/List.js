import React, { Component } from 'react';
import { ListView, View, TextInput, RefreshControl  } from 'react-native';
import IconLoading from './Icons/Loading';
const fetch = require('react-native-cancelable-fetch');

export default class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      refreshing: false,
      init_loading: true,   // only show loading icon in first view
      data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  // static navigationOptions = {
  //   title: '知识点',
  // };

  render() {

    return (
      <View>
        <ListView
          dataSource={this.state.data}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
               refreshing={this.state.refreshing}
               onRefresh={this._onRefresh.bind(this)}
             />
           }
          renderRow={this.props.renderRow}
          />
          {this.state.init_loading && <IconLoading />}
      </View>
    );
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData();
  }

  componentDidMount(){
    this.setState({item_loading: false});
    // 组件加载完成，开始加载网络数据
     storage.load({
       key: this.props.storage_key,
     }).then(items => {
      //  this.setState({init_loading: false});
      console.log("get data from storage: "+this.props.storage_key);
       this.setState({data:this.state.data.cloneWithRows(items)})
     }).catch(err => {
       console.log('catch error: '+err.message);

     })
     this.fetchData();
  }
  componentWillUnmount(){
    fetch.abort(this);
    this.setState({
      init_loading: false,
      item_loading: false
    });
  }

  fetchData(){
    // this.setState({init_loading: true});
    console.log("fetch data: "+this.props.data_url);
    return fetch(this.props.data_url, null, this)
    .then((response) =>{
      this.setState({init_loading: false, refreshing: false});
      return response.json()
    })
    .then((data) =>{
      if (data.error && data.msg == 'TOKEN_ERROR'){
        this.props.navigation.navigate('Login');
        return
      }
      storage.save({
        key: this.props.storage_key,
        data: data.items,
        expires: null
      });

      this.setState({data: this.state.data.cloneWithRows(data.items)})
    })
    .catch((error) => {
      console.debug(error);
    });
  }
}
