/*
 * thumbnailGalleryViewer
 *
 * Description: using this function to load local json data,
 * render image JSON data as a thumbnail gallery, add user
 * interaction like clicking the thumbnail to view its full size version.
 *
 * @param string - filepath for JSON data
 */
var thumbnailGalleryViewer = (function() {

  var modal = document.querySelector('.modal'),
    modalContent = document.querySelector('.modal-content'),
    currentChuck = 0;

  var init = function(filePath) {
    // getImageData(filePath, displayImages)
    getImageData(filePath, chunkData);

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

  var chunkData = function(imageJson) {
    var data = JSON.parse(imageJson),
      count = 9,
      dataChunk;

    data = data.dogs;

    var numberOfChunks = Math.ceil(data.length / count);
    startIndex = currentChuck * count;

    if (currentChuck <= numberOfChunks) {
      dataChunk = data.slice(startIndex, startIndex + count);
      currentChuck++;
    }
    console.log(dataChunk);
    displayImages(dataChunk);
  };

  var createImgElm = function(src, alt, title) {
    var img = document.createElement('img');
    img.src = src;

    img.setAttribute('width', '100%');
    img.setAttribute('height', '100%');
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

  var createModalContent = function(src) {
    var wh = modalContentSize(src)
    var modalContent = document.createElement('div');
    modalContent.setAttribute('width', wh.width);
    modalContent.setAttribute('height', wh.height);

    var closeBtn = document.createElement('button');
    closeBtn.classList.add('close-button');
    closeBtn.innerHTML = '&times;';

    var newImg = createImgElm(src, '', '');

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(newImg);

  };

  var toggleModal = function() {
    modal.classList.toggle('show-modal');
  };

  var populateModalImage = function(src) {
    var fullImg = modalContent.getElementsByTagName('img');
    if (fullImg.length > 0) {
      fullImg = fullImg[0];
      modalContent.removeChild(fullImg);
    }
    var newImg = createImgElm(src, '', '');
    modalContent.appendChild(newImg);
    newImg.addEventListener('load', function(e) {
      adjustModalContentSize(newImg);
    });
  };

  var adjustModalContentSize = function(img) {
    //Aspect ratio
    var ratio = img.naturalHeight / img.naturalWidth;
  };

  var displayImages = function(data) {
    // data = JSON.parse(imageJson);
    // var items = data.dogs,
    var items = data,
      img, li,
      closeBtn = document.querySelector('.close-button'),
      thumbnailsElm = document.querySelector('.thumbnails');

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      img = createImgElm(item.thumbnail, item.alt, item.title);
      li = createListElm(item.image);
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

thumbnailGalleryViewer.sayhello();
thumbnailGalleryViewer.init('assets/data/dogs-compressed.json');