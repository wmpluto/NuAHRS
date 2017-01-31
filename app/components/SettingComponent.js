import React, { Component } from 'react';
import { View, Text} from 'react-native';

export default class SettingComponent extends Component {
  constructor(props){
    super(props);
    console.log(props);
  }

  render() {
    return (
      <View style={{margin: 128}}>
        <Text>This SettingView</Text>
      </View>
    )
  }
}
