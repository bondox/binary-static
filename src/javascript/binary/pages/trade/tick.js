/*
 * Tick object handles all the process/display related to tick streaming
 *
 * We request tick stream for particular underlying to update current spot
 *
 *
 * Usage:
 * use `Tick.detail` to populate this object
 *
 * then use
 *
 * `Tick.quote()` to get current spot quote
 * `Tick.id()` to get the unique for current stream
 * `Tick.epoch()` to get the tick epoch time
 * 'Tick.display()` to display current spot
 */
var Tick = (function () {
    'use strict';

    var quote = '',
        id = '',
        epoch = '',
        errorMessage = '';

    var details = function (data) {
        var tick = data['tick'] || '';
        errorMessage = '';

        if (tick) {
            if (tick['error']) {
                errorMessage = tick['error']['message'];
            } else {
                quote = tick['quote'];
                id = tick['id'];
                epoch = tick['epoch'];
            }
        }
    };

    var display = function () {
        var spotElement = document.getElementById('spot');
        var message = '';
        if (errorMessage) {
            message = errorMessage;
        } else {
            message = quote;
        }
        displayPriceMovement(spotElement, spotElement.textContent, message);
        spotElement.textContent = message;
    };

    return {
        details: details,
        display: display,
        quote: function () { return quote; },
        id: function () { return id; },
        epoch: function () { return epoch; },
        errorMessage: function () { return errorMessage; }
    };
})();
