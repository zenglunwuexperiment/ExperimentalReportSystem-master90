$(function () {
        $.ajax({
            type: "GET",
            url: "/exp/get_exp_status.do",
            data: {
                expId: 8
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
                expId: 8
            },
            dataType: "json",
            success: function (res) {
                if (res.status === 0) {
                    //用户未提交过此实验
                } else if (res.status === 2) {
                    location.href = "../login.html";
                } else if (res.status === 15) {
                    alert("您已提交过此实验，如有疑问请联系实验老师");
                    location.href = "../index.html";
                } else {
                    alert("服务器发生错误");
                }
            },
            error: function (res) {
                alert("向服务器请求数据失败" + res);
            }
        });
    }
);


function submitAll() {

    if (confirm("为避免数据丢失，提交前请先将实验数据截图，确认提交吗？")) {
        uploadChart("chart1", 1);
        uploadChart("chart2", 2);
        submit();
    }
}


function submit() {
    var choice = new Array();
    var table1 = new Array();
    var table2 = new Array();
    var table3 = new Array();
    var blank = new Array();
    // var chart1 = new Array();


    for (var i = 1; i <= 16; i++) {
        choice[i - 1] = $("#choice_" + i + "").val();
    }

    for (var i = 1; i <= 10; i++) {
        table1[i - 1] = $("#table1_" + i + "").val();
    }

    for (var i = 1; i <= 10; i++) {
        table2[i - 1] = $("#table2_" + i + "").val();
    }

    for (var i = 1; i <= 13; i++) {
        table3[i - 1] = $("#table3_" + i + "").val();
    }

    for (var i = 1; i <= 9; i++) {
        blank[i - 1] = $("#blank_" + i + "").val();
    }


    $.ajax({
        type: "POST",
        url: "/sub/Exp_8.do",
        data: {
            choice: choice,
            blank: blank,
            table1: table1,
            table2: table2,
            table3: table3,
            // chart1: chart1,
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
                location.href = "../index.html"
            }
        },
        error: function (result) {
            alert("服务器请求失败，请确认数据填写正确且完整后重试" + result);
        }
    });
}

/**
 * 生成数据和图像
 */

var outdataUhs = new Array();
var myRegression;


function productDataAndPicture1() {

    var table1 = new Array();
    // var table_out = new Array();

    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 10; i++) {
        table1[i - 1] = $("#table1_" + i + "").val();
    }

    /**
     * 点数据
     */
    var angle = 90;
    for (var i = 1; i <= table1.length; i++) {

        /*计算弧度作为x轴*/
        angle = 90 - (i - 1) * 10;
        var radian = angle * Math.PI / 180;    //计算出弧度
        var cos2 = Math.cos(radian) * Math.cos(radian);
        var data1 = new Array();
        data1[0] = cos2;
        data1[1] = parseFloat(table1[i - 1]);
        outdataUhs[i - 1] = data1;
    }



    var y1 = 0;
    for (var i = 0; i < 10; i++) {
        y1 = y1 + Math.abs(table1[i]) / 10;
    }

    // for (var i = 1, j = 0; i <= 5; i++) {
    //     table1[j++] = $("#table1_" + i + "").val();
    // }
    // $("#table1_11").attr("value", (Math.abs(table1[0]) + Math.abs(table1[1]) + Math.abs(table1[2]) + Math.abs(table1[3]) + Math.abs(table1[4]) + Math.abs(table1[5]) + Math.abs(table1[6]) + Math.abs(table1[7]) + Math.abs(table1[8]) + Math.abs(table1[9])) / 10.toFixed(3));
    // var y1 = $("#table1_11").val();

    /**
     * 计算R2的值
     * @param outdataUhs
     * @param myRegression
     * @returns {number}
     */
    function getR2(outdataUhs, myRegression) {

        var CanChaPingFangHe = 0.0;
        var ZongPingFangHe = 0.0;
        var r2 = 0.0;

        for (var i = 0; i < outdataUhs.length; i++) {
            /**
             * 曲线计算参数
             */
            var Y = myRegression.parameter.gradient * outdataUhs[i][0] + myRegression.parameter.intercept;
            /**
             * 实际参数
             */

            var y = outdataUhs[i][1];
            CanChaPingFangHe += (y - Y) * (y - Y);
            ZongPingFangHe += (y - y1) * (y - y1);
            r2 = 1 - CanChaPingFangHe / ZongPingFangHe;
            if (isNaN(r2)) {
                r2 = -1;
            }
        }
        return r2;
    }

    /**
     * 调用函数生成回归曲线
     */
    myRegression = ecStat.regression('linear', outdataUhs);

    /**
     *计算残差平方和
     */
    var R2 = getR2(outdataUhs, myRegression);


    /**
     * 图像自动生成
     */
    getChart(1, outdataUhs, myRegression);
    /**给图像添加id*/
    // $("canvas").attr("id", "chart1");

    /**
     * 赋值表达式和参数
     */
    $("#blank_2").attr("value", myRegression.parameter.gradient.toFixed(3));
    $("#blank_3").attr("value", myRegression.expression);
    $("#blank_4").attr("value", R2.toFixed(3));
}

