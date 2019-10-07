function submit() {
    var choice = new Array();
    var table = new Array();
    var blank = new Array();

    for (var i = 1; i <= 13; i++) {
        choice[i - 1] = $("#choice_" + i + "").val();
    }

    for (var i = 1; i <= 32; i++) {
        table[i - 1] = $("#table_" + i + "").val();
    }

    for (var i = 1; i <= 12; i++) {
        blank[i - 1] = $("#blank_" + i + "").val();
    }

    $.ajax({
        type: "POST",
        url: "/sub/Exp_03.do",
        data: {
            choice: choice,
            blank: blank,
            table: table
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
        submit();
    }
}

$(function () {
        $.ajax({
            type: "GET",
            url: "/exp/get_exp_status.do",
            data: {
                expId: 3
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
                expId: 3
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

function autoGenera1() {
    var xx1 = parseFloat($("#table_1").val());
    var xx2 = parseFloat($("#table_2").val());
    var xx3 = parseFloat($("#table_3").val());
    var xx4 = parseFloat($("#table_4").val());
    var xx5 = parseFloat($("#table_5").val());
    var xx6 = parseFloat($("#table_6").val());
    var xx7 = parseFloat($("#table_7").val());
    var xx8 = parseFloat($("#table_8").val());
    var xx9 = parseFloat($("#table_9").val());
    var xx10 = parseFloat($("#table_10").val());
    var xx11 = parseFloat($("#table_11").val());
    var xx12 = parseFloat($("#table_12").val());
    var xx13 = parseFloat($("#table_13").val());
    var xx14 = parseFloat($("#table_14").val());
    var xx15 = parseFloat($("#table_15").val());
    var xx16 = parseFloat($("#table_16").val());
    var xx17 = parseFloat($("#table_17").val());
    var xx18 = parseFloat($("#table_18").val());
    var xx19 = parseFloat($("#table_19").val());
    var xx20 = parseFloat($("#table_20").val());
    var xx21 = parseFloat($("#table_21").val());
    var xx22 = parseFloat($("#table_22").val());
    var xx23 = parseFloat($("#table_23").val());
    var xx24 = parseFloat($("#table_24").val());
    var xx25 = parseFloat($("#table_25").val());
    var xx26 = parseFloat($("#table_26").val());
    var xx27 = parseFloat($("#table_27").val());
    var xx28 = parseFloat($("#table_28").val());
    var xx29 = parseFloat($("#table_29").val());
    var xx30 = parseFloat($("#table_30").val());
    var xx31 = parseFloat($("#table_31").val());
    var xx32 = parseFloat($("#table_32").val());

    var x1 = xx1 + Math.abs(xx9)/60 .toFixed(2);
    var x2 = xx2 + Math.abs(xx10)/60 .toFixed(2);
    var x3 = xx3 + Math.abs(xx11)/60 .toFixed(2);
    var x4 = xx4 + Math.abs(xx12)/60 .toFixed(2);
    var x5 = xx5 + Math.abs(xx13)/60 .toFixed(2);
    var x6 = xx6 + Math.abs(xx14)/60 .toFixed(2);
    var x7 = xx7 + Math.abs(xx15)/60 .toFixed(2);
    var x8 = xx8 + Math.abs(xx16)/60 .toFixed(2);
    var x9 = xx17 + Math.abs(xx25)/60 .toFixed(2);
    var x10 = xx18 + Math.abs(xx26)/60 .toFixed(2);
    var x11 = xx19 + Math.abs(xx27)/60 .toFixed(2);
    var x12 = xx20 + Math.abs(xx28)/60 .toFixed(2);
    var x13 = xx21 + Math.abs(xx29)/60 .toFixed(2);
    var x14 = xx22 + Math.abs(xx30)/60 .toFixed(2);
    var x15 = xx23 + Math.abs(xx31)/60 .toFixed(2);
    var x16 = xx24 + Math.abs(xx32)/60 .toFixed(2);

    var y1 = Math.abs(x4 - x5) > 300 ? 360 - Math.abs(x4 - x5) : Math.abs(x4 - x5);
    var y2 = Math.abs(x12 - x13) > 300 ? 360 - Math.abs(x12 - x13) : Math.abs(x12 - x13);
    var res1 = (y1 + y2) / 4;
    $("#blank_1").val(res1.toFixed(2));

    var y3 = Math.abs(x1 - x8) > 300 ? 360 - Math.abs(x1 - x8) : Math.abs(x1 - x8);
    var y4 = Math.abs(x9 - x16) > 300 ? 360 - Math.abs(x9 - x16) : Math.abs(x9 - x16);
    var res2 = (y3 + y4) / 4;
    $("#blank_2").val(res2.toFixed(2));

    var y5 = Math.abs(x3 - x6) > 300 ? 360 - Math.abs(x3 - x6) : Math.abs(x3 - x6);
    var y6 = Math.abs(x11 - x14) > 300 ? 360 - Math.abs(x11 - x14) : Math.abs(x11 - x14);
    var res3 = (y5 + y6) / 4;
    $("#blank_3").val(res3.toFixed(2));

    var y7 = Math.abs(x2 - x7) > 300 ? 360 - Math.abs(x2 - x7) : Math.abs(x2 - x7);
    var y8 = Math.abs(x10 - x15) > 300 ? 360 - Math.abs(x10 - x15) : Math.abs(x10 - x15);
    var res4 = (y7 + y8) / 4;
    $("#blank_4").val(res4.toFixed(2));
}

// function autoGenera1() {
//     yanshejiao(4, 5, 12, 13, 1);
//     yanshejiao(1, 8, 9, 16, 2);
//     yanshejiao(3, 6, 11, 14, 3);
//     yanshejiao(2, 7, 10, 15, 4);
// }
//
// function yanshejiao(i1, i2, i3, i4, j){
//     var x1 = parseFloat($("#table_" + i1).val());
//     var x2 = parseFloat($("#table_" + i2).val());
//     var x3 = parseFloat($("#table_" + i3).val());
//     var x4 = parseFloat($("#table_" + i4).val());
//     var left = Math.abs(x1 - x2) > 300 ?  360 - Math.abs(x1 - x2) :  Math.abs(x1 - x2);
//     var right = Math.abs(x3 - x4) > 300 ?  360 - Math.abs(x3 - x4) :  Math.abs(x3 - x4);
//     var res = (left + right) / 4;
//     $("#blank_" + j).val(res.toFixed(2));
// }

function autoGenera2() {
    dg1();
    dg2();
    d();
    E1();
    ly1();
    E2();
    ly2()
    E3();
}

function dg1() {
    var up = 546.1;
    var g = parseFloat($("#blank_1").val());
    var down = Math.sin(g * 0.017453293);
    var res = up / down;
    $("#blank_5").val(res.toFixed(2));
}

function dg2() {
    var up = 546.1 * 2;
    var g = parseFloat($("#blank_2").val());
    var down = Math.sin(g * 0.017453293);
    var res = up / down;
    $("#blank_6").val(res.toFixed(2));
}

function d() {
    var up = parseFloat($("#blank_5").val()) +  parseFloat($("#blank_6").val());
    var res = up / 2;
    $("#blank_7").val(res.toFixed(2));
}

function E1() {
    var d = parseFloat($("#blank_7").val());
    var up = Math.abs(d - 3300) * 100;
    var down = 3300;
    var res = up / down;
    $("#blank_8").val(res.toFixed(2));
}

function ly1() {
    var d = parseFloat($("#blank_7").val());
    var y = parseFloat($("#blank_3").val());
    var res = d * Math.sin(y * 0.017453293);
    $("#blank_9").val(res.toFixed(2));
}

function E2() {
    var y = parseFloat($("#blank_9").val());
    var up = Math.abs(y - 577) * 100;
    var res = up / 577;
    $("#blank_10").val(res.toFixed(2));
}

function ly2() {
    var d = parseFloat($("#blank_7").val());
    var y = parseFloat($("#blank_4").val());
    var res = d * Math.sin(y * 0.017453293);
    $("#blank_11").val(res.toFixed(2));
}

function E3() {
    var y = parseFloat($("#blank_11").val());
    var up = Math.abs(y - 579.1) * 100;
    var res = up / 579.1;
    $("#blank_12").val(res.toFixed(2));
}
