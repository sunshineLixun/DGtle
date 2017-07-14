import React, { Component } from 'react';
import {  } from 'react-native';

export default class DateTool{
     /**
     * 
     * 比较时间差
     * @param {any} targetTime 毫秒值
     * @memberof Main
     */
    static getLocalTime(targetTime) {
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