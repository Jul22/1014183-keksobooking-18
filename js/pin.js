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
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      pins.forEach(function (item) {
        item.classList.remove('map__pin--active');
      });
      pinElement.classList.add('map__pin--active');
      window.card.removeCard();
      window.map.map.appendChild(window.card.renderCard(pin));
    });
    return pinElement;
  };
  var renderPins = function (serverDataArr) {
    serverDataArr.forEach(function (pin) {
      pinsContainer.appendChild(getPinElement(pin));
    });
  };

  var onLoadSuccessHandler = function (serverDataArr) {
    window.offers = serverDataArr;
    window.pin.renderPins(window.filters.applyAll(window.offers));
  };
  window.pin = {
    getPinElement: getPinElement,
    renderPins: renderPins,
    onLoadSuccessHandler: onLoadSuccessHandler
  };
})();
