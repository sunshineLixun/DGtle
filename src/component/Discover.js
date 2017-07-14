import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import { TabNavigator,StackNavigator } from 'react-navigation';
import TabBarItem from './Components/TabBarItem';

export default class Discover extends Component{
    static navigationOptions = ({navigation}) => ({
        tabBarLabel: '发现',
        tabBarIcon:({tintColor,focused}) => (
            <TabBarItem  
              tintColor={tintColor}  
              focused={focused}  
              normalImage={require('./../images/discovery_25x25_@2x.png')}  
              selectedImage={require('./../images/discovery_l_25x25_@2x.png')}  
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