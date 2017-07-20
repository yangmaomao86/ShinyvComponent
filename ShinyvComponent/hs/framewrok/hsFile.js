var hsFile = (function ($) {

    var uploadFile = function (fileId,url,dataObj, maxFileSize, msgFunc) {

        var maxSize = maxFileSize || 500;
        var msgFunc = msgFunc || mymsg;
        var uploadObj = dataObj || {};

        $("#" + fileId).on("change", function () {
            //console.log($("#picUpload")[0].files[0]);

            var size = $("#" + fileId)[0].files[0].size;
            if (size > (maxSize * 1024)) {
                msgFunc("您上传的图片不能大于500kb！");
                return false;
            }

            //创建FormData对象
            var data = new FormData();
            //为FormData对象添加数据
            data.append("files", $("#" + fileId)[0].files[0]);

            for (var prop in uploadObj) {
                data.append(prop, uploadObj[prop]);
            }
            //return;
            //发送数据
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                cache: false,
                contentType: false,	//不可缺参数
                processData: false,		//不可缺参数
                success: function (data) {
                    //data = $(data).html();
                    //console.log(data);

                    msgFunc("上传成功！");
                    //$("#loading").hide();
                    //清空 input type=file的内容
                    $("#" + fileId).val("");

                },
                error: function (err) {
                    //console.log(err);

                    msgFunc('上传出错,或文件格式不对！');
                    //$("#loading").hide();
                }
            });
        });
    }

    return {
        uploadFile: uploadFile
    }

})(jQuery);