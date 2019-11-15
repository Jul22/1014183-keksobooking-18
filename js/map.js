'use strict';

(function () {
  var ENTER_KEYCODE = window.util.ENTER_KEYCODE;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var startPositionX = pinMain.offsetLeft;
  var startPositionY = pinMain.offsetTop;
  var mapFilterCheckboxes = adForm.querySelectorAll('.feature__checkbox');
  var mapForm = document.querySelector('.map__filters');
  var textareaElement = adForm.querySelector('#description');
  var houseType = adForm.querySelector('#type');

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
    window.backend.load(window.pin.onLoadSuccessHandler, window.backend.onLoadError);
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

  var resetCheckboxes = function (checkboxes) {
    checkboxes.forEach(function (item) {
      if (item.checked === true) {
        item.checked = false;
      }
    });
  };
  var disActivatePage = function () {
    toggleFieldSets(true);
    resetCheckboxes(mapFilterCheckboxes);
    adForm.reset();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.card.removeCard();
    deletePins();
    setStartCoords();
    window.form.setAddress();
    window.upload.removeImagesFromForm();
    window.form.titleInput.value = '';
    window.form.priceInput.value = '';
    textareaElement.value = '';
    window.form.titleInput.setCustomValidity('', window.form.titleInput.style.outline = 'none');
    window.form.priceInput.setCustomValidity('', window.form.priceInput.style.outline = 'none');
    houseType.value = 'flat';
    mapForm.reset();
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
