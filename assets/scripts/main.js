/*
 * thumbnailGalleryViewer
 *
 * Description: use this function to load json data,
 * render image JSON data as a thumbnail gallery, add user
 * interaction like clicking the thumbnail to view its full size version.
 *
 * @param string - filepath for JSON data
 */
var thumbnailGalleryViewer = (function() {

  var modal = document.querySelector('.modal'),
    modalContent = document.querySelector('.modal-content'),
    loadBtn = document.querySelector('.load-button'),
    closeBtn = document.querySelector('.close-button'),
    thumbnailsElm = document.getElementsByClassName('thumbnails')[0],
    currentChuck = 0,
    numberOfChunks,
    data;

  /**
   * Starting point
   * @param  {String} filepath The path to the JSON file
   */
  var init = function(filePath) {
    getImageData(filePath, chunkData);
    addOnClickHandlers();
  };
  /**
   * Make a HTTP request to retrieve JSON data
   * @param  {String} url The url of the JSON data
   */
  var getImageData = function(url, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType('application/json');

    request.open('GET', url, true);
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == '200') {
        callback(this.responseText);
      }
    }
    request.send(null);
  };
  /**
   * Add event handlers for clicking events
   */
  var addOnClickHandlers = function() {
    thumbnailsElm.addEventListener('click', function(event) {
      //get the full size image url and add to the modal content
      var fullsizeImageSrc;
      if (event.target) {
        fullsizeImageSrc = event.target.parentElement.getAttribute('data-original');
      }
      populateModalImage(fullsizeImageSrc);
      toggleModal();
    });

    loadBtn.addEventListener('click', function(e) {
      chunkData(data);
    });

    closeBtn.addEventListener('click', function(e) {
      toggleModal();
    });
  };
  /**
   * Breaks the Total JSON data into 9 item at a time chunks
   * @param  {JSON} imageJson JSON data
   */
  var chunkData = function(imageJson) {
    if (data === undefined) {
      data = JSON.parse(imageJson);
      data = data.dogs;
    }
    var count = 9,
      dataChunk;

    numberOfChunks = Math.ceil(data.length / count);
    startIndex = currentChuck * count;

    if (currentChuck < numberOfChunks) {
      dataChunk = data.slice(startIndex, startIndex + count);
      currentChuck++;
    } else {
      dataChunk = null;
    }
    displayImages(dataChunk);
  };
  /**
   * Create a img element with alt and title attribute set
   * @param  {String} src The path of the image
   * @param  {String} alt A description of the image
   * @param  {String} title The name of the image
   * @return {Image Element} img A img element with alt and title attribute set
   */
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
  /**
   * Create a list element with a data-original attribute set to src
   * @param  {String} src The path for an image
   * @return {ListElement} li A list element with a data-original attribute set to src
   */
  var createListElm = function(src) {
    var li = document.createElement('li');
    li.setAttribute('data-original', src);
    return li;
  };
  /**
   * Toggle the visibility of the modal
   */
  var toggleModal = function() {
    modal.classList.toggle('show-modal');
  };
  /**
   * Add the clicked thumbnail's full-size image to modal content div
   * @param  {String} src The path for a full-size image
   */
  var populateModalImage = function(src) {
    var fullImg = modalContent.getElementsByTagName('img');
    if (fullImg.length > 0) {
      fullImg = fullImg[0];
      modalContent.removeChild(fullImg);
    }
    var newImg = createImgElm(src, '', '');
    modalContent.appendChild(newImg);
    // newImg.addEventListener('load', function(e) {
    //   adjustModalContentSize(newImg);
    // });
  };
  var adjustModalContentSize = function(img) {
    //Aspect ratio
    var ratio = img.naturalHeight / img.naturalWidth;
  };
  /**
   * Remove The button that is binded to return more image data
   */
  var removeLoadButton = function() {
    if (loadBtn) {
      loadBtn.parentNode.removeChild(loadBtn);
    }
  };
  /**
   * Create and add thumbnails to the thumbnails element
   * @param  {Array} data Chunk of the Parsed JSON data.
   */
  var displayImages = function(data) {
    if (currentChuck >= numberOfChunks) {
      removeLoadButton();
    }
    var items = data,
      img, li;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      img = createImgElm(item.thumbnail, item.alt, item.title);
      li = createListElm(item.image);
      li.appendChild(img);
      thumbnailsElm.appendChild(li);
    }
  };

  /**
   * prints out a random dog related text emoticons to the console
   */
  var sayhello = function() {
    var msg = ['(U •́ .̫ •̀ U) woof', 'woof (υ◉ω◉υ) woof (υ◉ω◉υ) woof', 'o(^^ )o——–⊆^U)┬┬~… yay', 'o(･ω･｡)o—∈･^ミ┬┬~ summer', '໒( ◉ ᴥ ◉ )७ hi'];
    console.log("Thanks for reviewing my code! Welcome your feedback. Here is a cute text dog for you!" + msg[Math.floor(Math.random() * msg.length)]);
  };

  return {
    sayhello: sayhello,
    init: init
  }
}());

thumbnailGalleryViewer.sayhello();
thumbnailGalleryViewer.init('assets/data/dogs-compressed.json');