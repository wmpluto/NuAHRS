import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SettingComponent extends Component {
  constructor(props){
    super(props);
    console.log(props);
  }

  render() {
    const container = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 20,
    }

    return (
      <View style={container}>
        <Text style={{margin:100}}>test</Text>
      </View>
    )
  }
}
