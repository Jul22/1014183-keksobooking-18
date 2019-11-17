'use strict';
(function () {
  var MAIN_PIN_POSITION_X_MIN = 0;
  var MAIN_PIN_POSITION_X_MAX = 1200;
  var MAIN_PIN_SIZE = 62;
  var MAIN_PIN_TAIL = 22;
  var MAIN_PIN_POSITION_Y_MIN = 130 - MAIN_PIN_TAIL;
  var MAIN_PIN_POSITION_Y_MAX = 630 - MAIN_PIN_TAIL;
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');


  // Moving Main Pin
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    window.map.activatePage();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var endCoords = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };
      if ((endCoords.x >= MAIN_PIN_POSITION_X_MIN - MAIN_PIN_SIZE / 2) && (endCoords.x <= MAIN_PIN_POSITION_X_MAX - MAIN_PIN_SIZE / 2)) {
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }
      if ((endCoords.y >= MAIN_PIN_POSITION_Y_MIN) && (endCoords.y <= MAIN_PIN_POSITION_Y_MAX)) {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }
      window.form.setAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
