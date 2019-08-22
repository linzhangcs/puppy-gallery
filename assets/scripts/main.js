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

  function displayThumbnails(imageJson) {
    data = JSON.parse(imageJson);
    // console.table(data);
    var items = data.dogs,
      img, li,
      thumbnailsElm = document.getElementById('thumbnails');

    for (var i = 0; i < items.length; i++) {
      img = createImgElm(items[i].thumbnail, '', '');
      li = createListElm(items[i].image);
      li.appendChild(img);
      thumbnailsElm.appendChild(li);
    }
    var modal = document.querySelector('.modal'),
      closeBtn = document.querySelector('.close-button');

    thumbnailsElm.addEventListener('click', function(e) {
      modal.classList.toggle('show-modal');
    });
    closeBtn.addEventListener('click', function(e) {
      console.log("close");
      modal.classList.toggle('show-modal');
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