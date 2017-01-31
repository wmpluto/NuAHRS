import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import TabIcon from './app/components/TabIcon';
import ScannedDeviceComponent from './app/components/ScannedDeviceComponent';
import SettingComponent from './app/components/SettingComponent';
import ShowAttitudeComponent from './app/components/ShowAttitudeComponent';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});


export default class NaviRouter extends Component {
  render() {
    return (
      <Router>
         <Scene key="root">
           <Scene key="scannedDevice" component={ScannedDeviceComponent}
              inital={true}
              title="Scanning Device"  />
            <Scene key="tabBar" tabs={true} hideNavBar={true} tabBarStyle={styles.tabBarStyle}>
             <Scene key="attitudeTab" title="Attitude" icon={TabIcon}>
               <Scene key="attitudeView" title="NuAHRS" hideBackImage component={ShowAttitudeComponent}/>
             </Scene>
             <Scene key="settingTab" title="Setting" icon={TabIcon}>
               <Scene key="settingView" title="NuAHRS" hideBackImage component={SettingComponent}/>
             </Scene>
           </Scene>
         </Scene>
       </Router>
     )
  }
}
