(function () {

    'use strict';

    //  .fullHeight
    //  .contentHeight = full - header - footer

     $(document).ready(function () {
//        console.log("ready!");

        var wH = $(window).height();
        var wW = $(window).width();

//        console.log(wH);

        var wHpx = wH + "px";
        var wWpx = wW + "px";

//        console.log(wW);
        $("#fullHeight").css("height", wHpx); //.css( "color", "red" );
        $("#fullHeight").css("max-height", wHpx); //.css( "color", "red" );
        $("#fullHeight img").css("max-height", wHpx); //.css( "color", "red" );
        $("#fullHeight svg").css("max-height", wHpx); //.css( "color", "red" );

        var cH = wH - $(".bar-header").height();
        var cHpx = cH + "px";

//        console.log(cHpx);
        $("#contentHeight").css("height", cHpx); //.css( "color", "red" );
        $("#contentHeight").css("max-height", cHpx); //.css( "color", "red" );
        $("#contentHeight img").css("max-height", cHpx); //.css( "color", "red" );
        $("#contentHeight svg").css("max-height", cHpx); //.css( "color", "red" );


        var bH = cH - $(".bar-footer").height();
        var bHpx = bH + "px";
        $("#boxHeight").css("height", bHpx); //.css( "color", "red" );
        $("#boxHeight").css("max-height", bHpx); //.css( "color", "red" );
        $("#boxHeight img").css("max-height", bHpx); //.css( "color", "red" );
        $("#boxHeight svg").css("max-height", bHpx); //.css( "color", "red" );



        //console.log(angular.element(document.querySelector('.openbroswer')).innerHTML);

        //$("div.div-image-100").on("a.openbroswer",click,function(){
           //console.log("clicked");
        //});


    });

})();
