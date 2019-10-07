var chart1;
var chart2;

// function generateChart1() {
//     // if(chart1 !== undefined){
//     //     chart1.update();
//     // }
//
//     var pic1BeginY = parseFloat($("#chart1_index1").val());
//     // console.info('pic1BeginY = ' + pic1BeginY);
//     var pic1IndexY2 = parseFloat($("#chart1_index2").val());
//     // console.info('pic1IndexY2 = ' + pic1IndexY2);
//     var pic1IndexY3 = parseFloat($("#chart1_index3").val());
//     // console.info('pic1IndexY3 = ' + pic1IndexY3);
//     var pic1IndexY4 = parseFloat($("#chart1_index4").val());
//     // console.info('pic1IndexY4 = ' + pic1IndexY4);
//     var pic1EndY = parseFloat($("#chart1_index5").val());
//     // console.info('pic1EndY = ' + pic1EndY);
//     var res = fitting(pic1BeginY, pic1IndexY2, pic1IndexY3, pic1IndexY4, pic1EndY);
//     var k = res[0];
//     var b = res[1];
//     var h = (1.60 * k).toFixed(3) * 1E-19 * 1E-14;
//     var h0 = 6.626E-34;
//     var E = Math.abs((h - h0) / h0) * 100;
//     $("#blank_02_01").text(k.toFixed(3) * 1E-14);
//     $("#blank_02_02").text(h);
//     $("#blank_02_03").text(E.toFixed(2));
//     // console.info("k = " + k);
//     // console.info("b = " + b);
//     var fitBeginY = k * pic1BeginX + b;
//     var fitEndY = k * pic1EndX + b;
//     // console.info("fitBeginY = " + fitBeginY);
//     // console.info("fitEndY = " + fitEndY);
//     var ctx = document.getElementById('chart1').getContext('2d');
//
//     chart1 = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: [pic1BeginX, pic1IndexX2, pic1IndexX3, pic1IndexX4, pic1EndX],
//             datasets: [{
//                 label: "拟合直线",
//                 backgroundColor: 'rgb(255, 99, 132)',
//                 borderColor: 'rgb(255, 99, 132)',
//                 data: [
//                     {x: pic1BeginX, y: fitBeginY}, {x: pic1EndX, y: fitEndY}
//                 ],
//                 fill: false,
//             }, {
//                 label: "原始数据",
//                 backgroundColor: 'rgb(105,105,105)',
//                 borderColor: 'rgba(255, 255, 255, 0)',
//                 data: [
//                     pic1BeginY, pic1IndexY2, pic1IndexY3, pic1IndexY4, pic1EndY
//                 ],
//                 fill: false,
//             }]
//         },
//         options: {
//             responsive: true,
//             title: {
//                 display: true,
//                 text: '实验曲线图'
//             },
//             tooltips: {
//                 mode: 'index',
//                 intersect: false,
//             },
//             hover: {
//                 mode: 'nearest',
//                 intersect: true
//             },
//             scales: {
//                 xAxes: [{
//                     display: true,
//                     scaleLabel: {
//                         display: true,
//                         labelString: '频率V（10E+14Hz）'
//                     }
//                 }],
//                 yAxes: [{
//                     display: true,
//                     scaleLabel: {
//                         display: true,
//                         labelString: '截止电压Uo（V）'
//                     }
//                 }]
//             }
//         }
//     });
// }




/**
 * 生成数据和图像
 */

var outdataUhs = new Array();
var myRegression;


