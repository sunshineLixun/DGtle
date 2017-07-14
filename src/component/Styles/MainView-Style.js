import React, { Component } from 'react';
import { StyleSheet,Dimensions } from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#EDEDF0',
        height: 65,
        width: width,
    },
    headerView:{
        marginTop: 0,
        marginLeft: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        width: width,
        height: 65,
    },
    lineView:{
        width: width,
        height: 1,
        bottom: 0,
        position:'absolute',
        backgroundColor: '#D9D9DF'
    },
    leftImage:{
        top: 27,
        right:10,
        position:'absolute',
    },
    cellStyle:{
        flex:1,
        height:280,
    },
    cellContentStyle:{
        borderColor:"#D9D9DF",
        borderTopWidth:1,
        borderBottomWidth: 1,
        backgroundColor:'white',
        top:10,
        bottom:10,
        position:'absolute',
        width:width,
    },
    cellTopViewStyle:{
        flex:1,
        flexDirection:'row',
        width:width,
        alignItems: 'center',
    },
    cellCenterViewStyle:{
        flex:3,
        width:width,
    },
    cellBottomViewStyle:{
        flex:1,
        width:width,
    },
    headerImage:{
        borderRadius: 20,
        width:40,
        height:40,
        marginLeft:8
    },
    titleStyle:{
        fontSize: 14,
        color:'black',
        marginLeft: 8,
    },
    timeStyle:{
        fontSize:15,
        color:'#778899',
        right:8,
        position:'absolute'
    },
    contentImage:{
        width:width,
        height:100,
    },
    contentTextStyle:{
        fontSize:13,
        color:'#d3d3d3',
        marginTop:8,
        marginLeft:8
    },
    image: {
        width:width,
        height:140
    },
});