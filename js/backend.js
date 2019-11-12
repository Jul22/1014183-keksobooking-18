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

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorText = errorTemplate.querySelector('p');
    var errorButton = errorElement.querySelector('.error__button');
    errorText.textContent = errorMessage;
    mainSection.appendChild(errorElement);

    mainSection.appendChild(errorElement);

    var onCloseErrorClick = function () {
      var error = mainSection.querySelector('.error');
      error.remove();

      errorButton.removeEventListener('click', onCloseErrorClick);
      mainSection.removeEventListener('click', onCloseErrorClick);
      document.removeEventListener('keydown', onCloseErrorEsc);
    };

    var onCloseErrorEsc = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        var error = mainSection.querySelector('.error');
        error.remove();
      }
      errorButton.removeEventListener('click', onCloseErrorClick);
      mainSection.removeEventListener('click', onCloseErrorClick);
      document.removeEventListener('keydown', onCloseErrorEsc);
    };

    errorButton.addEventListener('click', onCloseErrorClick);
    mainSection.addEventListener('click', onCloseErrorClick);
    document.addEventListener('keydown', onCloseErrorEsc);
  };


  var successMessageHandler = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    mainSection.appendChild(successElement);

    var successClose = function () {
      var message = mainSection.querySelector('.success');
      message.remove();
      mainSection.removeEventListener('click', successClose);
    };

    var onCloseSuccessEsc = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        var message = mainSection.querySelector('.success');
        message.remove();
      }
      document.removeEventListener('keydown', onCloseSuccessEsc);
    };

    mainSection.addEventListener('click', successClose);
    document.addEventListener('keydown', onCloseSuccessEsc);
  };

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler,
    successMessageHandler: successMessageHandler
  };
})();
