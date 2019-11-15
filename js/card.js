'use strict';

(function () {
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

  var removeCard = function () {
    var mapCardElement = document.querySelector('.map__card');
    if (mapCardElement) {
      mapCardElement.remove();
      document.removeEventListener('keydown', onPressEsc);
      document.removeEventListener('click', onPressCloseButton);
    }
  };

  var onPressCloseButton = function () {
    removeCard();
  };

  var onPressEsc = function (evt) {
    window.util.isEscEvent(evt, removeCard);
  };

  var renderCard = function (card) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var photosCollectionElement = cardElement.querySelector('.popup__photos');
    var photoElement = cardElement.querySelector('.popup__photo');
    var featuresElement = cardElement.querySelector('.popup__features');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offerTypes[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + getRoomEnding(card.offer.rooms) + ' для ' + card.offer.guests + getGuestEnding(card.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    featuresElement.innerHTML = '';
    card.offer.features.forEach(function (item) {
      var newFeatureElement = document.createElement('li');
      newFeatureElement.classList.add('popup__feature');
      newFeatureElement.classList.add('popup__feature--' + item);
      featuresElement.append(newFeatureElement);
    });

    photosCollectionElement.innerHTML = '';
    card.offer.photos.forEach(function (item, index) {
      var photoTemplate = photoElement.cloneNode(true);
      photosCollectionElement.append(photoTemplate);
      var allPhotosElement = cardElement.querySelectorAll('.popup__photo');
      var popupPhoto = allPhotosElement[index];
      popupPhoto.src = item;
    });
    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

    cardElement.querySelector('.popup__close').addEventListener('click', onPressCloseButton);
    document.addEventListener('keydown', onPressEsc);

    return cardElement;
  };
  window.card = {
    renderCard: renderCard,
    removeCard: removeCard
  };
})();
