'use strict';

(function () {
  var TITLE_MINLENGTH = 30;
  var TITLE_MAXLENGTH = 100;
  var MAX_ROOMS_AMOUNT = 100;
  var ERROR_FIELD = '4px solid red';
  var housingTypeMinPrice = {
    BUNGALO: '0',
    FLAT: '1000',
    HOUSE: '5000',
    PALACE: '10000'
  };
  var adForm = document.querySelector('.ad-form');
  var priceInput = adForm.querySelector('#price');
  var titleInput = adForm.querySelector('#title');
  var roomsAmountSelector = adForm.querySelector('#room_number');
  var guestsAmountSelector = adForm.querySelector('#capacity');
  var houseType = adForm.querySelector('#type');
  var adFormAddress = document.querySelector('#address');


  priceInput.max = 1000000;
  priceInput.required = true;
  adFormAddress.setAttribute('readonly', '');

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
      window.card.removeCard();
      window.map.removePins();
      resetPage();
      window.map.disActivatePage();
      window.backend.showSuccessMessage();
    }, window.backend.onLoadError);
    evt.preventDefault();
  };

  adForm.addEventListener('submit', onAdFormSubmit);

  var resetPage = function () {
    titleInput.setCustomValidity('', window.form.titleInput.style.outline = 'none');
    priceInput.setCustomValidity('', window.form.priceInput.style.outline = 'none');
    houseType.value = 'flat';
    priceInput.value = '';
    window.upload.removeImagesFromForm();
  };


  adForm.addEventListener('reset', function () {
    window.map.disActivatePage();
    resetPage();
    window.card.removeCard();
  });

  window.form = {
    getMatchInputsValidation: getMatchInputsValidation,
    priceInput: priceInput,
    titleInput: titleInput
  };
})();
