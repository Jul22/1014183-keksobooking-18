'use strict';

(function () {
  var MAIN_PIN_POSITION_Y_MIN = 130;
  var MAIN_PIN_POSITION_Y_MAX = 630;
  var MAIN_PIN_POSITION_X_MIN = 0;
  var MAIN_PIN_POSITION_X_MAX = 1200;
  var MAIN_PIN_SIZE = 62;
  var MAIN_PIN_TAIL = 22;
  var PINS_AMOUNT = 8;
  var ENTER_KEYCODE = window.util.ENTER_KEYCODE;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var offers = window.data.offers;

  // Moving Main Pin
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    activatePage();

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
      if ((endCoords.x >= MAIN_PIN_POSITION_X_MIN) && (endCoords.x <= MAIN_PIN_POSITION_X_MAX - MAIN_PIN_SIZE)) {
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }
      if ((endCoords.y >= MAIN_PIN_POSITION_Y_MIN - MAIN_PIN_TAIL) && (endCoords.y <= MAIN_PIN_POSITION_Y_MAX - MAIN_PIN_TAIL)) {
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

  pinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePage();
    }
  });

  var fieldset = adForm.querySelectorAll('fieldset');

  var disableFieldset = function (obj) {
    for (var i = 0; i < obj.length; i++) {
      obj[i].setAttribute('disabled', 'disabled');
    }
  };

  var resetDisable = function (obj) {
    for (var j = 0; j < obj.length; j++) {
      obj[j].removeAttribute('disabled', 'disabled');
    }
  };

  var deactivatePage = function () {
    adForm.classList.add('ad-form--disabled');
    disableFieldset(fieldset);
  };

  deactivatePage();

  var insertPinsInMap = function (pins) {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');
    for (var i = 0; i < pins; i++) {
      fragment.appendChild(window.pin.getPinElement(offers[i]));
    }
    mapPins.appendChild(fragment);
    return fragment;
  };


  var activatePage = function () {
    resetDisable(fieldset);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    insertPinsInMap(PINS_AMOUNT);
  };

  window.map = {
    map: map,
    adForm: adForm,
    pinMain: pinMain
  };
})();
