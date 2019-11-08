'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var OK_STATUS = 200;
  var TIME_OUT = 10000;


  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT;
    xhr.open('GET', URL);
    xhr.send();
  };

  var errorHandler = function (errorMessage) {
    var mainSection = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorText = errorTemplate.querySelector('p');
    errorText.textContent = errorMessage;
    var errorElement = errorTemplate.cloneNode(true);
    mainSection.appendChild(errorElement);
  };

  window.backend = {
    load: load,
    errorHandler: errorHandler
  };
})();
