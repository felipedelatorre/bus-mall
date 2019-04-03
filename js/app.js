'use strict';

var PRODUCTLIST = {};
var PRODUCTNAMES = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair','cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var REPETITIONTRACKER = [];
var SELECTIONCOUNTER = 1;


function Product(htmlId, name, filePath) {
  this.htmlId = htmlId;
  this.name = name;
  this.filePath = filePath;
  this.totalViews = 0;
  this.totalClicks = 0;

  PRODUCTLIST[htmlId] = this;
}

Product.prototype.render = function(parentId) {
  this.totalViews++;
  var parent = document.getElementById(parentId);
  var img = document.createElement('img');
  img.setAttribute('id', this.htmlId);
  img.setAttribute('src', this.filePath);
  img.setAttribute('class', 'productCell');
  parent.appendChild(img);

};


// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createProductObjects() {
  PRODUCTNAMES.forEach(element => {
    var name = capitalizeFirstLetter(element);
    var htmlId = element;
    var filePath = `./img/${element}.jpg`;
    new Product (htmlId, name, filePath);
  });
}

function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomPicture() {
  var randomIndex = getRandomNumber(PRODUCTNAMES.length, 0);
  return PRODUCTNAMES[randomIndex];
}


function fillSelectionWithNewPictures() {
  for (var i = 0; i < 3; i++) { // Magic Number
    var randomPic = getRandomPicture();
    while (REPETITIONTRACKER.includes(randomPic)) {
      randomPic = getRandomPicture();
    }
    PRODUCTLIST[randomPic].render(`productPos${i+1}`);
    REPETITIONTRACKER.push(PRODUCTLIST[randomPic].htmlId);
  }

  if (REPETITIONTRACKER.length > 6) { // Magic Number
    REPETITIONTRACKER.shift();
    REPETITIONTRACKER.shift();
    REPETITIONTRACKER.shift();
  }
}

function removePicturesAfterClick(parentId1, parentId2, parentId3) {
  var parent = document.getElementById(parentId1);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  parent = document.getElementById(parentId2);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  parent = document.getElementById(parentId3);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function displayListOfProductsWithVotes(parentId) {
  var li = document.createElement('li');
  li.txtContent = 'Hello';
  parentId.appendChild(li);
}


//----------------
// At first load
//----------------
createProductObjects();
fillSelectionWithNewPictures();


//----------------
// Events
//---------------
var body = document.getElementById('body');
var ul = document.getElementById('resultsList');

function recordClicks(event) {
  if (event.target.className === 'productCell') {
    var id = event.target.id;
    PRODUCTLIST[id].totalClicks++;

    removePicturesAfterClick('productPos1', 'productPos2', 'productPos3');
    fillSelectionWithNewPictures();
    SELECTIONCOUNTER++;
    console.log(SELECTIONCOUNTER);
    if (SELECTIONCOUNTER > 25) {
      body.removeEventListener('click', recordClicks);
    }
  }

  displayListOfProductsWithVotes(ul);

}

body.addEventListener('click', recordClicks);
