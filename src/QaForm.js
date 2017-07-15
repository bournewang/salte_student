import React, { Component } from 'react';
import {TextInput, Switch} from 'react-native';
import { Button, Container, Content, Form, Item, Input, Icon, Label, Text, Spinner, Picker } from 'native-base';
import IconLoading from './Icons/Loading';
import Foot from './Foot';
// const Item = Picker.Item;
import { NavigationActions } from 'react-navigation'

export default class QaForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      subject: config.subjects[0][0],
      content: '',
      anonymity: false,
      qa_submiting: false
    };
  }
  static navigationOptions = {
    title: '提问',
  };

  render() {

    return (
      <Container>
        <Content>
          <Form>
            <Item regular>
              <Label>科目</Label>
            </Item>

            <Picker
              selectedValue={this.state.subject}
              onValueChange={(subject) => this.setState({subject})}>
              {
                config.subjects.map((subject) => {
                  return (<Picker.Item key={subject[0]} label={"          "+subject[1]} value={subject[0]} />)
                })
              }
            </Picker>
            <Item regular>
              <Label>匿名</Label>
              <Switch onValueChange={(b) => {console.log('value :' + b);this.setState({anonymity: b})}} />
            </Item>
            <Item regular>
              <Label>提问</Label>
              <TextInput
                multiline={true}
                numberOfLines={8}
                style={{width: '100%'}}
                onChangeText={(content) => this.setState({content})}
              />
            </Item>


              <Button full success onPress={() => this.qa_submit()}>
                <Icon name="ios-send-outline"/>
                <Text>提交</Text>
              </Button>

            {this.state.qa_submiting && <IconLoading />}
          </Form>
        </Content>
        <Foot navigation={this.props.navigation} current='Profile'/>
      </Container>
    );
  }

  qa_submit(){
    this.setState({qa_submiting: true});

    fetch(config.api_qa, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: helper.build_http_query({
        token: config.token,
        content: this.state.content,
        subject_id: this.state.subject,
        anonymity: this.state.anonymity
      })
    }).then((response) =>{
      console.log("get response =--------------");
      this.setState({qa_submiting: false});
      // alert("已提交给老师！");

      return response.json();
    }).then((data) => {
      if (data.ok){
        this.props.navigation.goBack();
      }else{
        alert("提交失败： "+data.msg);
      }
    });
  }
}
