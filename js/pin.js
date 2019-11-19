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
    pinElement.setAttribute('data-id', pin.id);

    return pinElement;
  };

  var ifPinActive = function () {
    var activePin = document.querySelector('.map__pin--active');
    return activePin ? activePin : false;
  };

  var addCard = function (card) {
    return pinsContainer.parentNode.insertBefore(card, pinsContainer.nextSibling);
  };

  var renderPins = function (arr) {
    window.map.removePins();
    var fragment = document.createDocumentFragment();

    arr.forEach(function (item) {
      var pin = getPinElement(item);

      pin.addEventListener('click', function () {
        var card = document.querySelector('.map__card');
        var activePin = ifPinActive();
        if (activePin) {
          activePin.classList.remove('map__pin--active');
        }
        pin.classList.add('map__pin--active');
        if (card) {
          card.remove();
        }
        card = addCard(window.card.renderCard(item, function () {
          pin.classList.remove('map__pin--active');
        }));
      });

      fragment.appendChild(pin);
    });

    pinsContainer.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
    getPinElement: getPinElement
  };
})();
