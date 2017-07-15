import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native';
import { Body, Container, Content, Text, Button, Left, Right} from 'native-base';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer from 'react-native-video-player';

import Foot from './Foot';
import Quiz from './Quiz';

export default class KnowledgePoint extends Component {
  constructor(props){
    super(props);

    this.state = {
      knowledge_point:  this.props.navigation.state.params.knowledge_point,
      explanations: null,
      questions: null,
      video_url: null,
      video: { width: 300, height: 200, duration: 79 },
      // thumbnailUrl: undefined,
      // videoUrl: "http://192.168.1.31:3005/uploads/video/20170613162214/160348.mp4",
    };

    this.player = null;

  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.knowledge_point.name, //`知识点： ${navigation.state.params.knowledge_point.name}`
    // headerRight: <Button color={screenProps.tintColor}></Button>,
  });
  onTestPress(){
    this.player.onPlayPress();
    const {navigate, state} = this.props.navigation;
    navigate('Quiz', {knowledge_point: this.state.knowledge_point});
  }
  render() {
       var knowledge_point = this.state.knowledge_point;

        return (
          <Container>
              <Content>
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

                    <Text>{knowledge_point.name}</Text>
                    <Text>{knowledge_point.desc}</Text>
                    <Button full success onPress={() => this.onTestPress()}>
                      <Text>测试</Text>
                    </Button>

              </Content>
              <Foot navigation={this.props.navigation}/>
          </Container>
        );
  }
  componentDidMount(){
    console.log("get_api_knowledge_point_url: ");
    console.log(config.get_api_knowledge_point_url(this.state.knowledge_point.id));
    fetch(config.get_api_knowledge_point_url(this.state.knowledge_point.id), null, this)
    .then((res)=>{
      return res.json();
    })
    .then((data) => {
      console.log("res: "+data.name);
      this.setState({
        explanations: data.explanations,
        questions: data.questions,
        video_url: data.explanations && data.explanations[0] ? data.explanations[0].video : null})
      console.debug("video url: "+this.state.video_url);
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

// <VideoPlayer source={{uri: "http://192.168.1.31:3005/uploads/video/20170613162214/160348.mp4"}}
//   navigator={ this.props.navigation }
//   style1={styles.video}
//   playWhenInactive={ false }
//   paused={ true }
//   title={knowledge_point.name}
//   resizeMode={ 'cover' }
//   repeat={false}
//   seekColor={ '#FFF' }
// />
