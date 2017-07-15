import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native';
import { Body, Container, Content, Text, Button, Left, Right, Spinner} from 'native-base';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer from 'react-native-video-player';
import IconLoading from './Icons/Loading';

import Foot from './Foot';
import Quiz from './Quiz';

export default class Explanation extends Component {
  constructor(props){
    super(props);

    this.state = {
      question:  this.props.navigation.state.params.question,
      explanations: null,
      video_url: null,
      loading: true
    };
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.question.knowledge_point_name, //`知识点： ${navigation.state.params.knowledge_point.name}`
    // headerRight: <Button color={screenProps.tintColor}></Button>,
  });
  onTestPress(){
    if(this.player){this.player.onPlayPress();}

    const {navigate, state} = this.props.navigation;
    navigate('Quiz', {question_id: this.state.question.id})
  }
  render() {
       const {navigate, state} = this.props.navigation;
       var explanation = this.state.explanations ? this.state.explanations[0] : null;

        return (
          <Container>
              <Content>
              { !this.state.loading && explanation &&
                <View>
                    <VideoPlayer
                          ref={p => {
                            this.player = p; }
                          }
                          endWithThumbnail
                          thumbnail={{uri: config.api_base_url+'/img/empty.jpg'}}
                          video={{ uri: this.state.video_url }}
                          resizeMode={'cover'}
                          videoWidth={300}
                          videoHeight={200}
                          autoplay={true}
                        />

                <Text>{explanation.desc_text}</Text>
                </View>
              }
              { !this.state.loading && !explanation &&
                <Text>没有讲解</Text>
              }
                <Button full success onPress={() => this.onTestPress()}>
                  <Text>测试</Text>
                </Button>

              { this.state.loading && <IconLoading/>}
              </Content>
              <Foot navigation={this.props.navigation}/>
          </Container>
        );
  }
  componentDidMount(){
    storage.load({key: 'QuestionExplanation'+this.state.question.id})
    .then((data)=>{
      console.log("load data from storge");
      this.setState({
        loading: false,
        explanations: data,
        video_url: data && data[0] ? data[0].video : null
      })
    }).catch((err) => {
      console.log("not get explanations");
    })
    this.fetchData();
  }

  fetchData(){
    fetch(config.get_api_question_explanations_url(this.state.question.id), null, this)
    .then((res)=>{
      return res.json();
    })
    .then((data) => {
      this.setState({
        loading: false,
        explanations: data,
        video_url: data && data[0] ? data[0].video : null
      })

      storage.save({
        key: 'QuestionExplanation'+this.state.question.id,
        data: data,
        expires: null
      });
      console.log("save data in storage");
    })
    .catch((error) => {
      console.debug(error);
    });
  }

  componentWillUnmount(){
    console.log("componentWillUnmount");
  }
}

var styles = StyleSheet.create({
  mainSection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },
  videoContainer:{
    flex: 4
  },
  video: {
    height: '100%',
    width: '100%',
  },
  detailSection: {
    flex: 2,
    flexDirection: 'column',
    // justifyContent: 'flex-end',
    // alignItems:'flex-start'
  }
});
