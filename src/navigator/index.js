import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TransitionPresets} from '@react-navigation/stack';

import * as React from 'react';

import {
  Home,
  Login,
  Signup,
  FormSignal,
  History,
  HistoryCurrency,
  RiskDisclimer,
  SingleSignal,
  TodaySignal,
  Subscription,
} from '../containers';

import {NavigationService} from '../utils';
import {DrawerComponent} from '../common';
import TradingType from '../containers/Home/TradingType';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const options = {
  ...TransitionPresets.SlideFromRightIOS,
};

function DrawerScreen() {
  return (
    <Drawer.Navigator
      drawerStyle={{width: 200}}
      drawerContent={(props) => <DrawerComponent {...props} />}
      initialRouteName="FormSignal">
      <Stack.Screen name="Home" component={Home} options={options} />
      {/* <Stack.Screen
        name="Form Signal"
        component={FormSignal}
        options={options}
      /> */}
      <Stack.Screen
        name="Risk Disclimer"
        component={RiskDisclimer}
        options={options}
      />
    </Drawer.Navigator>
  );
}

function stackScreens(initialRouteName) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="DrawerScreen"
        component={DrawerScreen}
        options={options}
      />
      <Stack.Screen name="Login" component={Login} options={options} />
      <Stack.Screen name="Signup" component={Signup} options={options} />
      <Stack.Screen
        name="Form Signal"
        component={FormSignal}
        options={options}
      />
      <Stack.Screen
        name="HistoryCurrency"
        component={HistoryCurrency}
        options={options}
      />
      <Stack.Screen
        name="SingleSignal"
        component={SingleSignal}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={options}
      />
      <Stack.Screen
        name="Risk Disclimer"
        component={RiskDisclimer}
        options={options}
      />
      
      <Stack.Screen name="History" component={History} options={options} />
      <Stack.Screen name="TradingType" component={TradingType} options={options} />
      
      <Stack.Screen
        name="Today Signal"
        component={HistoryCurrency}
        initialParams={{calledFrom : "home"}}
        options={options}
      />
    </Stack.Navigator>
  );
}

function App({initialRouteName = 'Login'}) {
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      {stackScreens(initialRouteName)}
    </NavigationContainer>
  );
}

export default App;
