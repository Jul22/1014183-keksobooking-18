'use strict';

(function () {
  var getPinElement = window.pin.getPinElement;
  var ENTER_KEYCODE = window.util.ENTER_KEYCODE;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var offers = window.data.offers;

  var renderPin = function () {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');
    for (var i = 0; i < offers.length; i++) {
      mapPins.appendChild(fragment);
      fragment.appendChild(getPinElement(offers[i]));
    }
  };

  pinMain.addEventListener('mousedown', function () {
    activatePage();
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

  var activatePage = function () {
    resetDisable(fieldset);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    renderPin();
  };

  window.map = {
    renderPin: renderPin,
    map: map,
    adForm: adForm,
    pinMain: pinMain
  };
})();
