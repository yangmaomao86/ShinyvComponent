var tt=function() {
}

tt.prototype= {
    extend:function (target,source) {
        for (var p in source) {
            target[p] = source[p];
        }
        return p;
    }
}

tt = new tt();

//事件框架部分！
tt.extend(tt, {
    getId: function(id) {
        return document.getElementById(id);
    }
});

