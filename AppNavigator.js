// import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './src/screens/Home';
import Detail from './src/screens/Detail';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(AppNavigator);
