import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

var Dimensions = require('Dimensions');//获取屏幕的宽高
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class SettingComponent extends Component {
  constructor(props){
    super(props);
    console.log(props);

    var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
        dataSource:ds,
        data: ["Calibration", "SimpleShell", "Setting", "About"]
    }
  }

  _renderRow(rowData, rowId) {
    return(
      <TouchableOpacity style={{height: 32, marginTop: 10, backgroundColor: '#eeeeee', justifyContent: 'center', width:ScreenWidth-40}}
        onPress={() => Actions.shellView()}>
        <Text style={{fontSize: 18}}>{rowData}</Text>
      </TouchableOpacity>
    )
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
          <ListView style={{marginTop:50}}
              enableEmptySections={true}
              dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
              renderRow={(rowData, sectionId, rowId) => this._renderRow(rowData, rowId)}
              />
      </View>
    )
  }
}