function productDataAndPicture1() {

    var table = new Array();
    var table1 = new Array();
    // var table_out = new Array();

    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 5; i++) {
        table1[i - 1] = $("#table1_" + i + "").val();
    }
    table[0]=8.219;
    table[1]=7.407;
    table[2]=6.881;
    table[3]=5.495;
    table[4]=5.199;
    /**
     * 点数据
     */
    // var xx1 = parseFloat($("#table0_1").val());
    // var xx2 = parseFloat($("#table0_2").val());
    // var xx3 = parseFloat($("#table0_3").val());
    // var xx4 = parseFloat($("#table0_4").val());
    // var xx5 = parseFloat($("#table0_5").val());
    // var yy1 = 3000/xx1;
    // var yy2 = 3000/xx2;
    // var yy3 = 3000/xx3;
    // var yy4 = 3000/xx4;
    // var yy5 = 3000/xx5;
    // $("#table1_1").val(yy1 .toFixed(3));
    // $("#table1_2").val(yy2 .toFixed(3));
    // $("#table1_3").val(yy3 .toFixed(3));
    // $("#table1_4").val(yy4 .toFixed(3));
    // $("#table1_5").val(yy5 .toFixed(3));

    for (var i = 1; i <= 5; i++) {
        var data1 = new Array();
        data1[0] = parseFloat(table[i-1]);
        data1[1] = parseFloat(table1[i-1]);
        outdataUhs[i - 1] = data1;
    }

    var y1 = 0;
    for (var i = 0; i < 5; i++) {
        y1 = y1 + Math.abs(table1[i]) / 5;
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
    $("#blank_1").attr("value", myRegression.parameter.gradient .toFixed(3));
    $("#blank_2").attr("value", myRegression.expression);
    $("#blank_3").attr("value", R2.toFixed(3));
    var kk = myRegression.parameter.gradient;
    var hh = 1.6 * kk * 1E-19 * 1E-14;
    var hhh = hh/1E-34;
    $("#blank_4").val(hhh .toFixed(2));
    var up = Math.abs(hh - 6.626E-34) * 100;
    var res = up / (6.626E-34);
    $("#blank_5").val(res.toFixed(2));
}


