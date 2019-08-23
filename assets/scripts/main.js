/*
 * imageGallery
 *
 * Description: using this function to load local json data,
 * render data to to the page, and add event listeners for user
 * interaction.
 *
 * param
 * return
 */
var thumbnailGallery = (function() {

  var init = function(filePath) {
    var data;
    getImageData(filePath, displayThumbnails)
    return data;
  };

  var getImageData = function(filePath, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType('application/json');

    request.open('GET', filePath, true);
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == '200') {
        callback(this.responseText);
      }
    }
    request.send(null);
  };

  var createImgElm = function(src, alt, title) {
    var img = document.createElement('img');
    img.src = src;
    img.setAttribute('width', '100%');
    img.setAttribute('height', '98%');
    if (alt != null) {
      img.alt = alt;
    }
    if (title != null) {
      img.title = title;
    }
    return img;
  };

  var createListElm = function(src) {
    var li = document.createElement('li');
    li.setAttribute('data-original', src);
    return li;
  };

  var toggleModal = function() {
    var modal = document.querySelector('.modal');
    modal.classList.toggle('show-modal');
  }

  var populateModalImage = function(src) {
    var modalContent = document.querySelector('.modal-content');
    //remove the previous image
    var fullImg = modalContent.getElementsByTagName('img');
    if (fullImg.length > 0) {
      fullImg = fullImg[0];
      modalContent.removeChild(fullImg);
    }
    modalContent.appendChild(createImgElm(src, '', ''));
  }

  function displayThumbnails(imageJson) {
    data = JSON.parse(imageJson);
    // console.table(data);
    var items = data.dogs,
      img, li,
      closeBtn = document.querySelector('.close-button'),
      thumbnailsElm = document.getElementById('thumbnails');

    for (var i = 0; i < items.length; i++) {
      img = createImgElm(items[i].thumbnail, '', '');
      li = createListElm(items[i].image);
      li.appendChild(img);
      thumbnailsElm.appendChild(li);
    }

    thumbnailsElm.addEventListener('click', function(event) {
      //get the full size image url and add to the modal content
      var fullsizeImageSrc;
      if (event.target) {
        fullsizeImageSrc = event.target.parentElement.getAttribute('data-original');
      }
      populateModalImage(fullsizeImageSrc);
      toggleModal();
    });
    closeBtn.addEventListener('click', function(e) {
      console.log("close");
      toggleModal();
    });
  };

  var sayhello = function() {
    var msg = ['(U •́ .̫ •̀ U) woof', 'woof (υ◉ω◉υ) woof (υ◉ω◉υ) woof', 'o(^^ )o——–⊆^U)┬┬~… yay', 'o(･ω･｡)o—∈･^ミ┬┬~ summer', '໒( ◉ ᴥ ◉ )७ hi'];
    console.log(msg[Math.floor(Math.random() * msg.length)]);
  };

  return {
    sayhello: sayhello,
    init: init
  }
}());

thumbnailGallery.sayhello();
thumbnailGallery.init('assets/data/dogs-compressed.json');