$(function () {
        $.ajax({
            type: "GET",
            url: "/exp/get_exp_status.do",
            data: {
                expId: 9
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
                expId: 9
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



function submitAll() {
    if (confirm("为避免数据丢失，提交前请先将实验数据截图，确认提交吗？")) {
        submit();
    }
}

function submit() {
    var choice = new Array();
    var table = new Array();
    var blank = new Array();

    for (var i = 1; i <= 46; i++) {
    choice[i - 1] = $("#choice_" + i +"").val();
}

    for (var i = 1; i <= 20; i++) {
        table[i-1] = $("#table_" + i + "").val();
    }

    for (var i = 1; i <= 6; i++) {
        blank[i-1] = $("#blank_" + i + "").val();
    }

    // result[0] = $("#result1").val();
    // result[1] = $("#result2").val();
    // result[2] = $("#result3").val();
    // result[3] = $("#result4").val();
    // result[4] = $("#result5").val();
    // result[5] = $("#result6").val();


    $.ajax({
        type: "POST",
        url: "/sub/Exp_09.do",
        data: {
            choice:choice,
            table:table,
            result:result
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
            alert("服务器请求失败，请确认数据填写正确且完整后重试" + result);
        }
    });
}

function productData() {
    // var table = new Array();
    // var result = new Array();

    // for (var i = 1; i <= 20; i++) {
    //     table[i - 1] = $("#table1_" + i + "").val();
    // }
    var x1 = parseFloat($("#table_1").val());
    var x2 = parseFloat($("#table_2").val());

    var x4 = parseFloat($("#table_4").val());
    var x5 = parseFloat($("#table_5").val());
    var x6 = parseFloat($("#table_6").val());

    var x8 = parseFloat($("#table_8").val());

    var x10 = parseFloat($("#table_10").val());
    var x11 = parseFloat($("#table_11").val());
    var x12 = parseFloat($("#table_12").val());

    var x14 = parseFloat($("#table_14").val());
    var x15 = parseFloat($("#table_15").val());
    var x16 = parseFloat($("#table_16").val());

    var x18 = parseFloat($("#table_18").val());

    var x20 = parseFloat($("#table_20").val());
    var x3 = x1 * x2;
    var x7 = x4 * x5;
    var x9 = 1/x7;
    var x13 = x11 * x12;
    var x17 = x14 * x15;
    var x19 = 1/x17;
    $("#table_3").val(x3.toFixed(2));
    $("#table_7").val(x7.toFixed(2));
    $("#table_9").val(x9.toFixed(2));
    $("#table_13").val(x13.toFixed(2));
    $("#table_17").val(x17.toFixed(2));
    $("#table_19").val(x19.toFixed(2));

    var y1 = Math.abs(x3 - x4) / x4 * 100;
    var y2 = Math.abs(x7 - x8) / x8 * 100;
    var y3 = Math.abs(x9 - x10) / x10 * 100;
    var y4 = Math.abs(x13 - x14) / x14 * 100;
    var y5 = Math.abs(x17 - x18) / x18 * 100;
    var y6 = Math.abs(x19 - x20) / x20 * 100;
    $("#blank_1").val(y1.toFixed(2));
    $("#blank_2").val(y2.toFixed(2));
    $("#blank_3").val(y3.toFixed(2));
    $("#blank_4").val(y4.toFixed(2));
    $("#blank_5").val(y5.toFixed(2));
    $("#blank_6").val(y6.toFixed(2));
}

