'use strict';

(function () {
  var map = window.map.map;
  var renderCard = function (card) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photo').setAttribute('src', card.offer.photos);
    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      map.removeChild(cardElement);
    });

    return cardElement;
  };
  window.card = {
    renderCard: renderCard
  };
})();
