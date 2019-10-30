'use strict';

(function () {
  var adForm = window.map.adForm;
  var pinMain = window.map.pinMain;
  var PIN_WIDTH = window.util.PIN_WIDTH;
  var PIN_HEIGHT = window.util.PIN_HEIGHT;
  var TITLE_MINLENGTH = 30;
  var TITLE_MAXLENGTH = 100;

  var housingTypeMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var houseType = adForm.querySelector('#type');
  houseType.addEventListener('change', function (evt) {
    var priceInput = adForm.querySelector('#price');
    priceInput.value = '';
    priceInput.placeholder = housingTypeMinPrice[evt.target.value];
    priceInput.setAttribute('min', housingTypeMinPrice[evt.target.value]);
  });
  var price = adForm.querySelector('#price');
  var MAX_PRICE = 1000000;

  price.setAttribute('max', MAX_PRICE);
  price.setAttribute('required', '');

  var checkPrice = function (target) {
    if (housingTypeMinPrice[target.value] < target.min) {
      price.setCustomValidity('Минимальное значение цены за ночь для данного типа жилья ' + target.min + ' рублей');
    }
  };
  checkPrice(price);


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

  var title = adForm.querySelector('#title');

  title.setAttribute('minlength', TITLE_MINLENGTH);
  title.setAttribute('maxlength', TITLE_MAXLENGTH);
  title.setAttribute('required', '');

  title.addEventListener('change', function () {
    if (title.value.length < TITLE_MINLENGTH) {
      title.setCustomValidity('Заголовок должен содержать не менее 30 символов');
    } else if (title.value.length > TITLE_MAXLENGTH) {
      title.setCustomValidity('Заголовок не должен привышать ста символов');
    } else if (title.missingValue) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
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
  var roomsAmountSelector = adForm.querySelector('#room_number'); // Селектор выбора колличества комнат
  var guestsAmountSelector = adForm.querySelector('#capacity'); // Селектор выбора колличества гостей

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
})();
