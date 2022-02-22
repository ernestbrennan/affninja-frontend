/*
 * Showup.js jQuery Plugin
 * http://github.com/jonschlinkert/showup
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT).
 */


(function ($) {
    $.fn.showUp = function (ele, options) {
        options = options || {};

        var target = $(ele);
        var down = options.down || 'navbar-hide';
        var up = options.up || 'navbar-show';
        var btnHideShow = options.btnHideShow || '.btn-hide-show';
        var hideOffset = options.offset || 110;
        var previousScroll = 0;

        $(window).scroll(function () {
            // var currentScroll = $(this).scrollTop();
            if ($(this).scrollTop() > hideOffset) {
                if ($(this).scrollTop() > previousScroll) {
                    // Action on scroll down
                    target.removeClass(up).addClass(down);
                } else {
                    // Action on scroll up
                    target.removeClass(down).addClass(up);
                }
            }
            previousScroll = $(this).scrollTop();
        });

        // Toggle visibility of target on click
        $(btnHideShow).click(function () {
            if (target.hasClass(down)) {
                target.removeClass(down).addClass(up);
            } else {
                target.removeClass(up).addClass(down);
            }
        });
    };
})(jQuery);

$(document).ready(function () {
    var duration = 420;
    var showOffset = 220;
    var btnFixed = '.btn-fixed-bottom';
    var btnToTopClass = '.back-to-top';

    $(window).scroll(function () {
        if ($(this).scrollTop() > showOffset) {
            $(btnFixed).fadeIn(duration);
        } else {
            $(btnFixed).fadeOut(duration);
        }
    });

    $(btnToTopClass).click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    });

    var inProgress = false;
    var stop = false;
    var page = 2;

    var current_hash = '';


    $(window).scroll(function () {

        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100 && !inProgress && !stop) {

            $.ajax({
                url: 'http://api.' + MAIN_DOMAIN + '/news.getList',
                method: 'GET',
                data: {page: page},

                beforeSend: function () {
                    inProgress = true;
                    $('#newsLoading').show();
                    Pace.start();
                }

            }).success(function (data) {

                if (data.response.data.length > 0) {
                    $.each(data.response.data, function (index, news) {

                        $('#news').append(
                            '<div class="hpanel">' +
                            '<div class="panel-body">' +
                            '<div class="tab-content">' +
                            '<div class="news-section" style="height: auto">' +
                            '<div id="note3" class="tab-pane">' +
                            '<div class="pull-right text-muted m-l-lg">' +
                            date("d.m.Y H:i", strtotime(news.created_at)) +
                            '</div>' +
                            '<h3>' + news.title + '</h3>' +
                            '<hr>' +
                            '<div class="note-content">' + news.body + '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                        );
                    });

                    inProgress = false;
                    page += 1;
                }
            }).error(function (xhr) {
                var data = $.parseJSON(xhr.responseText);

                if (data.status_code == '404') {
                    stop = true;
                }
            }).always(function () {
                $('#newsLoading').hide();
                Pace.stop();
            });
        }
    });

    setTimeout(function () {
        $('.unread_news').slideUp();
    }, 500);
});