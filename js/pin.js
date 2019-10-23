'use strict';

(function () {
  var getPinElement = function (obj) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = obj.location.x - window.util.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = obj.location.y - window.util.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').setAttribute('src', obj.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', obj.offer.title);
    var onPinClick = function () {
      var mapPins = document.querySelectorAll('.map__pin');
      var mapCard = document.querySelector('.map__card');
      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].classList.remove('map__pin--active');
      }
      pinElement.classList.add('map__pin--active');
      if (mapCard === null) {
        window.map.map.appendChild(window.card.renderCard(obj));
      } else {
        mapCard.remove();
        window.map.map.appendChild(window.card.renderCard(obj));
      }
    };
    pinElement.addEventListener('click', function () {
      onPinClick();
    });
    return pinElement;
  };
  window.pin = {
    getPinElement: getPinElement
  };
})();
