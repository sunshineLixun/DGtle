
import React, { Component } from 'react';
import { TabNavigator,StackNavigator } from 'react-navigation';
import Main from './Main'
import Group from './Group'
import Discover from './Discover'
import My from './My'

const TabNav = TabNavigator(
    {
        Main: {screen: Main},
        Group: {screen: Group},
        Discover: {screen: Discover},
        My: {screen: My}
    },
    {
        lazy:true,
        tabBarOptions:{
            activeTintColor:'#206DFF',
            inactiveTintColor:'#8D8D8D'
        }
    }
);

const StackNav = StackNavigator(
    {
        TabNav: {screen: TabNav},
    },
    {
        initialRouteName: 'TabNav',
        mode:'card',
        headerMode:'screen',
    }
)

export default class Tab extends Component{
    render(){
        return <StackNav />
    };
}
