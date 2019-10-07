        $(function () {
        $.ajax({
            type: "GET",
            url: "/exp/get_exp_status.do",
            data: {
                expId: 10
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
                expId: 10
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
    var table4 = new Array();
    var table5 = new Array();
    var table6 = new Array();
    var table7 = new Array();
    var table8 = new Array();
    var blank = new Array();
    // var chart1 = new Array();

    for (var i = 1; i <= 12; i++) {
        choice[i - 1] = $("#choice_" + i).val();
    }

    for (var i = 1; i <= 6; i++) {
        table1[i - 1] = $("#table1_" + i + "").val();
    }

    for (var i = 1; i <= 6; i++) {
        table2[i - 1] = $("#table2_" + i + "").val();
    }

    for (var i = 1; i <= 2; i++) {
        table3[i - 1] = $("#table3_" + i + "").val();
    }

    for (var i = 1; i <= 10; i++) {
        table4[i - 1] = $("#table4_" + i + "").val();
    }

    for (var i = 1; i <= 6; i++) {
        table5[i - 1] = $("#table5_" + i + "").val();
    }

    for (var i = 1; i <= 6; i++) {
        table6[i - 1] = $("#table6_" + i + "").val();
    }

    for (var i = 1; i <= 2; i++) {
        table7[i - 1] = $("#table7_" + i + "").val();
    }

    for (var i = 1; i <= 10; i++) {
        table8[i - 1] = $("#table8_" + i + "").val();
    }

    for (var i = 1; i <= 16; i++) {
        blank[i - 1] = $("#blank_" + i + "").val();
    }

    // result[0] = parseFloat($("#result1").val());
    // result[1] = parseFloat($("#result2").val());
    // result[2] = parseFloat($("#result3").val());
    // result[3] = parseFloat($("#result4").val());
    // result[4] = parseFloat($("#result5").val());
    // result[5] = parseFloat($("#result6").val());
    // result[6] = parseFloat($("#result7").val());
    // result[7] = parseFloat($("#result8").val());
    // result[8] = parseFloat($("#result9").val());
    // result[9] = parseFloat($("#result10").val());
    // result[10] = parseFloat($("#result11").val());
    // result[11] = parseFloat($("#result12").val());
    // result[12] = parseFloat($("#result13").val());
    // result[13] = parseFloat($("#result14").val());
    // result[14] = parseFloat($("#result15").val());
    // result[15] = parseFloat($("#result16").val());

    $.ajax({
        type: "POST",
        url: "/sub/Exp_10.do",
        data: {
            choice: choice,
            table1: table1,
            table2: table2,
            table3: table3,
            table4: table4,
            table5: table5,
            table6: table6,
            table7: table7,
            table8: table8,
            blank: blank,
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
    var table4 = new Array();
    var h1 = parseFloat($("#table1_1").val());
    var h2 = parseFloat($("#table1_2").val());
    var h3 = parseFloat($("#table1_3").val());
    var h4 = parseFloat($("#table1_4").val());
    var h5 = parseFloat($("#table1_5").val());
    var h6 = parseFloat($("#table1_6").val());
    var hh1 = (Math.abs(h1) + Math.abs(h2) + Math.abs(h3) + Math.abs(h4) + Math.abs(h5) + Math.abs(h6))/6000;
    $("#blank_1").val(hh1 .toFixed(4));
    var sigmah = Math.sqrt(((h1/1000-hh1)*(h1/1000-hh1)+(h2/1000-hh1)*(h2/1000-hh1)+(h3/1000-hh1)*(h3/1000-hh1)+(h4/1000-hh1)*(h4/1000-hh1)+(h5/1000-hh1)*(h5/1000-hh1)+(h6/1000-hh1)*(h6/1000-hh1))/5);
    var sigmahhh1 = sigmah/hh1*100;
    $("#blank_2").val(sigmahhh1.toFixed(2));

    var d1 = parseFloat($("#table2_1").val());
    var d2 = parseFloat($("#table2_2").val());
    var d3 = parseFloat($("#table2_3").val());
    var d4 = parseFloat($("#table2_4").val());
    var d5 = parseFloat($("#table2_5").val());
    var d6 = parseFloat($("#table2_6").val());
    var rr1 = (Math.abs(d1) + Math.abs(d2) + Math.abs(d3) + Math.abs(d4) + Math.abs(d5) + Math.abs(d6))/2/6000;
    $("#blank_3").val(rr1 .toFixed(4));
    var sigmad = Math.sqrt(((d1/2000-rr1)*(d1/2000-rr1)+(d2/2000-rr1)*(d2/2000-rr1)+(d3/2000-rr1)*(d3/2000-rr1)+(d4/2000-rr1)*(d4/2000-rr1)+(d5/2000-rr1)*(d5/2000-rr1)+ (d6/2000-rr1)*(d6/2000-rr1))/5);
    var sigmaddd1 = sigmad/rr1*100;
    $("#blank_4").val(sigmaddd1.toFixed(2));

    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 10; i++) {
        table4[i - 1] = $("#table4_" + i + "").val();
    }

    /**
     * 点数据
     */
    for (var i = 1; i <= 5; i++) {
        var data1 = new Array();
        data1[0] = parseFloat(table4[i-1]);
        data1[1] = parseFloat(table4[i-1+5]);
        outdataUhs[i - 1] = data1;
    }

    var y1 = 0;
    for (var i = 0; i < 5; i++) {
        y1 = y1 + Math.abs(table4[i]) / 5;
    }

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

    var R2 = getR2(outdataUhs, myRegression);

    /**
     * 图像自动生成
     */
    getChart(1, outdataUhs, myRegression);


    // var t = table[0] - table[4];
    // var T = table[5] - table[9];
    // var number = Math.abs(t) / Math.abs(T);
    // $("#input_27").attr("value",  number.toFixed(2));
    $("#blank_5").attr("value", myRegression.parameter.gradient .toFixed(3));
    $("#blank_6").attr("value", myRegression.expression);
    $("#blank_7").attr("value", R2.toFixed(8));
    var t1 = parseFloat($("#table3_1").val());
    var t2 = parseFloat($("#table3_2").val());
    var lambda1 = (0.823*385*hh1)/(3.14*rr1*rr1)/(t2-t1)*(2*0.00801+0.065)/(2*0.00801+2*0.065)*(myRegression.parameter.gradient);
    $("#blank_15").val(lambda1 .toFixed(3));
}


function productDataAndPicture2() {
    var table8 = new Array();
    var H1 = parseFloat($("#table5_1").val());
    var H2 = parseFloat($("#table5_2").val());
    var H3 = parseFloat($("#table5_3").val());
    var H4 = parseFloat($("#table5_4").val());
    var H5 = parseFloat($("#table5_5").val());
    var H6 = parseFloat($("#table5_6").val());
    var HH1 = (Math.abs(H1) + Math.abs(H2) + Math.abs(H3) + Math.abs(H4) + Math.abs(H5) + Math.abs(H6))/6000;
    $("#blank_8").val(HH1 .toFixed(4));
    var sigmaH = Math.sqrt(((H1/1000-HH1)*(H1/1000-HH1)+(H2/1000-HH1)*(H2/1000-HH1)+(H3/1000-HH1)*(H3/1000-HH1)+(H4/1000-HH1)*(H4/1000-HH1)+(H5/1000-HH1)*(H5/1000-HH1)+(H6/1000-HH1)*(H6/1000-HH1))/5);
    var sigmaHHH1 = sigmaH/HH1*100;
    $("#blank_9").val(sigmaHHH1.toFixed(2));

    var D1 = parseFloat($("#table6_1").val());
    var D2 = parseFloat($("#table6_2").val());
    var D3 = parseFloat($("#table6_3").val());
    var D4 = parseFloat($("#table6_4").val());
    var D5 = parseFloat($("#table6_5").val());
    var D6 = parseFloat($("#table6_6").val());
    var RR1 = (Math.abs(D1) + Math.abs(D2) + Math.abs(D3) + Math.abs(D4) + Math.abs(D5) + Math.abs(D6))/2/6000;
    $("#blank_10").val(RR1 .toFixed(4));
    var sigmaD = Math.sqrt(((D1/2000-RR1)*(D1/2000-RR1)+(D2/2000-RR1)*(D2/2000-RR1)+(D3/2000-RR1)*(D3/2000-RR1)+(D4/2000-RR1)*(D4/2000-RR1)+(D5/2000-RR1)*(D5/2000-RR1)+ (D6/2000-RR1)*(D6/2000-RR1))/5);
    var sigmaDDD1 = sigmaD/RR1*100;
    $("#blank_11").val(sigmaDDD1.toFixed(2));

    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 10; i++) {
        table8[i - 1] = $("#table8_" + i+ "").val();
    }
    //下面的i怎么这样取？
    /**
     * 点数据
     */
    for (var i = 1; i <= 5; i++) {
        var data1 = new Array();
        data1[0] = parseFloat(table8[i-1]);
        data1[1] = parseFloat(table8[i-1+5]);
        outdataUhs[i - 1] = data1;
    }


    var y2 = 0;
    for (var i = 0; i <5; i++) {
        y2 = y2 + Math.abs(table8[i]) / 5;
    }

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

    var R2 = getR2(outdataUhs, myRegression);
    /**
     * 图像自动生成
     */
    getChart(2, outdataUhs, myRegression);

    // var t = table[0] - table[4];
    // var T = table[5] - table[9];
    // var number = Math.abs(t) / Math.abs(T);
    // $("#input_54").attr("value", number.toFixed(2));

    $("#blank_12").attr("value", myRegression.parameter.gradient .toFixed(3));
    $("#blank_13").attr("value", myRegression.expression);
    $("#blank_14").attr("value", R2.toFixed(8));
    var T1 = parseFloat($("#table7_1").val());
    var T2 = parseFloat($("#table7_2").val());
    var lambda2 = (0.823*385*HH1)/(3.14*RR1*RR1)/(T2-T1)*(2*0.00801+0.065)/(2*0.00801+2*0.065)*(myRegression.parameter.gradient);
    $("#blank_16").val(lambda2 .toFixed(3));
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
            expId: 10,
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
