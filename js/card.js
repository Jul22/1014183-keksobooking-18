'use strict';

(function () {
  var map = window.map.map;
  var offerTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var getRoomEnding = function (rooms) {
    if (rooms === 1) {
      return ' комната';
    }
    if (rooms >= 2 && rooms <= 4) {
      return ' комнаты';
    }

    return ' комнат';
  };

  var getGuestEnding = function (guests) {
    if (guests === 1) {
      return ' гостя';
    }
    return ' гостей';
  };
  var getFeatureList = function (features) {
    var liElementString = '';

    for (var i = 0; i < features.length; i++) {
      liElementString += '<li class="popup__feature popup__feature--' + features[i] + '"></li>';
    }
    return liElementString;
  };

  var getPhotoList = function (photos) {
    var imgElementString = '';

    for (var i = 0; i < photos.length; i++) {
      imgElementString += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    return imgElementString;
  };

  var renderCard = function (card) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offerTypes[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + getRoomEnding(card.offer.rooms) + ' для ' + card.offer.guests + getGuestEnding(card.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = getFeatureList(card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = getPhotoList(card.offer.photos);
    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      map.removeChild(cardElement);
    });

    cardElement.querySelector('.popup__close').addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        map.removeChild(cardElement);
      }
    });
    return cardElement;
  };
  window.card = {
    renderCard: renderCard
  };
})();
