// 上传到后台。
$.ajax({
    type: "post",
    url: "/exp/upload_chart.do",
    data: {
        image: imgData.substring(22),
        expId: 12,
        index: index
    },
    async: false,
    success: function (res) {
        // alert(res.status);
    },
    error: function (res) {
        alert("向服务器请求数据失败" + res.msg)
    }

})


$.ajax({
    type: "POST",
    url: "/sub/Exp_12.do",
    data: {
        selectval: selectval,
    },
    async: false,
    dataType: "json",
    success: function (result) {
        if (result.status === 15)
            alert("请勿多次提交试验");
        else if (result.status === 10)
            alert("实验已关闭,如有疑问请联系实验老师");
        else {
            alert("提交成功");
            location.href="../index.html"
        }
    },
    error: function (result) {
        alert("向服务器请求数据失败" + result);
    }
})



/*
function submit() {
    var selectval = new Array();
    for (var i = 0; i < 10; i++){
            selectval[0] = $("#choice_0" + i + 1 + "");
    }

    $.ajax({
        type: "POST",
        url: "/sub/Exp_02.do",
        data: {
            selectval: selectval
        },
        async: false,
        dataType: "json",
        success: function (result) {
            alert(result.status)
            if (result.status === 14)
                alert("请勿多次提交试验");
            else {
                alert("提交成功");
                location.href="../index.html"
            }
        },
        error: function (result) {
            alert("向服务器请求数据失败" + result);
        }
    });
}
*/

function submitAll() {
    if (confirm("为避免数据丢失，提交前请先将实验数据截图，确认提交吗？")) {
        uploadChart("chart1", 1);
        uploadChart("chart2", 2);
        uploadChart("chart3", 3);
        uploadChart("chart4", 4);
        submit();
    }
}

$(function () {
        $.ajax({
            type: "GET",
            url: "/exp/get_exp_status.do",
            data: {
                expId: 12
            },
            dataType: "json",
            success: function (result) {
                if (result.status === 10) {
                    alert("实验已关闭，请联系实验老师");
                    location.href = "../index.html";
                }
            },
            error: function (result) {
                alert("向服务器请求数据失败" + result);
            }
        });

        $.ajax({
            type: "GET",
            url: "/score/is_stu_have_score.do",
            data: {
                expId: 12
            },
            dataType: "json",
            success: function (res) {
                if(res.status === 0){
                    //用户未提交过此实验
                } else if (res.status === 2) {
                    location.href = "../login.html";
                } else if(res.status === 15){
                    alert("您已提交过此实验，如有疑问请联系实验老师");
                    location.href = "../index.html";
                } else{
                    alert("服务器发生错误");
                }
            },
            error: function (res) {
                alert("向服务器请求数据失败" + res);
            }
        });
    }
)