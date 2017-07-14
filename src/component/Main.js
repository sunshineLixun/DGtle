import React, { Component } from 'react';
import { View,StyleSheet,Image,Dimensions,ListView,Text } from 'react-native';
import { TabNavigator,StackNavigator } from 'react-navigation';
import TabBarItem from './TabBarItem/TabBarItem'
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');
const REQUEST_IMAGHE_URL = 'http://api.dgtle.com/api.php?actions=diydata&apikeys=DGTLECOM_APITEST1&bid=274&charset=UTF8&dataform=json&inapi=json&modules=portal&platform=ios&swh=480x800&timestamp=1499849221&token=7721d598d84399832ca1cb5db1a29996&version=3.3.0'
const REQUEST_CONTENT_URL = 'https://api.dgtle.com/api.php?swh=480x800&version=3.3.0&actions=index&timestamp=1499914690&apikeys=DGTLECOM_APITEST1&modules=portal&token=d7512b1c305d0d897292addc55806bbb&order=dateline_desc&charset=UTF8&platform=ios&limit=0_20&inapi=json&dataform=json'

export default class Main extends Component{

    constructor(props) {
    super(props);
    this.state={
            ds: new ListView.DataSource({rowHasChanged:(r1 , r2) => r1 !== r2}),
            cycleViews: new Array()
        };
    }

    componentDidMount() {
        fetch(REQUEST_IMAGHE_URL)
        .then((response) => response.json())
        .then((jsonData) => {
            const obj = jsonData.returnData.blocklist['274'];
            var array = new Array()
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var element = obj[key];
                    array.push(element);
                }
            }
            this.setState({
               cycleViews: this.state.cycleViews = array,
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
        //id 从大到小排序
        sortable.sort(($0,$1) => {
            return $1.aid - $0.aid
        })
        this.setState({
            ds: this.state.ds.cloneWithRows(sortable)
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
                <ListView dataSource={this.state.ds}
                          renderRow={this._renderRow.bind(this)}
                          renderHeader={this._renderHeader.bind(this)}/>
            </View>
        )
    }
    _renderRow(rowData, sectionID, rowID, highlightRow){
        return(
            <View style={styles.cellStyle}>
                <View style={styles.cellContentStyle}>
                    {/* ///上层View */}
                    <View style={styles.cellTopViewStyle}>
                         <Image source={{uri: rowData.pic_url}} style={styles.headerImage}/>
                         <Text style={styles.titleStyle}>{rowData.author}</Text>
                         <Text style={styles.timeStyle}>{this._getLocalTime(rowData.dateline)}</Text>
                    </View>
                    {/* ///中层View */}
                    <View style={styles.cellCenterViewStyle}> 
                        <Image source={{uri: rowData.pic_url}} style={styles.contentImage}/>
                        <Text style={{fontSize:15,color:'black',marginTop:8,marginLeft:8}}>{rowData.title}</Text>
                        <Text style={styles.contentTextStyle} numberOfLines={2}>{rowData.summary}</Text>
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
                this.state.cycleViews.map((item, i) => 
                <View key={i} style={{flex:1,width,alignItems: 'center',backgroundColor: 'white',}}>
                    <Image key={i} style={styles.image} source={{uri: item.pic_url}} />
                    <Text style={{bottom:2,position:'absolute',fontSize:13,textAlign:'center'}}>{item.title}</Text>
                </View>
                )
            }
            </Swiper>
        )
    }

    /**
     * 
     * 比较时间差
     * @param {any} targetTime 毫秒值
     * @memberof Main
     */
    _getLocalTime(targetTime) {     
        //当前时间的毫秒值
        var nowDate = new Date().valueOf().toString().substr(0,10).valueOf();
        var date3 = nowDate - targetTime;
        //天
        var days=Math.floor(date3/(24*3600*1000))
        //时
        var leave1=date3%(24*3600*1000)
        var hours=Math.floor(leave1/(3600*1000))
        //分
        var leave2=leave1%(3600*1000)
        var minutes=Math.floor(leave2/(60*1000))
        //秒
        var leave3=leave2%(60*1000)
        var seconds=Math.round(leave3/1000)
        if (days>0) {
            return days+'天前'
        }
        if (days==0&&hours>0) {
            return hours+'小时前'
        }
        if(days==0&&hours==0&&minutes>0){
            return minutes+'分钟前'
        }
        if(days==0&&hours==0&&minutes==0&&seconds>0){
            return '刚刚'
        }
    }
}

const styles = StyleSheet.create({
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