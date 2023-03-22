$(function () {
    $('ul.level1').show();
    //console.log(window.location.pathname)
    var link = $('nav.main-nav a').filter(function () {
        return $(this).attr('href') === window.location.pathname;
    });
    $(link).parents('ul').show();
    $(link).next('ul').show();
    $(link).css('color', 'black').addClass('active-link');

    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        //console.log($anchor)
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    //var cookieName = $('.cookie-box-contents').first().attr('id');
    ////console.log(cookieName)
    //if (document.cookie.indexOf(cookieName + "-cookie") === -1) {
    //    $('#cookie-warning').show();
    //}

    //$('#cookie-close').on('click', function (e) {
    //    e.preventDefault();
    //    document.cookie = cookieName + "-cookie=yes; max-age=" + (5 * 365 * 24 * 60 * 60);
    //    $('#cookie-warning').fadeOut('slow');
    //});

    $('#article h2, #article h3').append(' <sup><i class="bi bi-link permalink" title="Click for permalink"></i></sup>');
    $('#article').on('click', '.permalink', function () {
        var fragment = $(this).closest('h2, h3').attr('id');
        location.href = location.href.substring(0, location.href.indexOf("#")) + '#' + fragment;
    });


    var colorLine = function (el, lineNumber) {
        $(el).closest('ol').find('li:nth-child(' + lineNumber + ')').css('background', '#ffff80');
        $(el).closest('ol').find('li:nth-child(' + lineNumber + ') code').css('background', '#ffff80');
    };

    var colorLines = function (el, lineFrom, lineTo) {
        $(el).closest('ol').find('li:nth-child(n+' + lineFrom + '):nth-child(-n+' + lineTo + ')').css('background', '#ffff80');
        $(el).closest('ol').find('li:nth-child(n+' + lineFrom + '):nth-child(-n+' + lineTo + ') code').css('background', '#ffff80');
    };

    $('pre').addClass('prettyprint linenums');

    PR.prettyPrint();
    $('pre.prettyprint, code, li.L1, li.L3, li.L5, li.L7, li.L9').css('background', '#f9f9f9');
    $('pre.prettyprint').css({ 'padding': '10px', 'border': '1px solid #ddd' });
    $('.kwd').css('color', 'blue');
    $('.com').css('color', 'green');
    $('.str').css('color', 'brown');
    $('.typ').css('color', '#555');
    $('code.language-html').text().replace(/(@)([^@])/g, '<span style="background:yellow">$1</span>$2');
    $.each($('code[data-lines]'), function () {
        var el = $(this);
        if (!Number.isInteger($(this).data('lines'))) {
            var lines = $(this).data('lines').split(',');
            lines.forEach(function (line) {
                var block = line.split('-');
                {
                    if (block.length > 1) {
                        colorLines($(el),block[0], block[1]);
                    } else {
                        colorLine($(el), line);
                    } 
                }
            });
        } else {
            colorLine($(el), $(this).data('lines'));
        }
    });
 });