function productDataAndPicture2() {

    var table2 = new Array();
    // var table_out = new Array();

    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 10; i++) {
        table2[i - 1] = $("#table2_" + i + "").val();
    }

    /**
     * 点数据
     */
    var angle = 90;
    for (var i = 1; i <= table2.length; i++) {

        /*计算弧度作为x轴*/
        angle = 90 - (i - 1) * 10;
        //假设角度为60度
        var radian = angle * Math.PI / 180;    //计算出弧度
        var cos2 = Math.cos(radian) * Math.cos(radian);
        var data1 = new Array();
        data1[0] = cos2;
        data1[1] = parseFloat(table2[i - 1]);
        outdataUhs[i - 1] = data1;
    }


    // for (var i = 1, j = 0; i <= 5; i++) {
    //     table1[j++] = $("#table1_" + i + "").val();
    // }

    var y2 = 0;
    for (var i = 0; i < 10; i++) {
        y2 = y2 + Math.abs(table2[i]) / 10;
    }
    // $("#table2_11").attr("value", y2);


    // $("#table2_11").attr("value", (Math.abs(table2[0]) + Math.abs(table2[1]) + Math.abs(table2[2]) + Math.abs(table2[3]) + Math.abs(table2[4]) + Math.abs(table2[5]) + Math.abs(table2[6]) + Math.abs(table2[7]) + Math.abs(table2[8]) + Math.abs(table2[9])) / 10.toFixed(2));
    // var y2 = $("#table2_11").val();

    /**
     * 计算R2的值
     * @param outdataUhs
     * @param myRegression
     * @returns {number}
     */
    function getR2(outdataUhs, myRegression) {

        var CanChaPingFangHe = 0.0;
        var ZongPingFangHe = 0.0;
        var r2 = 0.0;

        for (var i = 0; i < outdataUhs.length; i++) {
            /**
             * 曲线计算参数
             */
            var Y = myRegression.parameter.gradient * outdataUhs[i][0] + myRegression.parameter.intercept;
            /**
             * 实际参数
             */

            var y = outdataUhs[i][1];
            CanChaPingFangHe += (y - Y) * (y - Y);
            ZongPingFangHe += (y - y2) * (y - y2);
            r2 = 1 - CanChaPingFangHe / ZongPingFangHe;
            if (isNaN(r2)) {
                r2 = -1;
            }
        }
        return r2;
    }


    /**
     * 调用函数生成回归曲线
     */
    myRegression = ecStat.regression('linear', outdataUhs);

    /**
     *计算残差平方和
     */
    var R2 = getR2(outdataUhs, myRegression);


    /**
     * 图像自动生成
     */
    getChart(2, outdataUhs, myRegression);
    /**给图像添加id*/
    // $("canvas").attr("id", "chart1");

    /**
     * 赋值表达式和参数
     */
    $("#blank_6").attr("value", myRegression.parameter.gradient.toFixed(3));
    $("#blank_7").attr("value", myRegression.expression);
    $("#blank_8").attr("value", R2.toFixed(3));
}


