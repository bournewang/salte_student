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
export default class Quiz extends Component {

  constructor(props){
    super(props);
    params = this.props.navigation.state.params;

    this.state = {
      // questions:  params.questions,
      // question: params.questions[params.index],
      // index: params.index,
      // total: params.total,
      knowledge_point: params.knowledge_point,
      school_work: params.school_work,
      question_id: params.question_id
    };
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.school_work ? '作业' : (navigation.state.params.knowledge_point ? '知识点测试' : '错题强化'),
  });
  render() {
    console.log("question_id: "+this.state.question_id);
       const { navigate } = this.props.navigation;
       var url = this.state.knowledge_point ? config.get_quiz_knowledge_point_url(this.state.knowledge_point.id) :
        (this.state.school_work ? config.get_quiz_school_work_url(this.state.school_work.id) : config.get_quiz_question_url(this.state.question_id));
       console.log("quiz url: "+url);

        return (
          <Container>
              <Content style={{flexDirection: 'column'}}>

                  <WebView
                    resizeMode='contain'
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

var styles = StyleSheet.create({
    img: {

    }
})
