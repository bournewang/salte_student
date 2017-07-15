import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

const resetAction = (to) => NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: to})
  ]
});

export default class FootButton extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
       const navigation = this.props.navigation;

        return (
                  <Button
                    vertical
                    active={this.props.active}
                    onPress={() => navigation.dispatch(resetAction(this.props.route))} >
                      <Icon name={this.props.icon} style={{fontSize: 30}}/>
                      <Text>{this.props.label}</Text>
                  </Button>

        );
  }
}
