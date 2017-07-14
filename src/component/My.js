import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import { TabNavigator,StackNavigator } from 'react-navigation';
import TabBarItem from './TabBarItem/TabBarItem'

export default class My extends Component{
    static navigationOptions = ({navigation}) => ({
        tabBarLabel: '我的',
        tabBarIcon:({tintColor,focused}) => (
            <TabBarItem  
              tintColor={tintColor}  
              focused={focused}  
              normalImage={require('./../images/tab_zone_25x25_@2x.png')}  
              selectedImage={require('./../images/tab_zone_act_25x25_@2x.png')}  
            />
        ),
    })

    render(){
        return(
            <View style={styles.container}>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});