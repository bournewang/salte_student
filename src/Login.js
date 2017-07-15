import React, { Component } from 'react';
import { Button, Container, Content, Form, Item, Input, Icon, Label, Text, Spinner } from 'native-base';
import IconLoading from './Icons/Loading';
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {cellphone: '13600001111', password: '123456', loading: false};
  }
  static navigationOptions = {
    title: '登录',
  };
  submit(){
    var navigate = this.props.navigation.navigate;
    this.setState({loading: true});

    fetch(config.api_login, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: helper.build_http_query({cellphone: this.state.cellphone, password: this.state.password})
    })
    .then((response) =>{
      console.log(response);
      return response.json()
    })
    .then((res) =>{
      console.log("token: "+res.token);
      config.token = res.token;
      config.user = res.user;
      storage.save({
        key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
        data: {
          user: res.user,
          token: config.token,
        },
        expires: null, //1000 * 3600
      });

      this.setState({loading: false});
      navigate('SchoolWorks');
    });
  }
  componentDidMount(){

  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content>
          <Form>
            <Item style={{height: 100}}/>
            <Item>

            <Label>手机</Label>
              <Icon  name='ios-phone-portrait' style={{marginLeft: 5}}/>
              <Input value={this.state.cellphone} onChangeText={(text) => this.setState({cellphone: text})}/>
            </Item>
            <Item>
              <Label>密码</Label>
              <Icon name='ios-key-outline'/>
              <Input value={this.state.password} secureTextEntry onChangeText={(text) => this.setState({password: text})}/>
            </Item>

            <Button full success onPress={() => this.submit()}>
              <Icon name="ios-log-in"/>
              <Text>登录</Text>
            </Button>
            {this.state.loading && <IconLoading />}
          </Form>
        </Content>
      </Container>
    );
  }
}
