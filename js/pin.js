'use strict';

(function () {
  var getPinElement = function (obj) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = obj.location.x - window.util.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = obj.location.y - window.util.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').setAttribute('src', obj.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', obj.offer.title);

    pinElement.addEventListener('click', function () {
      var advertisementCard = document.querySelector('.map__card');

      if (advertisementCard) {
        window.map.map.removeChild(advertisementCard);
      }
      window.map.map.appendChild(window.card.renderCard(obj));
    });
    return pinElement;
  };
  window.pin = {
    getPinElement: getPinElement
  };
})();