function generateChart2() {

    // if(chart2 !== undefined){
    //     window.chart2.update();
    // }

    var table2_1 = parseFloat($("#table2_1").val());
    var table2_2 = parseFloat($("#table2_2").val());
    var table2_3 = parseFloat($("#table2_3").val());
    var table2_4 = parseFloat($("#table2_4").val());
    var table2_5 = parseFloat($("#table2_5").val());
    var table2_6 = parseFloat($("#table2_6").val());
    var table2_7 = parseFloat($("#table2_7").val());
    var table2_8 = parseFloat($("#table2_8").val());
    var table2_9 = parseFloat($("#table2_9").val());
    var table2_10 = parseFloat($("#table2_10").val());
    var table2_11 = parseFloat($("#table2_11").val());
    var table2_12 = parseFloat($("#table2_12").val());
    var table2_13 = parseFloat($("#table2_13").val());
    var table2_14 = parseFloat($("#table2_14").val());
    var table2_15 = parseFloat($("#table2_15").val());
    var table2_16 = parseFloat($("#table2_16").val());
    var table2_17 = parseFloat($("#table2_17").val());
    var table2_18 = parseFloat($("#table2_18").val());
    var table2_19 = parseFloat($("#table2_19").val());
    var table2_20 = parseFloat($("#table2_20").val());
    var table2_21 = parseFloat($("#table2_21").val());
    var table2_22 = parseFloat($("#table2_22").val());

    var U2 = (Math.abs(table2_19) + Math.abs(table2_20) + Math.abs(table2_21) + Math.abs(table2_22))/4;
    var sigmaU2 = Math.sqrt(((table2_19-U2)*(table2_19-U2)+(table2_20-U2)*(table2_20-U2)+(table2_21-U2)*(table2_21-U2)+(table2_22-U2)*(table2_22-U2))/3);
    var sigmaUU2 = sigmaU2/U2*100;
    $("#blank_6").val(sigmaUU2.toFixed(2));

    var table3_1 = parseFloat($("#table3_1").val());
    var table3_2 = parseFloat($("#table3_2").val());
    var table3_3 = parseFloat($("#table3_3").val());
    var table3_4 = parseFloat($("#table3_4").val());
    var table3_5 = parseFloat($("#table3_5").val());
    var table3_6 = parseFloat($("#table3_6").val());
    var table3_7 = parseFloat($("#table3_7").val());
    var table3_8 = parseFloat($("#table3_8").val());
    var table3_9 = parseFloat($("#table3_9").val());
    var table3_10 = parseFloat($("#table3_10").val());
    var table3_11 = parseFloat($("#table3_11").val());
    var table3_12 = parseFloat($("#table3_12").val());
    var table3_13 = parseFloat($("#table3_13").val());
    var table3_14 = parseFloat($("#table3_14").val());
    var table3_15 = parseFloat($("#table3_15").val());
    var table3_16 = parseFloat($("#table3_16").val());
    var table3_17 = parseFloat($("#table3_17").val());
    var table3_18 = parseFloat($("#table3_18").val());
    var table3_19 = parseFloat($("#table3_19").val());
    var table3_20 = parseFloat($("#table3_20").val());
    var table3_21 = parseFloat($("#table3_21").val());
    var table3_22 = parseFloat($("#table3_22").val());

    var U3 = (Math.abs(table3_19) + Math.abs(table3_20) + Math.abs(table3_21) + Math.abs(table3_22))/4;
    var sigmaU3 = Math.sqrt(((table3_19-U3)*(table3_19-U3)+(table3_20-U3)*(table3_20-U3)+(table3_21-U3)*(table3_21-U3)+(table3_22-U3)*(table3_22-U3))/3);
    var sigmaUU3 = sigmaU3/U3*100;
    $("#blank_7").val(sigmaUU3.toFixed(2));

    var table4_1 = parseFloat($("#table4_1").val());
    var table4_2 = parseFloat($("#table4_2").val());
    var table4_3 = parseFloat($("#table4_3").val());
    var table4_4 = parseFloat($("#table4_4").val());
    var table4_5 = parseFloat($("#table4_5").val());
    var table4_6 = parseFloat($("#table4_6").val());
    var table4_7 = parseFloat($("#table4_7").val());
    var table4_8 = parseFloat($("#table4_8").val());
    var table4_9 = parseFloat($("#table4_9").val());
    var table4_10 = parseFloat($("#table4_10").val());
    var table4_11 = parseFloat($("#table4_11").val());
    var table4_12 = parseFloat($("#table4_12").val());
    var table4_13 = parseFloat($("#table4_13").val());
    var table4_14 = parseFloat($("#table4_14").val());
    var table4_15 = parseFloat($("#table4_15").val());
    var table4_16 = parseFloat($("#table4_16").val());
    var table4_17 = parseFloat($("#table4_17").val());
    var table4_18 = parseFloat($("#table4_18").val());
    var table4_19 = parseFloat($("#table4_19").val());
    var table4_20 = parseFloat($("#table4_20").val());
    var table4_21 = parseFloat($("#table4_21").val());
    var table4_22 = parseFloat($("#table4_22").val());

    var U4 = (Math.abs(table4_19) + Math.abs(table4_20) + Math.abs(table4_21) + Math.abs(table4_22))/4;
    var sigmaU4 = Math.sqrt(((table4_19-U4)*(table4_19-U4)+(table4_20-U4)*(table4_20-U4)+(table4_21-U4)*(table4_21-U4)+(table4_22-U4)*(table4_22-U4))/3);
    var sigmaUU4 = sigmaU4/U4*100;
    $("#blank_8").val(sigmaUU4.toFixed(2));

    var ctx = document.getElementById('chart2').getContext('2d');

    chart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [pic2BeginX, pic2IndexX2, pic2IndexX3, pic2IndexX4, pic2IndexX5, pic2IndexX6, pic2IndexX7, pic2IndexX8
                , pic2IndexX9, pic2IndexX10, pic2IndexX11, pic2IndexX12, pic2IndexX13, pic2IndexX14, pic2IndexX15, pic2IndexX16
                , pic2IndexX17, pic2IndexX18, pic2IndexX19, pic2IndexX20, pic2IndexX21, pic2EndX],
            datasets: [{
                label: "r=40cm, 4mm",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [
                    table2_1, table2_2, table2_3, table2_4, table2_5, table2_6, table2_7, table2_8, table2_9,
                    table2_10, table2_11, table2_12, table2_13, table2_14, table2_15, table2_16, table2_17, table2_18,
                    table2_19, table2_20, table2_21, table2_22],
                fill: false,
            }, {
                label: "r=40cm, 2mm",
                backgroundColor: 'rgb(105,105,105)',
                borderColor: 'rgb(105,105,105)',
                data: [
                    table3_1, table3_2, table3_3, table3_4, table3_5, table3_6, table3_7, table3_8, table3_9,
                    table3_10, table3_11, table3_12, table3_13, table3_14, table3_15, table3_16, table3_17, table3_18,
                    table3_19, table3_20, table3_21, table3_22
                ],
                fill: false,
            }, {
                label: "r=30cm, 2mm",
                backgroundColor: 'rgb(126, 202, 256)',
                borderColor: 'rgb(126, 202, 256)',
                data: [
                    table4_1, table4_2, table4_3, table4_4, table4_5, table4_6, table4_7, table4_8, table4_9,
                    table4_10, table4_11, table4_12, table4_13, table4_14, table4_15, table4_16, table4_17, table4_18,
                    table4_19, table4_20, table4_21, table4_22
                ],
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: '实验曲线图'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'U'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'I'
                    }
                }]
            }
        }
    });
}



