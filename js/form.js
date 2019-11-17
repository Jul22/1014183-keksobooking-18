'use strict';

(function () {
  var TITLE_MINLENGTH = 30;
  var TITLE_MAXLENGTH = 100;
  var MAX_ROOMS_AMOUNT = 100;
  var ERROR_FIELD = '4px solid red';
  var MAIN_PIN_SIZE = 62;
  var MAIN_PIN_TAIL = 22;
  var disabledPinHeight = MAIN_PIN_SIZE / 2;
  var activePinHeight = MAIN_PIN_SIZE + MAIN_PIN_TAIL;
  var housingTypeMinPrice = {
    BUNGALO: '0',
    FLAT: '1000',
    HOUSE: '5000',
    PALACE: '10000'
  };
  var adForm = window.map.adForm;
  var pinMain = window.map.pinMain;
  var priceInput = adForm.querySelector('#price');
  var titleInput = adForm.querySelector('#title');
  var roomsAmountSelector = adForm.querySelector('#room_number');
  var guestsAmountSelector = adForm.querySelector('#capacity');
  var houseType = adForm.querySelector('#type');

  priceInput.max = 1000000;
  priceInput.required = true;

  var getHousingTypeMinPrice = function () {
    var selectedHousingTypeValue = houseType.value.toUpperCase();
    priceInput.min = housingTypeMinPrice[selectedHousingTypeValue];
    priceInput.placeholder = housingTypeMinPrice[selectedHousingTypeValue];

  };

  getHousingTypeMinPrice();

  houseType.addEventListener('change', getHousingTypeMinPrice);

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

  titleInput.setAttribute('minlength', TITLE_MINLENGTH);
  titleInput.setAttribute('maxlength', TITLE_MAXLENGTH);
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
  var isPageActive;

  var setAddress = function () {
    var addressInput = document.querySelector('input[name=address]');

    var locationX = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2);
    var locationY = isPageActive ?
      Math.round(parseInt(pinMain.style.top, 10) + activePinHeight) :
      Math.round(parseInt(pinMain.offsetTop, 10) + disabledPinHeight);

    addressInput.value = '' + locationX + ',' + locationY;
    addressInput.setAttribute('readonly', '');
  };

  setAddress();

  //  Function for validation amount of guests
  var getMatchInputsValidation = function () {
    var roomsSelectedValue = parseInt(roomsAmountSelector[roomsAmountSelector.selectedIndex].value, 10);
    var guestsOptions = guestsAmountSelector.options;
    for (var i = 0; i < guestsOptions.length; i++) {
      var questsOptionValue = parseInt(guestsAmountSelector.options[i].value, 10);

      if (roomsSelectedValue === MAX_ROOMS_AMOUNT) {
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

  var onAdFormSubmit = function (evt) {
    window.backend.save(new FormData(adForm), function () {
      window.map.disActivatePage();
      window.backend.showSuccessMessage();
    }, window.backend.onLoadError);
    evt.preventDefault();
  };

  adForm.addEventListener('submit', onAdFormSubmit);

  adForm.addEventListener('reset', function (evt) {
    evt.preventDefault();
    window.map.disActivatePage();
  });
  window.form = {
    setAddress: setAddress,
    getMatchInputsValidation: getMatchInputsValidation,
    priceInput: priceInput,
    titleInput: titleInput,
    isPageActive: isPageActive,
  };
})();
