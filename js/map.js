'use strict';

(function () {
  var MAX_OFFERS_AMOUNT = 5;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var adFormAddress = adForm.querySelector('#address');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var filterForm = document.querySelector('.map__filters');
  var filterFormElements = filterForm.querySelectorAll('.map__filter');
  var featuresFilterElement = filterForm.querySelector('.map__features');

  var toggleFormState = function (formElements, isDisabled) {
    Array.from(formElements).forEach(function (item) {
      item.disabled = isDisabled;
    });
  };
  var onLoadSuccess = function (response) {
    window.data = response.map(function (item) {
      return Object.assign(item);
    });
    window.pin.renderPins(window.data.slice(0, MAX_OFFERS_AMOUNT));
  };

  var activatePage = function () {
    if (!window.util.isPageActive) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      toggleFormState(adFormElements, false);
      toggleFormState(filterFormElements, false);
      adFormHeader.disabled = false;
      featuresFilterElement.disabled = false;

      window.backend.load(onLoadSuccess, window.backend.onLoadError);
      window.util.isPageActive = true;
      adFormAddress.value = window.moveMainPin.getPinLocation();
    }
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      var pinsContainer = document.querySelector('.map__pins');
      pinsContainer.removeChild(pin);
    });
  };


  var disActivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    removePins();
    filterForm.reset();
    adForm.reset();
    toggleFormState(adFormElements, true);
    toggleFormState(filterFormElements, true);

    adFormHeader.disabled = true;
    featuresFilterElement.disabled = true;
    window.moveMainPin.setStartCoords();
    window.util.isPageActive = false;
    adFormAddress.value = window.moveMainPin.getPinLocation();
  };
  disActivatePage();

  window.map = {
    activatePage: activatePage,
    disActivatePage: disActivatePage,
    removePins: removePins,
  };
})();
