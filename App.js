import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Favorite from './apps/favorite'
import Weekly from "./apps/weekly";
import Today from "./apps/today";
import Search from "./apps/search";

YellowBox.ignoreWarnings([
    'Require cycle:',
]);

const TabNavigator = createStackNavigator({
        Favorite: Favorite,
        Week: Weekly,
        Today: Today,
        Search: Search,

    }, {
        headerMode: 'none',
    }
);

export default createAppContainer(TabNavigator);
