import React, { Component } from 'react';
import { StyleSheet, Image, WebView, Dimensions } from 'react-native';
import { Button, Container, Content, Text } from 'native-base';
// import HTMLView from 'react-native-htmlview';
// var HtmlRender = require('react-native-html-render')
// import HtmlRender from 'react-native-html-render';
// import HTML from 'react-native-render-html'
// import HTML from 'react-native-fence-html'
// import WebContainer from './src/WebContainer';
import Foot from './Foot';

var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
export default class QuizShow extends Component {

  constructor(props){
    super(props);
    params = this.props.navigation.state.params;

    this.state = {
      // questions:  params.questions,
      // question: params.questions[params.index],
      // index: params.index,
      // total: params.total,
      knowledge_point: params.knowledge_point,
      school_work: params.school_work
    };
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.school_work ? '作业' : '知识点测试',
  });
  render() {
       const { navigate } = this.props.navigation;
       var url = config.get_quiz_school_work_show_url(this.state.school_work.id);
       console.log("quiz url: "+url);

        return (
          <Container>
              <Content style={{flexDirection: 'column'}}>

                  <WebView
                    resizeMode='cover'
                    automaticallyAdjustContentInsets={true}
                    style={{width:deviceWidth, height:deviceHeight-135}}
                    startInLoadingState={true}
                    source={{uri: url}}
                    />
              </Content>
              <Foot navigation={this.props.navigation} current='Profile'/>
          </Container>
        );
  }

  componentDidMount(){

 }
}
