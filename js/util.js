'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  window.util = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    debounce: debounce,
    isEscEvent: isEscEvent
  };
})();
