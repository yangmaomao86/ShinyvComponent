var hsDate = (function(mom,$) {
    function StringToDate(DateStr) {

        var converted = Date.parse(DateStr);
        var myDate = new Date(converted);
        if (isNaN(myDate)) {
            //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';   
            var arys = DateStr.split('-');
            myDate = new Date(arys[0], --arys[1], arys[2]);
        }
        return myDate;
    }
    function compareDate(startDate, endDate) {
        if (startDate.length > 0 && endDate.length > 0) {
            var startDateTemp = startDate.split(" ");
            var endDateTemp = endDate.split(" ");
            var arrStartDate = startDateTemp[0].split("-");
            var arrEndDate = endDateTemp[0].split("-");
            var sDate = Date.parse(arrStartDate[0] + "-" + arrStartDate[1] + "-" + arrStartDate[2]);
            var eDate = Date.parse(arrEndDate[0] + "-" + arrEndDate[1] + "-" + arrEndDate[2]);
            //var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2]);
            //var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2]);
            var val = (sDate - eDate) / 3600 / 1000;
            if (val > 0)
                return false;
            return true;
        }
        else {
            return false;
        }
    };
    function formateDotNetDate(val) {
        if (val) {
            var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
            //月份为0-11，所以+1，月份小于10时补个0
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            return date.getFullYear() + "-" + month + "-" + currentDate;
        }
        else {
            return "";
        }
    }
    function formateDotNetDateDetail(val) {
        if (val != null) {
            var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
            //月份为0-11，所以+1，月份小于10时补个0
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            return date.getFullYear() + "-" + month + "-" + currentDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
        return "";
    };
    //获取当前时间 年月日
    function getCurrentDate() {
        var myDate = new Date();
        //获取当前年
        var year = myDate.getFullYear();
        //获取当前月
        var month = myDate.getMonth() + 1;
        //获取当前日
        var date = myDate.getDate();
        return year + '-' + p(month) + "-" + p(date);
    }
    function p(s) {
        return s < 10 ? '0' + s : s;
    }
    //将秒数转换为 1小时20分钟40秒 这样的形式
    function formatSeconds(value) {
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result;
    }
    //diffTag 如果y年，m月，w周，d天，h小时，n分钟，s秒！
    function dateDiff(dtStart,dtEnd,diffTag) {
        if (typeof dtStart == 'string')//如果是字符串转换为日期型   
        {
            dtStart = StringToDate(dtStart);
        }
        if (typeof dtEnd == 'string')//如果是字符串转换为日期型   
        {
            dtEnd = StringToDate(dtEnd);
        }
        switch (diffTag) {
            case 's': return parseInt((dtEnd - dtStart) / 1000);
            case 'n': return parseInt((dtEnd - dtStart) / 60000);
            case 'h': return parseInt((dtEnd - dtStart) / 3600000);
            case 'd': return parseInt((dtEnd - dtStart) / 86400000);
            case 'w': return parseInt((dtEnd - dtStart) / (86400000 * 7));
            case 'm': return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
            case 'y': return dtEnd.getFullYear() - dtStart.getFullYear();
        }
    }
    return {
        getCurrentDate:getCurrentDate,
        compareDate: compareDate,
        formateDotNetDate: formateDotNetDate,
        formateDotNetDateDetail: formateDotNetDateDetail,
        formatSeconds: formatSeconds,
        dateDiff: dateDiff
    }

})(moment,jQuery);