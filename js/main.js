'use strict';
var AMOUNT_OFFER = 8;
var TITLES = ['Уютное гнездышко для молодоженов'];
var ADDRESSES = ['102, 0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3'];
var PRICES = 5200;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'];
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

// Generating random number
var generateRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var getRandomArray = function (arr) {
  var randomArr = [];
  var max = Math.floor(Math.random() * arr.length);
  for (var i = 0; i <= max; i++) {
    randomArr.push(arr[i]);
  }
  return randomArr;
};

var createOffersData = function (amount) {
  var transformTypeToString = function (type) {
    switch (type) {
      case 'palace': return 'Дворец';
      case 'flat': return 'Квартира';
      case 'bungalo': return 'Бунгало';
      case 'house': return 'Дом';
    }
    return type;
  };

  var offersArray = [];
  for (var i = 0; i <= amount; i++) {
    offersArray.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'
          },
          offer: {
            title: TITLES,
            address: ADDRESSES,
            type: transformTypeToString(TYPES[generateRandomNumber(0, TYPES.length - 1)]),
            rooms: generateRandomNumber(1, 3),
            guests: generateRandomNumber(1, 5),
            checkin: CHECKINS[generateRandomNumber(0, CHECKINS.length - 1)],
            checkout: CHECKOUTS[generateRandomNumber(0, CHECKOUTS.length)],
            price: PRICES,
            features: getRandomArray(FEATURES),
            description: DESCRIPTION,
            photos: PHOTOS[generateRandomNumber(0, PHOTOS.length - 1)]
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


// Function rendering pins
var insertPins = function (offers) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    mapPins.appendChild(fragment);
    fragment.appendChild(renderPin(offers[i]));
  }
};

// function for generating cards
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

  return cardElement;
};

var offers = createOffersData(AMOUNT_OFFER);
insertPins(offers);
var firstItemCardInArray = renderCard(offers[0]);


map.insertBefore(firstItemCardInArray, map.querySelector('.map__filters-container'));

