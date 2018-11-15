$(window).scroll(function () {
    var st = $(this).scrollTop();
    $('section').css({
        'transition': 'none'
    });
    $('section:nth-child(1)').css({
        'transform':'translateY(' + st/11 + '%)'
    });
   $('section:nth-child(2)').css({
        'transform':'translateY(' + st/30 + '%)'
    });
    $('section:nth-child(3)').css({
        'transform':'translateY(' + st/34 + '%)'
    });

    $('.header').css({
        'transform':'translateY(-' + st/8 + '%)',
        'transition': 'none'
    });
});

$(document).ready(function () {
    $('section').css({
        'transition': 'ease all 1s'
    });
    setTimeout(function () {
        $('.header').css({
            'filter':'blur(0)',
            'transition': 'ease all 1s',
            'font-size':'120px'
        });
    },200);
    $('.next').click(function () {
        $('section:nth-child(2)').css({
            'transform':'translateY(-100%)'
        });
    });

    $('.mob-button').click(function () {
        $('.mob-button').toggleClass('open');
        $(this).next().toggleClass('active');
        $('.menu-element').each(function (index) {
            $(this).toggleClass('active');
        });
    });
    fullMenu();
});

function fullMenu() {
    var ce = document.body.clientWidth/10;
    var nw  = (ce + 2);
    console.log(ce);

    for(var i = 0; i < 10; i++){
        var tp = Math.random()*99;
        console.log(tp);
        $('.menu-wraper').append('<div class="menu-element" style="width:' + nw + 'px;height:' + tp +'%"></div>');
    }
}