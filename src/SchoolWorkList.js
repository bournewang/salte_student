import React, { Component } from 'react';
import { ListView, RefreshControl, View, TextInput  } from 'react-native';
import { Body,Button,Container,Content,Icon,Left,ListItem,Right,Text,Spinner,Header,Item,Input } from 'native-base';
import { NavigationActions } from 'react-navigation'
import Foundation from 'react-native-vector-icons/Foundation';
import SchoolWorkStart from './SchoolWorkStart';
import IconCheck from './Icons/Check';
import IconTimes from './Icons/Times';
import IconFinished from './Icons/Finished';
import IconUnfinished from './Icons/Unfinished';
import Foot from './Foot';
const fetch = require('react-native-cancelable-fetch');

export default class SchoolWorkList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      school_work_type: props.school_work_type,
      school_works_key: "SchoolWorks"+props.school_work_type,
      refreshing: true,
      init_loading: true,
      error_message: null
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }
  render() {
    console.log("school_work_type: "+this.state.school_work_type);
    console.log("school_work_type: course "+config.SCHOOL_WORK_TYPE_COURSE);
    console.log("school_work_type: test "+config.SCHOOL_WORK_TYPE_TEST);
    const { navigate } = this.props.navigation;

       return (
              <View style={{flex:1}}>
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
                           <Foundation name="superscript" style={{fontSize: 30}}/>
                       </Left>

                        <Body style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                          <Text style={{flex: 3, fontSize: 14}}>
                            {row.subject}
                            {([config.SCHOOL_WORK_TYPE_COURSE, config.SCHOOL_WORK_TYPE_TEST].indexOf(this.state.school_work_type) > -1) ? row.name : row.date}
                          </Text>
                          <Text style={{flex: 1, fontSize: 9, textAlign: 'center', fontSize: 12}}>{row.school_work_type}</Text>
                        </Body>

                       <Right>
                            {row.finished  && <IconFinished/>}{!row.finished && <IconUnfinished/>}
                            <Button transparent onPress={() => navigate(row.finished ? 'QuizShow' : 'Quiz', {school_work: row})}>
                            <Icon name="arrow-forward" />
                           </Button>
                       </Right>
                     </ListItem>
                     }
                   />
                   {this.state.init_loading && !this.state.refreshing && <Spinner color='lightgreen' />}
               </View>
       );
   }

   componentDidMount(){
     console.log("componentDidMount");
     console.log("mounted state: "+this.state.mounted);
     this.setState({init_loading: true});
     // 组件加载完成，开始加载网络数据
      storage.load({
        key: this.state.school_works_key,
      }).then(items => {
        // this.setState({init_loading: false});
        this.setState({
          data:this.state.data.cloneWithRows(items),
          refreshing:false,
        })
      }).catch(err => {
        console.warn('catch error: '+err.message);
      })
     this.fetchData();
    }
  componentWillUnmount(){
    fetch.abort(this);
  }

  fetchData(){
    return fetch(config.get_api_school_works_url(this.state.school_work_type), null, this)
    .then((response) =>{
      this.setState({init_loading: false});
      return response.json()
    })
    .then((responseData) =>{
      console.log("responseData.data=="+JSON.stringify(responseData))
      if (responseData.error && responseData.msg == 'TOKEN_ERROR'){
        this.props.navigation.navigate('Login');
        return
      }
      storage.save({
        key: this.state.school_works_key,
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
