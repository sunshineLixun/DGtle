import React, { Component } from 'react';
import { View,Image,Text } from 'react-native';
import styles from './../Styles/MainView-Style';
import DateTool from './../Date/DateTool'

export default class CellItem extends Component {
    render() {
        const {item} = this.props;
        return (
            <View style={styles.cellStyle}>
                <View style={styles.cellContentStyle}>
                    {/* ///上层View */}
                    <View style={styles.cellTopViewStyle}>
                         <Image source={{uri: item.pic_url}} style={styles.headerImage}/>
                         <Text style={styles.titleStyle}>{item.author}</Text>
                         <Text style={styles.timeStyle}>{DateTool.getLocalTime(item.dateline)}</Text>
                    </View>
                    {/* ///中层View */}
                    <View style={styles.cellCenterViewStyle}> 
                        <Image source={{uri: item.pic_url}} style={styles.contentImage}/>
                        <Text style={{fontSize:15,color:'black',marginTop:8,marginLeft:8}}>{item.title}</Text>
                        <Text style={styles.contentTextStyle} numberOfLines={2}>{item.summary}</Text>
                    </View>
                    {/* ///下层View */}
                    <View style={styles.cellBottomViewStyle}> 

                    </View>
                </View>
            </View>
        );
    }
}