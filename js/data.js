'use strict';

(function () {
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
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = document.querySelector('.map__pins').offsetWidth;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var getRandomNumber = window.util.getRandomNumber;
  var getRandomArray = window.util.getRandomArray;
  var transformTypeToString = function (type) {
    switch (type) {
      case 'palace':
        type = 'Дворец';
        break;
      case 'flat':
        type = 'Квартира';
        break;
      case 'bungalo':
        type = 'Бунгало';
        break;
      case 'house':
        type = 'Дом';
        break;
    }
    return type;
  };

  var createOffersData = function () {
    var offersArray = [];

    for (var i = 0; i <= AMOUNT_OFFER; i++) {
      offersArray.push(
          {
            author: {
              avatar: 'img/avatars/user0' + (i + 1) + '.png'
            },
            offer: {
              title: TITLES,
              address: ADDRESSES,
              type: transformTypeToString(TYPES[getRandomNumber(0, TYPES.length - 1)]),
              rooms: getRandomNumber(1, 3),
              guests: getRandomNumber(1, 5),
              checkin: CHECKINS[getRandomNumber(0, CHECKINS.length - 1)],
              checkout: CHECKOUTS[getRandomNumber(0, CHECKOUTS.length - 1)],
              price: PRICES,
              features: getRandomArray(FEATURES),
              description: DESCRIPTION,
              photos: PHOTOS[getRandomNumber(0, PHOTOS.length - 1)]
            },
            location: {
              x: getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
              y: getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
            }
          });
    }

    return offersArray;
  };
  var offers = createOffersData();
  window.data = {
    offers: offers
  };
})();
