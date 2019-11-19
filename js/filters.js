'use strict';
(function () {
  var MAX_OFFERS_AMOUNT = 5;
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');
  var Price = {
    Value: {
      MIN: 10000,
      MAX: 50000
    },
    Type: {
      LOW: 'low',
      MIDDLE: 'middle',
      HIGH: 'high'
    }
  };

  var getHousingPrice = function (element) {
    var isPriceRequired;
    switch (housingPrice.value) {
      case Price.Type.LOW:
        isPriceRequired = element.offer.price < Price.Value.MIN;
        break;
      case Price.Type.MIDDLE:
        isPriceRequired = element.offer.price >= Price.Value.MIN && element.offer.price <= Price.Value.MAX;
        break;
      case Price.Type.HIGH:
        isPriceRequired = element.offer.price >= Price.Value.MAX;
        break;
      default:
        isPriceRequired = true;
    }
    return isPriceRequired;
  };

  var getHousingRooms = function (element) {
    return housingRooms.value === 'any' || element.offer.rooms === Number(housingRooms.value);
  };

  var getHousingType = function (element) {
    return housingType.value === 'any' || element.offer.type === housingType.value;
  };

  var getHousingGuests = function (element) {
    return housingGuests.value === 'any' || element.offer.guests === Number(housingGuests.value);
  };

  var getHousingFeatures = function (element) {
    return Array.from(housingFeatures.children)
      .filter(function (feature) {
        return feature.checked === true;
      })
      .map(function (item) {
        return item.value;
      })
      .every(function (feature) {
        return element.offer.features.includes(feature);
      });
  };

  var applyAll = function (data) {
    return data
      .filter(function (element) {
        return (
          getHousingType(element) &&
          getHousingPrice(element) &&
          getHousingRooms(element) &&
          getHousingGuests(element) &&
          getHousingFeatures(element)
        );
      })
      .slice(0, MAX_OFFERS_AMOUNT);
  };

  var filterFormChangeHandler = window.util.debounce(function () {
    window.map.removePins();
    window.card.removeCard();
    window.pin.renderPins(applyAll(window.data));
  });

  filterForm.addEventListener('change', filterFormChangeHandler);

  window.filters = {
    applyAll: applyAll
  };
})();
