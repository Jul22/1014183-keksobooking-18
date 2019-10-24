'use strict';

(function () {
  var adForm = window.map.adForm;
  var pinMain = window.map.pinMain;
  var PIN_WIDTH = window.util.PIN_WIDTH;
  var PIN_HEIGHT = window.util.PIN_HEIGHT;
  var checkIn = adForm.querySelector('#timein');
  var checkOut = adForm.querySelector('#timeout');

  checkIn.addEventListener('change', function () {
    checkOut.value = checkIn.value;
  });
  checkOut.addEventListener('change', function () {
    checkIn.value = checkOut.value;
  });

  var title = adForm.querySelector('#title');

  var checkTitle = function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Минимальная длина заголовка 30 символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Максимальная длина заголовка 100 символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    }
  };

  title.addEventListener('change', checkTitle);

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
