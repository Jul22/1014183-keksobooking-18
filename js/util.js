'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var ENTER_KEYCODE = 13;

  // Generating random number
  var getRandomNumber = function (min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  };

  var getRandomArray = function (arr) {
    var randomArr = [];
    var max = Math.floor(Math.random() * arr.length);
    for (var i = 0; i <= max; i++) {
      randomArr.push(arr[i]);
    }
    return randomArr;
  };

  window.util = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray
  };
})();
