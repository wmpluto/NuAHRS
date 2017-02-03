import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Select, Option} from "react-native-chooser";

var Dimensions = require('Dimensions');//获取屏幕的宽高
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class SettingComponent extends Component {
  constructor(props){
    super(props);
    console.log(props);
  }

  onSelect(data) {
    //alert(data);
  }

  render() {
    const container = {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
        padding: 20,
    }

    return (
      <View style={container}>
        <View style={{flex: 1}}>
          <Select
              onSelect = {this.onSelect.bind(this)}
              defaultText  = "Select CMD Please"
              style = {{borderWidth : 1, borderColor : "red", marginTop:70}}
              textStyle = {{}}
              backdropStyle  = {{backgroundColor : "#d3d5d6"}}
              optionListStyle = {{backgroundColor : "#F5FCFF"}}
            >
            <Option value = "@ss">@ss</Option>
            <Option value = "@sp">@sp</Option>
            <Option value = "@hk00">@hk00</Option>
            <Option value = "@fb">@fb</Option>
            <Option value = "@vb">@vb</Option>
            <Option value = "@mq">@mq</Option>
            <Option value = "@cq">@cq</Option>
            <Option value = "@mr">@mr</Option>
          </Select>
          <Text style={{height: ScreenHeight -160, backgroundColor: "#eeeeee", marginTop: 5}}>SEND</Text>
        </View>
      </View>
    )
  }
}
