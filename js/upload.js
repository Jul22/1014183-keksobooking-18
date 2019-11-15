'use strict';

// Модуль загрузки изображений
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var APARTMENT_PHOTO_WIDTH = 70;
  var APARTMENT_PHOTO_HEIGHT = 70;
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__input');
  var photoPreview = document.querySelector('.ad-form__photo');

  var removeImagesFromForm = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
    photoPreview.textContent = '';
  };

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoFileChooser.addEventListener('change', function () {
    var photos = [];
    Array.from(photoFileChooser.files).forEach(function (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var photoElement = document.createElement('img');
          photoElement.style.height = APARTMENT_PHOTO_HEIGHT + 'px';
          photoElement.style.width = APARTMENT_PHOTO_WIDTH + 'px';
          photoElement.src = reader.result;
          photoElement.style.marginBottom = '10px';
          photoPreview.appendChild(photoElement);
          photos.push();
        });
        reader.readAsDataURL(file);
      }
    });
  });

  photoFileChooser.multiple = 'multiple';


  window.upload = {
    removeImagesFromForm: removeImagesFromForm
  };
})();
