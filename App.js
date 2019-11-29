import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from '@expo/vector-icons/FontAwesome';
/**
 * 
 */
import Home from './components/Home';
import Details from './components/Details';
import Location from './components/Location';

const MainNavigator = createStackNavigator({
  Location: { screen: Location },
  Details: { screen: Details }
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home, 
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="home"
                color={tintColor}
                size={24}
            />
        )
    }) },
  Location: { screen: MainNavigator, navigationOptions: () => ({
    tabBarIcon: ({tintColor}) => (
        <Icon
            name="map-marker"
            color={tintColor}
            size={24}
        />
    )
}) },
  },
);

const App = createAppContainer(TabNavigator);

export default App;
  