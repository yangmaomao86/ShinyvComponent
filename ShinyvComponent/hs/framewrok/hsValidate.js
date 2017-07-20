var hsValidate = (function($) {

    function isMobile(n) {
        return /^1\d{10}$/.test($.trim(n));
    }
    function isHasValue(val) {
        if (val === null || val == undefined || $.trim(val) === "")
            return false;
        else
            return true;
    };
    function isEmail(mail) {
        mail = $.trim(mail);
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(mail))
            return true;
        else {
            // alert('您的电子邮件格式不正确');
            return false;
        }
    }
    /**
* 判断是否是数字
* @param value    18，18.55都会被认为是number类型！ 即使是 "18.5"这样的字符串类型也可以被判断为是数值类型
* @returns {Boolean}
*/
    function isNum(value) {
        var type = typeof (value);
        if (type === "string") {
            value = Number(value);
        }
        if (value != null && typeof (value) === "number" && isNaN(value) === false) {
            return true;
        }
        else {
            return false;
        }
    }
    function isZhenZhengShu(val) {
        var re = /^[1-9]+[0-9]*]*$/;
        if (!re.test(val)) {
            return false;
        }
        return true;
    }
    /**
* 判断是否是中文
* @param str
* @returns {Boolean}
*/
    function isChinese(str) {
        var reg = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/;
        if (reg.test(str)) {
            return true;
        }
        return false;
    }

    function isUrl(url) {
        var str = url;
        //判断url地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
        //下面的代码中应用了转义字符"\"输出一个字符"/"
        var expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        var objExp = new RegExp(expression);
        if (objExp.test(str) === true) {
            return true;
        } else {
            return false;
        }
    }

    return {
        isEmail: isEmail,
        isMobile: isMobile,
        isNum: isNum,
        isZhenZhengShu:isZhenZhengShu,
        isChinese:isChinese,
        isHasValue: isHasValue,
        isUrl:isUrl
    }
})(jQuery);