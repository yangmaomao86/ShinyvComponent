var show = console.log;
var $$ = {
    //将一个对象的所有属性拷贝给一个对象！
    extend:function(target, source) {
        for (var p in source) {
            target[p] = source[p];
        }
        return target;
    },
    random:function() {
        return Math.random() * 10;
    },
    getName:function() {
        return "santos";
    }

};

//单独某个模块功能的地方！
$$.extend($$, {
    getId:function(id) {
        return document.getElementById(id);
    }
});

//如果是使用的prototype来做原型链，这里必须初始化对象！
//$$.prototype= {
//    p1:function() {
//        return "prototype method p1";
//    }
//};