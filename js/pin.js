'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var pinsContainer = document.querySelector('.map__pins');

  var getPinElement = function (pin) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', pin.offer.title);

    pinElement.addEventListener('click', function () {
      var advertisementCard = document.querySelector('.map__card');

      if (advertisementCard) {
        window.map.map.removeChild(advertisementCard);
      }
      window.map.map.appendChild(window.card.renderCard(pin));
    });
    return pinElement;
  };

  var renderPins = function (serverDataArr) {
    serverDataArr.forEach(function (pin) {
      pinsContainer.appendChild(getPinElement(pin));
    });
  }

  var onLoadSuccessHandler = function (serverDataArr) {
    window.offers = serverDataArr;
    window.pin.renderPins(window.filters.filterAll(window.offers));
  };
  window.pin = {
    getPinElement: getPinElement,
    renderPins: renderPins,
    onLoadSuccessHandler: onLoadSuccessHandler
  };
})();
