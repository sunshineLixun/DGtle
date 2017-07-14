import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

class EmptyView extends Component {
    render() {
        return (
            <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}}> 
                <ActivityIndicator 
                size="large" 
                color='red'
                />
            </View>
        );
    }
}

export default EmptyView;