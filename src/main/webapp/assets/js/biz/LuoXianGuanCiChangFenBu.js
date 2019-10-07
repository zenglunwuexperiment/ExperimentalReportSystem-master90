$(function () {
        $.ajax({
            type: "GET",
            url: "/exp/get_exp_status.do",
            data: {
                expId: 11
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
                expId: 11
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
        uploadChart("chart3", 3);
        submit();
    }
}


function submit() {
    var choice = new Array();
    var blank = new Array();
    var table = new Array();
    var table_out = new Array();
    // var chart1 = new Array();


    for (var i = 1; i <= 15; i++) {
        choice[i - 1] = $("#choice_" + i + "").val();
    }

    for (var i = 1; i <= 10; i++) {
        blank[i - 1] = $("#blank_" + i + "").val();
    }

    for (var i = 1; i <= 156; i++) {
        table[i - 1] = $("#table_" + i + "").val();
    }

    for (var i = 1; i <= 66; i++) {
        table_out[i - 1] = $("#table_out_" + i + "").val();
    }

    // /**
    //  * 获取canvas
    //  */
    // for (var i = 1; i <= $("canvas").length; i++) {
    //     chart1[i - 1] = $("#chart" + i + "").val();//$("#chart1_index" + i).val();
    // }
    $.ajax({
        type: "POST",
        url: "/sub/Exp_11.do",
        data: {
            choice: choice,
            blank: blank,
            table: table,
            table_out: table_out
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

    var table = new Array();
    var table_out = new Array();

    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 24; i++) {
        table[i - 1] = $("#table_" + i + "").val();
    }

    /**
     * 将表单数据放入输出变量中
     */
    var tableOutData = 0;
    var j = 0;
    for (var i = 0; i < table.length; i++) {
        tableOutData += Math.abs(table[i]);
        if (((i + 1) % 4 === 0)) {
            table_out[j++] = tableOutData / 4;
            tableOutData = 0;
        }
    }

    /**
     * 输出表单变量值
     */
    for (var i = 1; i <= table_out.length; i++) {
        var tableOutId = "#table_out_" + i + "";
        $(tableOutId).attr("value", table_out[i - 1]);
    }

    /**
     * 点数据
     */

    for (var i = 1; i <= table_out.length; i++) {
        var tableOutId = "#table_out_" + i;
        var data1 = new Array();
        data1[0] = i;
        data1[1] = parseFloat($(tableOutId).val());
        outdataUhs[i - 1] = data1;
    }



    var y1 = 0;
    for (var i = 0; i < 6; i++) {
        y1 = y1 + Math.abs(table_out[i]) / 6;
    }


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
    $("#blank_1").attr("value", myRegression.expression);
    $("#blank_2").attr("value", R2.toFixed(3));
}


function productDataAndPicture2() {
    var table = new Array();
    var table_out = new Array();

    /**
     * 获取表单数据
     */
    for (var i = 25; i <= 48; i++) {
        table[i - 25] = $("#table_" + i + "").val();
    }

    /**
     * 将表单数据放入输出变量中
     */
    var tableOutData = 0;
    var j = 0;
    for (var i = 0; i < table.length; i++) {
        tableOutData += Math.abs(table[i]);
        if (((i + 1) % 4 === 0)) {
            table_out[j++] = tableOutData / 4;
            tableOutData = 0;
        }
    }
    /**
     * 输出表单变量值
     */
    for (var i = 1; i <= table_out.length; i++) {
        var tableOutId = "#table_out_" + (i + 6) + "";
        $(tableOutId).attr("value", table_out[i - 1]);
    }

    /**
     * 点数据
     */

    for (var i = 1; i <= table_out.length; i++) {
        var tableOutId = "#table_out_" + (i + 6) + "";
        var data1 = new Array();
        data1[0] = i;
        data1[1] = parseFloat($(tableOutId).val());
        outdataUhs[i - 1] = data1;
    }



    var y2 = 0;
    for (var i = 0; i < 6; i++) {
        y2 = y2 + Math.abs(table_out[i]) / 6;
    }


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
    $("#blank_3").attr("value", myRegression.expression);
    $("#blank_4").attr("value", R2.toFixed(3));
}

function productDataAndPicture3() {
    var table = new Array();
    var table_out = new Array();
    // var table_outB = new Array();

    /**
     * 获取表单数据
     */
    for (var i = 49, j = 0; i <= 156; i++) {
        table[j++] = $("#table_" + i + "").val();
    }

    /**
     * 将表单数据放入输出变量中
     */
    var tableOutData = 0;
    var j = 0;

    var K = $("#blank_5").val();

    for (var i = 0; i < table.length; i++) {
        tableOutData += Math.abs(table[i]);
        if (((i + 1) % 4 === 0)) {
            table_out[j++] = tableOutData / 4;
            /**
             * 计算B
             */
            table_out[j++] = (tableOutData / 4) / (K * 3);
            tableOutData = 0;
        }
    }
    /**
     * 输出表单变量值
     */
    for (var i = 1; i <= table_out.length; i++) {
        var tableOutId = "#table_out_" + (i + 12) + "";
        if (i % 2 === 0) {
            $(tableOutId).attr("value", 1000*Math.round(table_out[i - 1] * 100000) / 100000);
        } else {
            $(tableOutId).attr("value", Math.round(table_out[i - 1] * 100000) / 100000);
        }
    }
    /**
     * 点数据
     */

    for (var i = 1, j = 0; i <= 54; i++) {
        if (i % 2 === 0) {
            var tableOutId = "#table_out_" + (i + 12) + "";
            outdataUhs[j++] = parseFloat($(tableOutId).val());
            if (isNaN(outdataUhs[j])) {
                outdataUhs[j] = 0;
            }
            outdataUhs[j] = 1000 * Math.round(outdataUhs[j] * 100000) / 100000;
        }
    }



    var x11 = parseFloat($("#table_89").val());
    var x12 = parseFloat($("#table_90").val());
    var x13 = parseFloat($("#table_91").val());
    var x14 = parseFloat($("#table_92").val());
    var x15 = parseFloat($("#table_93").val());
    var x16 = parseFloat($("#table_94").val());
    var x17 = parseFloat($("#table_95").val());
    var x18 = parseFloat($("#table_96").val());
    var x19 = parseFloat($("#table_97").val());
    var x20 = parseFloat($("#table_98").val());
    var x21 = parseFloat($("#table_99").val());
    var x22 = parseFloat($("#table_100").val());
    var x23 = parseFloat($("#table_101").val());
    var x24 = parseFloat($("#table_102").val());
    var x25 = parseFloat($("#table_103").val());
    var x26 = parseFloat($("#table_104").val());
    var x27 = parseFloat($("#table_105").val());
    var x28 = parseFloat($("#table_106").val());
    var x29 = parseFloat($("#table_107").val());
    var x30 = parseFloat($("#table_108").val());
    var x31 = parseFloat($("#table_109").val());
    var x32 = parseFloat($("#table_110").val());
    var x33 = parseFloat($("#table_111").val());
    var x34 = parseFloat($("#table_112").val());
    var x35 = parseFloat($("#table_113").val());
    var x36 = parseFloat($("#table_114").val());
    var x37 = parseFloat($("#table_115").val());
    var x38 = parseFloat($("#table_116").val());
    var x1 =  (Math.abs(x11) + Math.abs(x12) + Math.abs(x13) + Math.abs(x14))/4;
    var x2 =  (Math.abs(x15) + Math.abs(x16) + Math.abs(x17) + Math.abs(x18))/4;
    var x3 =  (Math.abs(x19) + Math.abs(x20) + Math.abs(x21) + Math.abs(x22))/4;
    var x4 =  (Math.abs(x23) + Math.abs(x24) + Math.abs(x25) + Math.abs(x26))/4;
    var x5 =  (Math.abs(x27) + Math.abs(x28) + Math.abs(x29) + Math.abs(x30))/4;
    var x6 =  (Math.abs(x31) + Math.abs(x32) + Math.abs(x33) + Math.abs(x34))/4;
    var x7 =  (Math.abs(x35) + Math.abs(x36) + Math.abs(x37) + Math.abs(x38))/4;

    var N =  parseFloat($("#blank_6").val());
    var L =  parseFloat($("#blank_72").val());
    var IM = parseFloat($("#blank_8").val());
    var IS = parseFloat($("#blank_9").val());
    var B1 = (Math.abs(x1) + Math.abs(x2) + Math.abs(x3) + Math.abs(x4) + Math.abs(x5) + Math.abs(x6) + Math.abs(x7))/7/K/IS;
var B0 = 4 * 3.14159 / 10000000 * IM * N / L *100;
var BB =Math.abs(B1 - B0) / B0 * 100;
$("#blank_10").val(BB.toFixed(2));
    getChart(3, outdataUhs);
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
            expId: 11,
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
