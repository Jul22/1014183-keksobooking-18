'use strict';

(function () {
  var ENTER_KEYCODE = window.util.ENTER_KEYCODE;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var startPositionX = pinMain.offsetLeft;
  var startPositionY = pinMain.offsetTop;

  pinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePage();
    }
  });
  var toggleFieldSets = function (fieldsetsDisabled) {
    document.querySelectorAll('fieldset').forEach(function (fieldset) {
      fieldset.disabled = fieldsetsDisabled;
    });
  };
  toggleFieldSets(true);

  var activatePage = function () {
    toggleFieldSets(false);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.backend.load(window.pin.onLoadSuccessHandler, window.backend.errorHandler);
    window.form.setAddress();
  };

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      var pinsContainer = document.querySelector('.map__pins');
      pinsContainer.removeChild(pin);
    });
  };

  var setStartCoords = function () {
    pinMain.style.left = startPositionX + 'px';
    pinMain.style.top = startPositionY + 'px';
  };

  var disActivatePage = function () {
    toggleFieldSets(true);
    adForm.reset();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.card.removeCard();
    deletePins();
    setStartCoords();
    window.form.setAddress();
    var titleElement = adForm.querySelector('#title');
    var priceElement = adForm.querySelector('#price');
    var textareaElement = adForm.querySelector('#description');

    titleElement.value = '';
    priceElement.value = '';
    textareaElement.value = '';
  };
  window.map = {
    map: map,
    adForm: adForm,
    pinMain: pinMain,
    activatePage: activatePage,
    disActivatePage: disActivatePage,
    deletePins: deletePins
  };
})();
