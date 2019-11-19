'use strict';

(function () {
  var offerTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var pinsContainer = document.querySelector('.map__pins');

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

  var renderCard = function (card) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var photosCollectionElement = cardElement.querySelector('.popup__photos');
    var photoElement = cardElement.querySelector('.popup__photo');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offerTypes[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + getRoomEnding(card.offer.rooms) + ' для ' + card.offer.guests + getGuestEnding(card.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    if (card.offer.features.length > 0) {
      var featuresElement = cardElement.querySelector('.popup__features');
      featuresElement.innerHTML = '';
      card.offer.features.forEach(function (item) {
        var newFeatureElement = document.createElement('li');
        newFeatureElement.classList.add('popup__feature');
        newFeatureElement.classList.add('popup__feature--' + item);
        featuresElement.append(newFeatureElement);
      });
    } else {
      cardElement.querySelector('.popup__features').remove();
    }

    if (card.offer.photos.length > 0) {
      photosCollectionElement.innerHTML = '';
      card.offer.photos.forEach(function (item, index) {
        var photoTemplate = photoElement.cloneNode(true);
        photosCollectionElement.append(photoTemplate);
        var allPhotosElement = cardElement.querySelectorAll('.popup__photo');
        var popupPhoto = allPhotosElement[index];
        popupPhoto.src = item;
      });
    } else {
      cardElement.querySelector('.popup__photos').remove();
    }


    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

    return cardElement;
  };

  var removeCard = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    var offerCard = document.querySelector('.map__card');
    if (offerCard) {
      offerCard.remove();
    }
  };

  var cardEscClickHandler = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  var closeCard = function () {
    removeCard();
    document.removeEventListener('keydown', cardEscClickHandler);
  };

  pinsContainer.addEventListener('click', function (clickEvt) {
    var target = clickEvt.target.closest('button');
    if (target !== null) {
      document.addEventListener('keydown', cardEscClickHandler);
      var closeCardBtn = document.querySelector('.popup__close');

      if (closeCardBtn) {
        closeCardBtn.addEventListener('click', closeCard);
        closeCardBtn.addEventListener('keydown', function (evt) {
          window.util.isEnterEvent(evt, closeCard);
        });
      }
    }
  });

  window.card = {
    removeCard: removeCard,
    renderCard: renderCard
  };
})();