var pic2BeginX = -1;
var pic2IndexX2 = -0.5;
var pic2IndexX3 = 0;
var pic2IndexX4 = 2;
var pic2IndexX5 = 4;
var pic2IndexX6 = 6;
var pic2IndexX7 = 8;
var pic2IndexX8 = 10;
var pic2IndexX9 = 12;
var pic2IndexX10 = 14;
var pic2IndexX11 = 16;
var pic2IndexX12 = 18;
var pic2IndexX13 = 20;
var pic2IndexX14 = 22;
var pic2IndexX15 = 24;
var pic2IndexX16 = 26;
var pic2IndexX17 = 28;
var pic2IndexX18 = 30;
var pic2IndexX19 = 32;
var pic2IndexX20 = 34;
var pic2IndexX21 = 36;
var pic2EndX = 38;

// function fitting(u1, u2, u3, u4, u5) {
//     var v1 = pic1BeginX;
//     var v2 = pic1IndexX2;
//     var v3 = pic1IndexX3;
//     var v4 = pic1IndexX4;
//     var v5 = pic1EndX;
//
//     var sumV = v1 + v2 + v3 + v4 + v5;
//     // console.info("sumV = " + sumV)
//     var sumU = u1 + u2 + u3 + u4 + u5;
//     // console.info("sumU = " + sumU)
//     var avgV = sumV / 5;
//     // console.info("avgV = " + avgV)
//     var avgU = sumU / 5;
//     // console.info("avgU = " + avgU)
//     var avgMulUV = (v1 * u1 + v2 * u2 + v3 * u3 + v4 * u4 + v5 * u5) / 5;
//     // console.info("avgMulUV = " + avgMulUV)
//     var avgMulVV = (v1 * v1 + v2 * v2 + v3 * v3 + v4 * v4 + v5 * v5) / 5;
//     // console.info("avgMulVV = " + avgMulVV)
//
//     var k = (avgV * avgU - avgMulUV) / (avgV * avgV - avgMulVV);
//
//     var b = u1 - k * v1;
//
//     return [k, b];
// }


function uploadChart(chart, index) {
    // 获取Canvas的编码。
    var imgData = document.getElementById(chart).toDataURL("image/png");

    // 上传到后台。
    $.ajax({
        type: "post",
        url: "/exp/upload_chart.do",
        data: {
            image: imgData.substring(22),
            expId: 1,
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
}


function submit() {
    var choice = new Array();
    var blank = new Array();
    var table1 = new Array();
    var table2 = new Array();
    var table3 = new Array();
    var table4 = new Array();

    for (var i = 1; i <= 11; i++) {
         choice[i - 1] = $("#choice_" + i + "").val();
    }

    for (var i = 1; i <= 8; i++) {
        blank[i - 1] = $("#blank_" + i + "").text();
    }

    for (var i = 1; i <= 5; i++) {
        table1[i - 1] = $("#table1_" + i + "").val();
    }

    for (var i = 1; i <= 22; i++) {
        table2[i - 1] = $("#table2_" + i + "").val();
    }

    for (var i = 1; i <= 22; i++) {
         table3[i - 1] = $("#table3_" + i + "").val();
    }

    for (var i = 1; i <= 22; i++) {
         table4[i - 1] = $("#table4_" + i + "").val();
    }


    $.ajax({
        type: "POST",
        url: "/sub/Exp_01.do",
        data: {
            choice: choice,
            blank: blank,
            table1: table1,
            table2: table2,
            table3: table3,
            table4: table4
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
    });
}


function submitAll() {
    if (confirm("为避免数据丢失，提交前请先将实验数据截图，确认提交吗？")) {
        uploadChart("chart1", 1);
        uploadChart("chart2", 2);
        submit();
    }
}

$(function () {
        $.ajax({
            type: "GET",
            url: "/exp/get_exp_status.do",
            data: {
                expId: 1
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
                expId: 1
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
