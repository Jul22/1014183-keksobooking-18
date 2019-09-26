'use strict';
var AMOUNT_OFFER = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = document.querySelector('.map__pins').offsetWidth;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

// Activating map
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Adding container for pins
var mapPins = document.querySelector('.map__pins');

// Adding some pins
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Создаём генератор случайного числа
var generateRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};


var createOffersData = function (amount) {
  var offersArray = [];
  for (var i = 0; i <= amount; i++) {
    offersArray.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'
          },
          offer: {
            type: TYPES[generateRandomNumber(0, TYPES.length)],
            checkin: CHECKINS[generateRandomNumber(0, CHECKINS.length)],
            checkout: CHECKOUTS[generateRandomNumber(0, CHECKOUTS.length)],
            features: generateRandomNumber(FEATURES),
            description: DESCRIPTION,
            photos: generateRandomNumber(PHOTOS)
          },
          location: {
            x: generateRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
            y: generateRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
          }
        });
  }

  return offersArray;
};

var renderPin = function (obj) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = obj.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').setAttribute('src', obj.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', obj.offer.title);

  return pinElement;
};

var offers = createOffersData(AMOUNT_OFFER);

var renderOffers = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    mapPins.appendChild(fragment);
    fragment.appendChild(renderPin(offers[i]));
  }

};

renderOffers();


