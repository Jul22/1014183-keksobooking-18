'use strict';

(function () {
  var adForm = window.map.adForm;
  var pinMain = window.map.pinMain;
  var PIN_WIDTH = window.util.PIN_WIDTH;
  var PIN_HEIGHT = window.util.PIN_HEIGHT;
  var TITLE_MINLENGTH = 30;
  var TITLE_MAXLENGTH = 100;
  var MAX_PRICE = 1000000;
  var ERROR_FIELD = '4px solid red';
  var priceInput = adForm.querySelector('#price');
  var titleInput = adForm.querySelector('#title');
  var roomsAmountSelector = adForm.querySelector('#room_number');
  var guestsAmountSelector = adForm.querySelector('#capacity');
  var houseType = adForm.querySelector('#type');
  var housingTypeMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  houseType.addEventListener('change', function (evt) {
    priceInput.value = '';
    priceInput.placeholder = housingTypeMinPrice[evt.target.value];
    priceInput.setAttribute('min', housingTypeMinPrice[evt.target.value]);
  });
  priceInput.setAttribute('max', MAX_PRICE);
  priceInput.setAttribute('min', 0);
  priceInput.setAttribute('required', '');

  var checkPrice = function (target) {
    if (housingTypeMinPrice[target.value] < target.min) {
      priceInput.setCustomValidity('Минимальное значение цены за ночь для данного типа жилья ' + target.min + ' рублей');
    }
  };
  checkPrice(priceInput);

  priceInput.addEventListener('invalid', function () {
    if (priceInput.validity.valueMissing) {
      priceInput.style.outline = ERROR_FIELD;
    }
  });


  //  Время прибытия
  var checkTime = adForm.querySelector('.ad-form__element--time');

  var onChangeTime = function (evt) {
    switch (evt.target.name) {
      case 'timein':
        adForm.timeout.value = evt.target.value;
        break;
      case 'timeout':
        adForm.timein.value = evt.target.value;
        break;
    }
  };

  checkTime.addEventListener('change', onChangeTime);

  titleInput.setAttribute('minlength', 'TITLE_MINLENGTH');
  titleInput.setAttribute('maxlength', 'TITLE_MAXLENGTH');
  titleInput.setAttribute('required', '');

  titleInput.addEventListener('change', function () {
    if (titleInput.value.length < TITLE_MINLENGTH) {
      titleInput.setCustomValidity('Заголовок должен содержать не менее 30 символов');
    } else if (titleInput.value.length > TITLE_MAXLENGTH) {
      titleInput.setCustomValidity('Заголовок не должен привышать ста символов');
    } else if (titleInput.missingValue) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.valueMissing) {
      titleInput.style.outline = ERROR_FIELD;
    }
  });

  // address
  var setAddress = function () {
    var addressInput = document.querySelector('input[name=address]');

    addressInput.setAttribute('value', (pinMain.offsetTop + Math.floor(PIN_WIDTH / 2)) + ', ' + (pinMain.offsetLeft + Math.floor(PIN_HEIGHT / 2)));
    addressInput.setAttribute('readonly', '');
  };

  setAddress();

  //  Function for validation amount of guests
  var getMatchInputsValidation = function () {
    var roomsSelectedValue = parseInt(roomsAmountSelector[roomsAmountSelector.selectedIndex].value, 10);
    var guestsOptions = guestsAmountSelector.options;
    var maxRoomsCount = 100;
    for (var i = 0; i < guestsOptions.length; i++) {
      var questsOptionValue = parseInt(guestsAmountSelector.options[i].value, 10);

      if (roomsSelectedValue === maxRoomsCount) {
        if (questsOptionValue !== 0) {
          guestsOptions[i].disabled = true;
        } else {
          guestsOptions[i].disabled = false;
          guestsOptions[i].selected = true;
        }
      } else {
        if (questsOptionValue > roomsSelectedValue || questsOptionValue === 0) {
          guestsOptions[i].disabled = true;
        } else {
          guestsOptions[i].disabled = false;
          guestsOptions[i].selected = true;
        }
      }
    }
  };

  getMatchInputsValidation();

  roomsAmountSelector.addEventListener('change', getMatchInputsValidation);

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), function () {
      window.map.disActivatePage();
      window.backend.showSuccessMessage();
    }, window.backend.onLoadError);
    evt.preventDefault();
  });

  adForm.addEventListener('reset', function (evt) {
    evt.preventDefault();
    window.map.disActivatePage();
  });
  window.form = {
    setAddress: setAddress,
    getMatchInputsValidation: getMatchInputsValidation,
    priceInput: priceInput,
    titleInput: titleInput
  };
})();
