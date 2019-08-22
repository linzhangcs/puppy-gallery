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
var loadImageGallery = (function() {

  var getData = function(filePath, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType('application/json');

    request.open('GET', filePath, true);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == '200') {
        callback(request.responseText);
      }
    }
    request.send(null);
  };

  var parseData = function(filePath) {
    var data;
    getData(filePath, function(response) {
      data = JSON.parse(response);
      console.table(data);
    })
    return data;
  };

  var sayhello = function() {
    var msg = '(U •́ .̫ •̀ U) woof woof woof ٩(♡ε♡ )۶'
    console.log(msg);
  };

  return {
    sayhello: sayhello,
    parseData: parseData
  }
}());

loadImageGallery.sayhello();
loadImageGallery.parseData('assets/data/dogs.json');