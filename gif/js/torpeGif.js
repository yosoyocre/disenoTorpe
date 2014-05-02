/*global $, Torpe, GIF, URL */
$(function() {
    'use strict';

    var nFrames = 10,
        gif = new GIF({
        workers: nFrames,
        quality: 10
    }),
        i,
        torpeFrame,
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
        $favicon = $('<link />'),
        palette,
        linkColor,
        shadowColor;

    torpeIcon.draw();
    
    palette = torpeIcon.getPalette();
    linkColor = palette[3];
    shadowColor = palette[4];

    for (i = 0; i < nFrames; i = i + 1) {
        torpeFrame = new Torpe({
            palette: palette,
            width: 250,
            height: 250,
            elementSize: 200,
            margin: 25,
            minCombinedElements: 3,
            maxCombinedElements: 4,
            lineWidth: 20,
            thickLineWidth: 4,
            border: 0
        });

        torpeFrame.draw();

        gif.addFrame(torpeFrame.canvas.get(0), {delay: 150});
    }

    gif.on('finished', function(blob) {
        var url = URL.createObjectURL(blob);
        $('#torpeGIF').attr('src', url);
        $('#downloadGIF').attr('href', url);
    });

    gif.render();

    $favicon
        .attr('rel', 'shortcut icon')
        .attr('href', torpeIcon.getImageDataURI());
    $('head').append($favicon);

    $('.link').css({
        'color': linkColor,
    });
    $('.button').css({
        'background': linkColor,
        'box-shadow': '0px 1px 0px 0px ' + shadowColor
    });
    $('.page-title').css({
        'color': linkColor,
    });
});