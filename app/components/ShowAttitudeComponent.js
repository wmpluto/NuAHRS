import React, { Component, PropTypes } from 'react';
import { View, Text, NativeAppEventEmitter} from 'react-native';
import BleManager from 'react-native-ble-manager';

class ShowAttitudeComponent extends Component {
  constructor(props){
    super(props);

    this.state = {
      bleStatus: "...",
      writeCharacteristic: "FF01",
      readCharacteristic: "FF02",
      peripheralId: this.props.device.id,
      serviceUUID: "FF00"
    }
  }

  componentDidMount() {
    BleManager.stopScan();
    NativeAppEventEmitter
        .addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateCharacteristic );
    this._bleConnect(this.props.device.id);
    //Send @hk 
    BleManager.write(this.state.peripheralId, this.state.serviceUUID, this.state.writeCharacteristic, "QGgwMA==", 20);
  }

  handleUpdateCharacteristic(data) {
    console.log(data.value);
  }

  _bleConnect(id) {
    BleManager.connect(id)
      .then((peripheralInfo) => {
        // Success code
        console.log('Connected');
        console.log(peripheralInfo);
        // check service
        for (service of peripheralInfo.services) {
          if (service == "FF00") {
            //check readCharacteristic & writeCharacteristic
            var chs = peripheralInfo.characteristics.map(function (item,index,input) {
              return item.characteristic;
            })
            var flag = 0;
            for (ch of chs){
              if (this.state.readCharacteristic == ch) {
                BleManager.startNotification(this.state.peripheralId, this.state.serviceUUID, this.state.readCharacteristic);
                flag += 1;
              }
              if (this.state.writeCharacteristic == ch) {
                flag += 1;
              }
            }
            if (flag > 1) {
              this.setState({bleStatus:'Connected to ' + peripheralInfo.name});
            } else {
              this.setState({bleStatus:'Something Wrong'});
            }

            return;
          }
        }

      })
      .catch((error) => {
        // Failure code
        console.log(error);
        this.setState({bleStatus:error});
      });
  }


  render() {
    const container = {
      backgroundColor: 'white',
      padding: 20,
      paddingTop: 70,
      flex: 1,
    }

    return (
      <View style={container}>
        <Text>Device Status: {this.state.bleStatus}</Text>
      </View>
    )
  }
}

 export default ShowAttitudeComponent
