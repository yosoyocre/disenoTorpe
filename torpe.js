/*global $:false */

var Torpe = function (userOptions) {
    'use strict';

    var self = this,
        canvas,
        context,
        shapes = [],
        palettes = [];

    function init() {
        var shapesObject,
            palettesObject,
            basicOperations,
            s,
            p;

        basicOperations = {
            drawCenteredCircle: function (radius) {
                context.arc(self.options.elementSize / 2, self.options.elementSize / 2, radius, 0, Math.PI * 2, true);
            },
            centerRotation: function (angle, scale) {
                context.translate(self.options.elementSize / 2, self.options.elementSize / 2);
                if (!!scale) {
                    context.scale(scale, scale);
                }
                context.rotate(angle);
                context.translate(-self.options.elementSize / 2, -self.options.elementSize / 2);
            }
        };

        shapesObject = {
            dot: function () {
                context.beginPath();
                basicOperations.drawCenteredCircle(self.options.elementSize / 10);
                context.closePath();
                context.fill();
            },
            mediumCircumference: function () {
                context.beginPath();
                basicOperations.drawCenteredCircle(self.options.elementSize / 4);
                context.closePath();
                context.stroke();
            },
            bigCircumference: function () {
                context.beginPath();
                basicOperations.drawCenteredCircle(self.options.elementSize / 2.7);
                context.closePath();
                context.stroke();
            },
            bigRing: function () {
                context.save();
                context.lineWidth = self.options.lineWidth * self.options.thickLineWidth;
                shapesObject.bigCircumference();
                context.restore();
            },
            square: function () {
                context.strokeRect(0, 0, self.options.elementSize, self.options.elementSize);
            },
            innerSquare: function () {
                context.beginPath();
                context.moveTo(self.options.elementSize / 2, 0);
                context.lineTo(self.options.elementSize, self.options.elementSize / 2);
                context.lineTo(self.options.elementSize / 2, self.options.elementSize);
                context.lineTo(0, self.options.elementSize / 2);
                context.lineTo(self.options.elementSize / 2, 0);
                context.lineTo(self.options.elementSize, self.options.elementSize / 2); //needed in order to close the square
                context.stroke();
                context.closePath();
            },
            lightCross: function () {
                context.beginPath();
                context.moveTo(self.options.elementSize / 2, 0);
                context.lineTo(self.options.elementSize / 2, self.options.elementSize);
                context.moveTo(0, self.options.elementSize / 2);
                context.lineTo(self.options.elementSize, self.options.elementSize / 2);
                context.stroke();
                context.closePath();
            },
            thickCross: function () {
                context.save();
                context.lineWidth = self.options.lineWidth * self.options.thickLineWidth;
                shapesObject.lightCross();
                context.restore();
            },
            noCenterCross: function () {
                context.beginPath();
                context.moveTo(self.options.elementSize / 2, 0);
                context.lineTo(self.options.elementSize / 2, self.options.elementSize / 4);
                context.moveTo(self.options.elementSize / 2, 3 * self.options.elementSize / 4);
                context.lineTo(self.options.elementSize / 2, self.options.elementSize);
                context.moveTo(0, self.options.elementSize / 2);
                context.lineTo(self.options.elementSize / 4, self.options.elementSize / 2);
                context.moveTo(3 * self.options.elementSize / 4, self.options.elementSize / 2);
                context.lineTo(self.options.elementSize, self.options.elementSize / 2);
                context.stroke();
                context.closePath();
            },
            lightX: function () {
                context.save();
                basicOperations.centerRotation(Math.PI / 4);
                shapesObject.lightCross();
                context.restore();
            },
            thickX: function () {
                context.save();
                context.lineWidth = self.options.lineWidth * self.options.thickLineWidth;
                shapesObject.lightX();
                context.restore();
            },
            noCenterX: function () {
                context.save();
                basicOperations.centerRotation(Math.PI / 4);
                shapesObject.noCenterCross();
                context.restore();
            },
            crossShadow: function () {
                context.save();
                context.beginPath();
                context.moveTo(0, self.options.elementSize / 4);
                context.lineTo(self.options.elementSize / 4, self.options.elementSize / 4);
                context.lineTo(self.options.elementSize / 4, 0);
                context.moveTo(3 * self.options.elementSize / 4, 0);
                context.lineTo(3 * self.options.elementSize / 4, self.options.elementSize / 4);
                context.lineTo(self.options.elementSize, self.options.elementSize / 4);
                context.moveTo(self.options.elementSize, 3 * self.options.elementSize / 4);
                context.lineTo(3 * self.options.elementSize / 4, 3 * self.options.elementSize / 4);
                context.lineTo(3 * self.options.elementSize / 4, self.options.elementSize);
                context.moveTo(0, 3 * self.options.elementSize / 4);
                context.lineTo(self.options.elementSize / 4, 3 * self.options.elementSize / 4);
                context.lineTo(self.options.elementSize / 4, self.options.elementSize);
                context.stroke();
                context.closePath();
                context.restore();
            }
        };

        palettesObject = {
            randomColorScale: (function () {
                var baseColor = Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255);

                return [
                    "rgba(" + baseColor + ", 0.2)",
                    "rgba(" + baseColor + ", 0.35)",
                    "rgba(" + baseColor + ", 0.5)",
                    "rgba(" + baseColor + ", 0.65)",
                    "rgba(" + baseColor + ", 0.8)"
                ];
            }())
        };

        for (s in shapesObject) {
            if (shapesObject.hasOwnProperty(s)) {
                shapes.push(shapesObject[s]);
            }
        }

        for (p in palettesObject) {
            if (palettesObject.hasOwnProperty(p)) {
                palettes.push(palettesObject[p]);
            }
        }
    }

    self.getPalette = function () {
        return self.options.palette;
    };

    self.draw = function () {

        if (self.options.background !== 'none') {
            context.fillStyle = self.options.background; // set canvas background color
            context.fillRect(0, 0, self.options.width, self.options.height);
        }

        if (self.options.border) {
            context.lineWidth = self.options.border;
            context.strokeRect(0, 0, self.options.width, self.options.height);
        }

        context.lineWidth = self.options.lineWidth;

        context.save();

        context.translate(self.options.margin, self.options.margin);
        context.save();

        var color,
            shape,
            elementsInRow = Math.floor(self.options.width / (self.options.elementSize + self.options.margin * 2)),
            elementsInColumn = Math.floor(self.options.height / (self.options.elementSize + self.options.margin * 2)),
            nElements = elementsInRow * elementsInColumn,
            iElement,
            nCombinedElements,
            iCE;

        function moveToNextElement(iElement) {
            var x = 0,
                y = 0;

            if (iElement % elementsInRow === 0) {
                context.restore();
                context.save();
                y = Math.ceil(iElement / elementsInRow) * (self.options.elementSize + self.options.margin * 2);
                x = 0;
            } else {
                x = self.options.elementSize + self.options.margin * 2;
            }

            context.translate(x, y);
        }

        if (self.options.palette === undefined) {
            self.options.palette = palettes[Math.floor(Math.random() * palettes.length)];
        }

        for (iElement = 1; iElement <= nElements; iElement = iElement + 1) {

            nCombinedElements = self.options.minCombinedElements +
                Math.floor(Math.random() * (self.options.maxCombinedElements - self.options.minCombinedElements));

            for (iCE = 0; iCE < nCombinedElements; iCE = iCE + 1) {
                color = self.options.palette[Math.floor(Math.random() * self.options.palette.length)];
                shape = shapes[Math.floor(Math.random() * shapes.length)];

                context.fillStyle = color;
                context.strokeStyle = color;
                shape();
            }
            moveToNextElement(iElement);
        }

        context.restore();
        context.restore();
    };

    self.drawImage = function (img, x, y) {
        context.drawImage(img, x, y);
    };

    self.writeText = function (text, x, y) {
        context.save();
        context.fillStyle = '#c8c8c8';
        context.font = "20px monospace";
        context.textAlign = 'right';
        context.fillText(text, x, y);
        context.restore();
    };

    self.getImageDataURI = function () {
        return canvas.toDataURL("image/png");
    };

    self.canvas = $('<canvas />');

    self.options = {
        width: 1400,
        height: 1400,
        elementSize: 140,
        background: '#FFF',
        margin: 70,
        minCombinedElements: 0,
        maxCombinedElements: 3,
        lineWidth: 13,
        thickLineWidth: 4,
        border: 1,
        palette: undefined
    };

    if (!!userOptions) {
        $.extend(self.options, userOptions);
    }

    init();

    canvas = self.canvas.get(0);

    canvas.width = self.options.width;
    canvas.height = self.options.height;

    context = canvas.getContext('2d');

};