/*global $:false, Torpe:false */

$(function () {
    'use strict';

    var torpeFront = new Torpe(),
        torpeBack = new Torpe(),
        torpeIcon = new Torpe({
            width: 16,
            height: 16,
            elementSize: 12,
            margin: 2,
            minCombinedElements: 1,
            lineWidth: 2,
            thickLineWidth: 2,
            border: 0
        }),
        $title = $('#title'),
        $backTitle = $('#backTitle'),
        $front = $('<img />'),
        $back = $('<img />'),
        $downloadFront = $('#downloadFront'),
        $downloadBack = $('#downloadBack'),
        linkColor,
        $favicon = $('<link />'),
        palette,
        title;

    function formatDate(date) {
        function pad(n) { return n < 10 ? '0' + n : n; }

        return pad(date.getHours()) + ':' +
            pad(date.getMinutes()) + ' ' +
            pad(date.getDate()) + '/' +
            pad(date.getMonth() + 1) + '/' +
            pad(date.getFullYear());
    }

    torpeFront.draw();
    $title.get(0).onload = function () {
        torpeFront.drawImage($title.get(0), 0, 0);

        $front.attr('src', torpeFront.getImageDataURI());
        $downloadFront.attr('href', torpeFront.getImageDataURI());
    };
    palette = torpeFront.getPalette();
    title = "Esta es tu portada de 'Torpe'";
    $front
        .attr('title', title)
        .attr('alt', title);

    torpeBack.options.palette = palette;
    torpeBack.options.minCombinedElements = 1;
    torpeBack.draw();
    $backTitle.get(0).onload = function () {
        torpeBack.drawImage($backTitle.get(0), 0, 0);
        torpeBack.writeText(formatDate(new Date()), 19 * 70, 19 * 70);

        $back.attr('src', torpeBack.getImageDataURI());
        $downloadBack.attr('href', torpeBack.getImageDataURI());
    };
    title = "Esta es tu contraportada de 'Torpe'";
    $back
        .attr('title', title)
        .attr('alt', title);

    torpeIcon.options.palette = palette;
    torpeIcon.draw();

    linkColor = palette.pop();
    $downloadFront.css('color', linkColor);
    $downloadBack.css('color', linkColor);

    $('#front').append($front);
    $('#back').append($back);

    $favicon
        .attr('rel', 'shortcut icon')
        .attr('href', torpeIcon.getImageDataURI());
    $('head').append($favicon);
});