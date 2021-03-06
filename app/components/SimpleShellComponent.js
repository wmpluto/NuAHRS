import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity, NativeAppEventEmitter} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Select, Option} from "react-native-chooser";
import BleManager from 'react-native-ble-manager';
import cmds from '../CMDs';

var Dimensions = require('Dimensions');//获取屏幕的宽高
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class SettingComponent extends Component {
  constructor(props){
    super(props);
    console.log(props);

    this.state = {
      content: "",
      writeCharacteristic: "FF01",
      readCharacteristic: "FF02",
      peripheralId: this.props.device.id,
      serviceUUID: "FF00",
    }
  }

  onSelect(data) {
    //alert(data);
    //console.log(data);
    this.setState({content: data});
    BleManager.write(this.state.peripheralId, this.state.serviceUUID, this.state.writeCharacteristic, data, 20);
  }

  handleUpdateCharacteristic(data) {
    var current = (data.value.match(/.{1,2}/g).map(function(v){
      return String.fromCharCode(parseInt(v, 16));
    }).join(''));
    this.setState({content: this.state.content + current});
  }

  componentDidMount() {
    this.handleUpdateCharacteristic = this.handleUpdateCharacteristic.bind(this);
    NativeAppEventEmitter
        .addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateCharacteristic );
    //this._bleConnect(this.props.device.id);
  }

  componentWillUnmount(){
    NativeAppEventEmitter.removeEventListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
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
            <Option value = {cmds.SSCMD}>@ss</Option>
            <Option value = {cmds.SPCMD}>@sp</Option>
            <Option value = {cmds.HOOKCMD}>@hk00</Option>
            <Option value = {cmds.CAZ}>@caz</Option>
            <Option value = {cmds.CGZ}>@cgz</Option>
          </Select>
          <Text style={{height: ScreenHeight -160, backgroundColor: "#eeeeee", marginTop: 5}}>{this.state.content}</Text>
        </View>
      </View>
    )
  }
}
