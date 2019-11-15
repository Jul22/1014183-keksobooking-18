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

  var onFileUpload = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (imageType) {
      return fileName.endsWith(imageType);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var removeImagesFromForm = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
    photoPreview.textContent = '';
  };

  avatarFileChooser.addEventListener('change', function () {
    onFileUpload(avatarFileChooser, avatarPreview);
  });

  photoFileChooser.addEventListener('change', function () {
    var photoElement = document.createElement('img');
    photoElement.style.height = APARTMENT_PHOTO_HEIGHT + 'px';
    photoElement.style.width = APARTMENT_PHOTO_WIDTH + 'px';
    photoElement.style.marginBottom = '10px';
    photoPreview.appendChild(photoElement);

    onFileUpload(photoFileChooser, photoElement);
  });

  window.upload = {
    removeImagesFromForm: removeImagesFromForm
  };
})();
