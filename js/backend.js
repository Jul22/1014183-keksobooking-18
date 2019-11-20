'use strict';
(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data'; // адрес загрузки данныя с сервера
  var SAVE_URL = 'https://js.dump.academy/keksobooking'; // загрузка данных на сервер
  var OK_STATUS = 200;
  var TIME_OUT = 10000;
  var mainSection = document.querySelector('main');

  var xhrSetup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIME_OUT;
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = xhrSetup(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = xhrSetup(onLoad, onError);
    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  var onLoadError = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorText = errorTemplate.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    errorText.textContent = 'Произошла ошибка';
    mainSection.appendChild(errorElement);

    var closeErrorMessage = function () {
      errorButton.addEventListener('click', function () {
        mainSection.appendChild(errorElement);
        mainSection.removeChild(errorElement);
        window.map.disActivatePage();
      });
      document.removeEventListener('keydown', onPopupEsc);
    };

    var onCloseErrorClick = function () {
      closeErrorMessage();
    };

    var onPopupEsc = function (evt) {
      window.util.isEscEvent(evt, closeErrorMessage);
    };

    window.data = [];

    errorButton.addEventListener('click', onCloseErrorClick);
    mainSection.addEventListener('click', onCloseErrorClick);
    document.addEventListener('keydown', onPopupEsc);
  };


  var showSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    mainSection.appendChild(successElement);

    var closeSuccessMessage = function () {
      mainSection.removeChild(successElement);
      mainSection.removeEventListener('click', onPopupSuccessClick);
      document.removeEventListener('keydown', onPopupSuccessEsc);
    };

    var onPopupSuccessClick = function () {
      closeSuccessMessage();
    };

    var onPopupSuccessEsc = function (evt) {
      window.util.isEscEvent(evt, closeSuccessMessage);
    };

    mainSection.addEventListener('click', onPopupSuccessClick);
    document.addEventListener('keydown', onPopupSuccessEsc);
  };

  window.backend = {
    load: load,
    save: save,
    onLoadError: onLoadError,
    showSuccessMessage: showSuccessMessage
  };
})();
