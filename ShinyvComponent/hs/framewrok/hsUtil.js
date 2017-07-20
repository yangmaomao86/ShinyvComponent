var hsUtil = (function ($) {

    function getParamOfUrl(name, url) {
        var urlinfo = url;
        var len = urlinfo.length;//获取url的长度
        var offset = urlinfo.indexOf("?");//设置参数字符串开始的位置
        var newsidinfo = urlinfo.substr(offset + 1, len);//取出参数字符串 这里会获得类似“id=1”这样的字符串
        var arr = newsidinfo.split("&");//对获得的参数字符串按照“=”进行分割
        for (var i = 0; i < arr.length; i++) {
            var childArr = arr[i].split("=");
            if (childArr[0] === name) {
                return childArr[1];
            }
        }
        return "";
    }
    function getParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    function getSexName(val) {
        if (val === 1) {
            return "男";
        } else if (val === 0) {
            return "女";
        } else {
            return "未知";
        }
    };
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    //找到一个div下面的所有选中的checkbox,然后把它们的值以字符串的形式拼接返回！
    function findAllCheckedBox(divId) {
        var str = "";
        var tempArr = [];
        $("#" + divId).find("input[type=checkbox]:checked").each(function (index, elem) {
            tempArr.push($(elem).val());
        });
        if (tempArr.length > 0)
            str = tempArr.toString();
        else {
            str = "";
        }
        return str;
    }
    function bubbleSort(arrSort) {
        var temp;
        for (var i = 0; i < arrSort.length; i++) {
            for (var j = i + 1; j < arrSort.length; j++) {
                if (arrSort[j] > arrSort[i]) {
                    temp = arrSort[j];
                    arrSort[j] = arrSort[i];
                    arrSort[i] = temp;
                }
            }
        }
    }
    //对于一些常用的数据进行展示的时候，总是需要对数据进行处理，比如判断是否为null undefined 等等
    //这些情况，displayString就是当前面没有值的时候，第二个参数填写一个默认值用来展示默认值
    function getFormatedData(original, displayString) {
        if (original === null || original === undefined) {
            if (displayString != undefined && displayString != null) {
                return displayString;
            }
            else {
                return "";
            }
        }
        else {
            return original;
        }
    }
    function splitToArray(str, separeter) {
        var sep = separeter || ",";
        if (str !== null && str !== undefined && str !== "" && str.length > 0) {
            return str.split(sep);
        }
        return [];
    }
    //获取当前时间的时间戳，毫秒级
    function getTimestamp() {
        return new Date().getTime();
    }
    //计算字符串长度，中文算两个字符，英文字母和数字以及符号算一个字符！
    function calStrLength(str) {
        if (str) {
            //一个中文占两个长度，一个英文和数字占一个长度！
            var count = 0;
            for (var i = 0; i < str.length; i++) {
                var reg = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/;
                if (reg.test(str[i])) {
                    //如果是中文，算两个长度
                    count += 2;
                } else {
                    count += 1;
                }
            }
            return count;
        } else
            return 0;
    }
    function splitStrToArray(str, delimiter) {
        if (str) {
            str = trim(str);
            var sep = delimiter || ",";
            if (str.indexOf(sep) > -1) {
                var temp = str.split(sep);
                return temp;
            } else {
                return [str];
            }
        } else {
            return [];
        }
    }
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    function ltrim(str) {
        return str.replace(/(^\s*)/g, "");
    }
    function rtrim(str) {
        return str.replace(/(\s*$)/g, "");
    }
    function jsonP(url) {
        $.ajax({
            async: false,
            url: url,
            type: "GET",
            dataType: 'jsonp',
            callback: "callback",
            jsonpCallback: 'handleData',
            data: { telephoneCode: "13551235992 ", beginDate: "2017-01-01", endDate: "2017-04-26", timeTemp: new Date().getTime() },
            timeout: 5000,
            beforeSend: function () {
                //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
            },
            success: function (json) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                console.log(json);
                /*
                1：来访
                2：预约
                3：认购
                4：签约
                */
                if (json.status === "1") {
                    //1:成功
                    var arr = json.data;
                    for (var i = 0; i < arr.length; i++) {

                    }
                }
                else if (json.status === "2") {
                    //2:无对应数据
                }
                else if (json.status === "3") {
                    //3:电话号码不正确
                }
            },
            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function (xhr) {
                //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
                //请求出错处理
                alert("请求出错(请检查相关度网络状况.)");
            }
        });
    }
    function cacl(arr, callback) {
        var ret;
        for (var i = 0; i < arr.length; i++) {
            ret = callback(arr[i], ret);
        }
        return ret;
    }
    function sum() {
        return cacl(this, function (item, sum) {
            if (typeof (sum) == 'undefined') {
                return item;
            }
            else {
                return sum += item;
            }
        });
    };
    function avg() {
        if (this.length == 0) {
            return 0;
        }
        return this.sum(this) / this.length;
    };
    return {
        getParam: getParam,
        getParamOfUrl: getParamOfUrl,
        getSexName: getSexName,
        getCookie: getCookie,
        bubbleSort: bubbleSort,
        getTimestamp: getTimestamp,
        getFormatedData: getFormatedData,
        splitToArray: splitToArray,
        findAllCheckedBox: findAllCheckedBox,
        calStrLength: calStrLength,
        splitStrToArray: splitStrToArray,
        sum: sum,
        avg:avg
    }

})(jQuery);