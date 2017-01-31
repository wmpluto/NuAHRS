import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    ListView,
    StyleSheet,
    TouchableHighlight,
    NativeAppEventEmitter,
    Platform,
    PermissionsAndroid
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import ScannedDeviceView from './ScannedDeviceView';

class ScannedDeviceComponent extends Component {

    constructor(){
        super()

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            ble:null,
            scanning:false,
            dataSource:ds,
            devices: new Array
        }
    }

    componentDidMount() {
        BleManager.start({showAlert: false});
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

        NativeAppEventEmitter
            .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("Permission is OK");
                } else {
                  PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                    if (result) {
                      console.log("User accept");
                    } else {
                      console.log("User refuse");
                    }
                  });
                }
          });
        }
    }

    handleScan() {
        BleManager.scan([], 30, true)
            .then((results) => {console.log('Scanning...'); });
    }

    toggleScanning(bool){
        if (bool) {
            this.setState({scanning:true})
            this.scanning = setInterval( ()=> this.handleScan(), 3000);
        } else{
            this.setState({scanning:false, ble: null})
            clearInterval(this.scanning);
        }
    }

    handleDiscoverPeripheral(data){
        this.setState({ ble: data })
        for (device of this.state.devices) {
           if (data.id == device.id) {
               return
           }
        }
        this.state.devices.push(data)
    }

    _renderRow(rowData) {
        if (rowData.hasOwnProperty("name")) {
            return (
             <ScannedDeviceView
               name={rowData.name}
               uuid={rowData.id}
               rssi={rowData.rssi}
               onClick={null}
             />
           )
       } else {
           return (
            <ScannedDeviceView
              name={null}
              uuid={rowData.id}
              rssi={rowData.rssi}
              onClick={null}
            />
          )
       }
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
                <ListView style={{flex:1, margin:20}}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.devices)}
                    renderRow={(rowData, sectionId, rowId) => this._renderRow(rowData)}
                    />
                <TouchableHighlight style={{padding:20, backgroundColor:'#ccc'}} onPress={() => this.toggleScanning(!this.state.scanning) }>
                    <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default ScannedDeviceComponent
