import React, { Component } from 'react';
import {View} from 'react-native';
import { Button, Body, Container, Content, Form, List, ListItem, Input, Icon, Label, Left, Text, Right, Spinner, ProgressBar } from 'native-base';
import IconLoading from '../Icons/Loading';
import Foot from '../Foot';
import codePush from 'react-native-code-push';

export default class System extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      update: false,
      downloading: false,
      installing: false,
      download_progress: 0,
      update_installed: false,
      error: ''
    };
  }
  static navigationOptions = {
    title: '系统更新',
  };

  componentDidMount(){
    this.setState({loading: true});

    codePush.checkForUpdate().then(update => {
        this.setState({loading: false});
        if (!update) {
            this.setState({update: null});
        }else{
            this.setState({update: update});
        }
    })
  }

  install_update(){
    codePush.sync({ updateDialog: false },
      (status) => {
        switch (status) {
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({downloading: true});
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({downloading: false, installing: true});
            // Hide "downloading" modal
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            this.setState({installing:false, update_installed: true})
            break;
          case codePush.SyncStatus.SYNC_IN_PROGRESS:
            this.setState({error: '已经在下载更新了。'})
            break;
          case codePush.SyncStatus.UNKNOWN_ERROR:
            this.setState({error: '未知错误'})
            break;

        }
      },
      ({ receivedBytes, totalBytes, }) => {
        /* Update download modal progress */
        this.setState({download_progress: (100 * receivedBytes/totalBytes).toFixed(2)})
      });
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content>
          <List>
            {!this.state.loading && !this.state.update &&
              <ListItem avatar>
                <Left><Icon name="ios-checkmark"/></Left>
                <Body><Text>无更新，App已是最新版本。</Text></Body>
              </ListItem>
            }
            {!this.state.loading && this.state.update &&
              <View>
                <ListItem avatar><Body><Text>有新版本可用， 更新日志：</Text></Body></ListItem>
                <ListItem avatar>
                  <Body><Text>{this.state.update.description}</Text></Body>
                </ListItem>
              </View>
            }

            {this.state.update &&
            <ListItem >
              <Body>
                <Button full success onPress={() => this.install_update()}>
                  <Icon name="ios-cloud-download-outline"/><Text>安装更新</Text>
                </Button>
              </Body>
            </ListItem>}

            {this.state.loading && <IconLoading />}

            {this.state.downloading &&
              <ListItem>
                <Body>
                  <Text>正在下载：{this.state.download_progress}%</Text>
                  </Body>
              </ListItem>
            }
            {this.state.installing && <ListItem><Body><Text>正在安装</Text></Body></ListItem>}
            {this.state.update_installed && <ListItem><Body><Text>安装已完成，请重启APP。</Text></Body></ListItem>}
          </List>
        </Content>
        <Foot navigation={this.props.navigation} current='Profile'/>
      </Container>
    );
  }
}