function getData() {
    // var table = new Array();
    // var table_out = new Array();
    // var table_outB = new Array();

    /**
     * 获取表单数据
     */


    /**
     * 将表单数据放入输出变量中
     */

        // for (var i = 1, j = 0; i < 6  ; i+=2) {
        //     $("#table3_" + (i + 6)+"").attr("value", Math.abs(table[i+1] - table[i]));
        //     $("#table3_" + (i + 7)+"").attr("value", Math.tan(Math.abs(table[i+1] - table[i]) * Math.PI / 180));
        //
        // }

    var x1 = parseFloat($("#table3_1").val());
    var x2 = parseFloat($("#table3_2").val());
    var x3 = parseFloat($("#table3_3").val());
    var x4 = parseFloat($("#table3_4").val());
    var x5 = parseFloat($("#table3_5").val());
    var x6 = parseFloat($("#table3_6").val());
    var y1 = Math.abs(x1 - x2)>250 ? 360 - Math.abs(x1 - x2) : Math.abs(x1 - x2);
    var y2 = Math.abs(x3 - x4)>250 ? 360 - Math.abs(x3 - x4) : Math.abs(x3 - x4);
    var y3 = Math.abs(x5 - x6)>250 ? 360 - Math.abs(x5 - x6) : Math.abs(x5 - x6);
    $("#table3_7").val(y1);
    $("#table3_9").val(y2);
    $("#table3_11").val(y3);
    var t1 = Math.tan(Math.abs(y1) * Math.PI / 180);
    var t2 = Math.tan(Math.abs(y2) * Math.PI / 180);
    var t3 = Math.tan(Math.abs(y3) * Math.PI / 180);
    $("#table3_8").val(t1 .toFixed(3));
    $("#table3_10").val(t2 .toFixed(3));
    $("#table3_12").val(t3 .toFixed(3));
    var n =(Math.abs(t1) + Math.abs(t2) + Math.abs(t3))/3
    $("#blank_9").val(n .toFixed(3));

    // var y1 = Math.abs(table[0] - table[1])>300 ? 360-Math.abs(table[0] - table[1]):Math.abs(table[0] - table[1])
    // $("#table3_11").attr("value", Math.abs(y1));
    // $("#table3_12").attr("value", Math.tan(Math.abs(y1) * Math.PI / 180));
    //
    // var y2 = Math.abs(table[2] - table[3])>300 ? 360-Math.abs(table[2] - table[3]):Math.abs(table[2] - table[3])
    // $("#table3_11").attr("value", Math.abs(y2));
    // $("#table3_12").attr("value", Math.tan(Math.abs(y2) * Math.PI / 180));
    //
    // var y3 = Math.abs(table[4] - table[5])>300 ? 360-Math.abs(table[4] - table[5]):Math.abs(table[4] - table[5])
    // $("#table3_11").attr("value", Math.abs(y3));
    // $("#table3_12").attr("value", Math.tan(Math.abs(y3) * Math.PI / 180));
    //
    // $("#table3_13").attr("value", ( Math.tan(Math.abs(y1) * Math.PI / 180) +Math.tan(Math.abs(y2) * Math.PI / 180) +Math.tan(Math.abs(y3) * Math.PI / 180)) / 3 .toFixed(3));
}

/**
 * 提交图片
 * @param chart
 * @param index
 */
function uploadChart(chart, index) {
    // 获取Canvas的编码。
    var imgData = document.getElementById(chart).toDataURL("image/png");
    /** 这里-报错×******/

    // 上传到后台。
    $.ajax({
        type: "post",
        url: "/exp/upload_chart.do",
        data: {
            image: imgData.substring(22),
            expId: 8,
            index: index
        },
        async: false,
        success: function (res) {
        },
        error: function (res) {
            alert("向服务器请求数据失败" + res.msg)
        }
    })
}
