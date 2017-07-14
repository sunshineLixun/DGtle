import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';

//自定义组件
 export default class TabBarItem extends Component{
    render(){
        return(
            <Image source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
             style={[{tintColor:this.props.tintColor},styles.icon]}/>
        )
    }
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});