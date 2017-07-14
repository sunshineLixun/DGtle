import React, { Component } from 'react';
import { View,StyleSheet,Image,Text,Dimensions,FlatList } from 'react-native';
import { TabNavigator,StackNavigator } from 'react-navigation';
import TabBarItem from './TabBarItem/TabBarItem'
import Swiper from 'react-native-swiper';
import styles from './Styles/MainView-Style'
import DateTool from './Date/DateTool'

const {width} = Dimensions.get('window');

const REQUEST_IMAGHE_URL = 'http://api.dgtle.com/api.php?actions=diydata&apikeys=DGTLECOM_APITEST1&bid=274&charset=UTF8&dataform=json&inapi=json&modules=portal&platform=ios&swh=480x800&timestamp=1499849221&token=7721d598d84399832ca1cb5db1a29996&version=3.3.0'
const REQUEST_CONTENT_URL = 'https://api.dgtle.com/api.php?swh=480x800&version=3.3.0&actions=index&timestamp=1499914690&apikeys=DGTLECOM_APITEST1&modules=portal&token=d7512b1c305d0d897292addc55806bbb&order=dateline_desc&charset=UTF8&platform=ios&limit=0_20&inapi=json&dataform=json'

export default class Main extends React.PureComponent{

    constructor(props) {
         super(props);
        this.state = {
            ds:[],
            cycleViews: new Array()
        };
    }

    componentDidMount() {
        fetch(REQUEST_IMAGHE_URL)
        .then((response) => response.json())
        .then((jsonData) => {
            const obj = jsonData.returnData.blocklist['274'];
            let array = new Array()
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var element = obj[key];
                    array.push(element);
                }
            }
            this.setState({
               cycleViews: array
            })
        })
        .catch((error) => {
            alert('失败')
        })

        this._requestContent()
    }

    _requestContent(){
        const jsonData = require('./../source/api.json')
        const object = jsonData.returnData.articlelist
        var sortable = [];
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                var element = object[key];
                sortable.push(element)
            }
        }
        // //id 从大到小排序
        // sortable.sort(($0,$1) => {
        //     return $1.aid - $0.aid
        // })

        this.setState({
            ds: sortable.reverse(),
        })
    }

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: '首页',
        header:(
           <View style={styles.header}>
               <View style={styles.headerView}>
                    <Image source={require('./../images/nav_logo_89x30_@2x.png')} style={{marginTop: 22}}/>
                    <Image source={require('./../images/tab_inbox_24x24_@2x.png')} style={styles.leftImage}/>
               </View>
              <View style={styles.lineView}/>
           </View>
        ),
        tabBarIcon:({tintColor,focused}) => (
            <TabBarItem 
              tintColor={tintColor}  
              focused={focused}  
              normalImage={require('./../images/tab_home_25x25_@2x.png')}  
              selectedImage={require('./../images/tab_home_act_25x25_@2x.png')}  
            />
        ),
    })

    render(){
        return(
            <View style={styles.container}>
                <FlatList data={this.state.ds}
                ListHeaderComponent={this._renderHeader.bind(this)}
                renderItem={this._renderRow}
                keyExtractor={(itme) => itme.aid}/>
            </View>
        )
    }
    _renderRow = ({item}) => {
        return(
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
        )
    }


    _renderHeader(){
        return(
            <Swiper height={160} 
                    showsButtons={false} 
                    loop={true} 
                    autoplay={true} 
                    dotColor='#EDEDF0' 
                    activeDotColor='white'
                    paginationStyle={{bottom:25,position:'absolute'}}>
            {
                this.state.cycleViews.map((item,index) => 
                <View key={index} style={{flex:1,width,alignItems: 'center',backgroundColor: 'white',}}>
                    <Image style={styles.image} source={{uri: item.pic_url}} />
                    <Text style={{bottom:2,position:'absolute',fontSize:13,textAlign:'center'}}>{item.title}</Text>
                </View>
                )
            }
            </Swiper>
        )
    }
}
