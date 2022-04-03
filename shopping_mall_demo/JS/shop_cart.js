$(function () {


    // 頁面開關燈
    $("#btn-light").on("click", function () {
        $("#btn-light").addClass("-off");
        $("#btn-dark").removeClass("-off");
        $("main").addClass("-dark");
    });
    $("#btn-dark").on("click", function () {
        $("#btn-dark").addClass("-off");
        $("#btn-light").removeClass("-off");
        $("main").removeClass("-dark");
    });

    // 下拉選單
    $('.nav-item .nav_ul').on('click', function () {
        if ($(this).hasClass("switchDisplay") == false) {
            $('.nav-item .nav_ul,.nav-item ul').removeClass('switchDisplay');
        }
        $(this).toggleClass('switchDisplay').siblings().toggleClass('switchDisplay');
    });

    // 搜尋欄位放大鏡停止預設行為
    $("#a_loupe").on("click", function (event) {
        event.preventDefault();
    });

    // 商品數量增減&算總金額
    $(document).on("click", ".btn_reduce_number", function () {
        var _num = $(this).closest("div.row").find("p[class*=product_number_text]");
        _num.text(parseInt(_num.text()) - 1);
        if (parseInt(_num.text()) <= 0) {
            _num.text(1);
        };
        var _dollor = $(this).closest("div.card-body").find("p[class*=price_text]");
        var _total = parseInt(_num.text()) * parseInt(_dollor.text());
        $(this).closest("div.card-body").find("p[class*=cost_text]").html(_total + "元");
        $(this).closest("main").find("#use_e_packet").val("");
        setTotal();
    });

    $(document).on("click", ".btn_add_number", function () {
        var _num = $(this).closest("div.row").find("p[class*=product_number_text]");
        _num.text(parseInt(_num.text()) + 1);
        var _dollor = $(this).closest("div.card-body").find("p[class*=price_text]");
        var _total = parseInt(_num.text()) * parseInt(_dollor.text());
        $(this).closest("div.card-body").find("p[class*=cost_text]").html(_total + "元");
        $(this).closest("main").find("#use_e_packet").val("");
        setTotal();
    });

    function setTotal() {
        var sum = 0;
        $(".add_list_area div.card-body").each(function () {
            var num = parseInt($(this).find("p[class*=product_number_text]").text());
            var dollor = parseInt($(this).find("p[class*=price_text]").text());
            sum += num * dollor;
        })
        $("p.final_cost_price").html(sum);
    }
    setTotal();


    // 刪除商品
    $(document).on("click", ".product_delete", function () {
        let r = confirm("確認移除？");
        if (r) {
            $(this).closest(".card-body").fadeOut(1000, function () {
                $(this).closest("main").find("#use_e_packet").val("");
                $(this).remove();
                setTotal();
            });
        };
    });

    // 自取限制(付現)
    $("div.pickup_area .form-check-input").on("click", function () {
        if ($(this).closest("div.card-body").find("#on_spot").prop("checked")) {
            $(this).closest("main").find("input#cash").attr("disabled", false);
        } else {
            $(this).closest("main").find("input#cash").attr("disabled", true);
            $(this).closest("main").find("input#cash").prop("checked", false);
        }
    });

    // 電子錢包折抵
    $("input#use_e_packet").on("focus", function () {
        setTotal();
    });

    $("input#use_e_packet").on("blur", function () {
        if ((parseInt($(this).val())) <= (parseInt($(this).closest("main").find("p.list_end_text1").text().replace(/[^0-9]/ig,"")))) {
            var ues_e_packet_reduce = ($("p.final_cost_price").html()) - ($(this).val());
            $("p.final_cost_price").html(ues_e_packet_reduce);
        } else if (($(this).val()) == ""){   
        } else {
            $(this).closest("main").find("#use_e_packet").val("");
            alert("餘額不足，請加值");
        }
    });

    // 電子錢包禁止輸入數字以外的字
    $("input#use_e_packet").on("keydown", function (e) {
        console.log(e.which);
        if ((e.which >= 48 && e.which <= 57) || e.which == 8) {
        } else {
            e.preventDefault();
        }
    });

});