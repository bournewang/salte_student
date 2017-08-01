import React, { Component } from 'react';
import { Button, Container, Content, Icon, Text, List, ListItem, Left, Right, Thumbnail, Body, Footer, FooterTab } from 'native-base';
import FootTab from '../FootTab';
import {upload_image} from '../Helper';
import ImagePicker from 'react-native-image-crop-picker';
const fetch = require('react-native-cancelable-fetch');

export default class Avatar extends Component {
  constructor(props){
    super(props);
    this.state = {
      avatar: config.user.avatar
    };
  }
  static navigationOptions = {
    title: '基本信息',
  };
  update_avatar(){
    console.log("click avatar, call image picker");
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
    }).then(image => {
      console.log('received image', image);
      console.log("set image to: " + image.path);

      upload_image(config.get_api_update_avatar_url(), {path: image.path}).then(() => {
        this.update_userinfo();
      });

    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }
  componentWillUnmount(){
    fetch.abort();
  }
  update_userinfo(){
    console.log("*** update_userinfo: "+config.get_api_user_info_url());
    this.setState({loading: true});

    fetch(config.get_api_user_info_url(), null, this)
    .then((response) =>{
      console.log("*** get user info");
      this.setState({loading: false});
      return response.json()
    }).then((user) => {
      console.log("*** update config.user");
      this.setState({avatar: user.avatar});
      config.user = user;
      storage.save({
        key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
        data: {
          user: user,
          token: config.token,
        },
        expires: null, //1000 * 3600
      });
    });
  }
  render() {
        return (
          <Container>
            <Content>
              <List>
                <ListItem avatar style={{height: 100}}>
                  <Left><Text>头像</Text></Left>
                  <Body style={{height: '100%'}}>
                    <Button full transparent style={{height: '100%'}} onPress={() => this.update_avatar()} >
                      <Thumbnail source={{uri: this.state.avatar}}/>
                    </Button>
                  </Body>
                </ListItem>
                <ListItem>
                  <Left><Text>姓名</Text></Left>
                  <Body><Text>{config.user.name}</Text></Body>
                </ListItem>
                <ListItem>
                  <Left><Text>学校</Text></Left>
                  <Body><Text>{config.user.school}</Text></Body>
                </ListItem>
                <ListItem>
                  <Left><Text>年级</Text></Left>
                  <Body><Text>{config.user.grade}</Text></Body>
                </ListItem>
                <ListItem>
                  <Left><Text>班级</Text></Left>
                  <Body><Text>{config.user.ban}</Text></Body>
                </ListItem>
              </List>

            </Content>
            <Footer >
                <FootTab navigation={this.props.navigation} current={this.props.current}/>
            </Footer>
          </Container>
        );
  }
}
