import React from 'react';

class Utility extends React.Component {
    static convertDate(dt, dType) {
        let date = new Date(dt);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        let day = date.getDate().toString();
        let weekday = '';

        month = month.length > 1 ? month : '0' + month;
        day = day.length > 1 ? day : '0' + day;

        if(dType){
            weekday = this.getDay(dt, dType);
        }
        return month + '/' + day + '/' + year + weekday ;
    };

    static getDay(dt, dType) {
        let date = new Date(dt);
        let weekdayAry=new Array(7);

        switch(dType){
            case 'full' :
                weekdayAry[0]="Monday";
                weekdayAry[1]="Tuesday";
                weekdayAry[2]="Wednesday";
                weekdayAry[3]="Thursday";
                weekdayAry[4]="Friday";
                weekdayAry[5]="Saturday";
                weekdayAry[6]="Sunday";
                break;
            case 'short' :
                weekdayAry[0]="Mon";
                weekdayAry[1]="Tue";
                weekdayAry[2]="Wed";
                weekdayAry[3]="Thu";
                weekdayAry[4]="Fri";
                weekdayAry[5]="Sat";
                weekdayAry[6]="Sun";
                break;
            default :
                break;
            }

        return weekdayAry[date.getDay()];
    };

}

export default Utility;

