'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var MAX_OFFERS_AMOUNT = 5;
  var getHousingType = function (element) {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  };
  var filterAll = function (data) {
    return data
      .filter(function (element) {
        return getHousingType(element);
      })
      .slice(0, MAX_OFFERS_AMOUNT);
  };
  filterForm.addEventListener('change', function () {
    window.map.deletePins();
    window.card.removeCard();
    window.pin.renderPins(window.filters.filterAll(window.offers));
  });
  window.filters = {
    filterAll: filterAll
  };
})();
