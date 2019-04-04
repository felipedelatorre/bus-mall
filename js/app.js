'use strict';

var PRODUCTLIST = {};
var PRODUCT_FILE_NAME = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg','cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var REPETITIONTRACKER = [];
var SELECTIONCOUNTER = 1;


// Obj and Prototypes

function Product(htmlId, name, filePath) {
  this.htmlId = htmlId;
  this.name = name;
  this.filePath = filePath;
  this.totalViews = 0;
  this.totalClicks = 0;

  PRODUCTLIST[htmlId] = this;
}

Product.prototype.renderToChildElement = function(parentId) {
  this.totalViews++;
  var childElement = document.getElementById(parentId).firstElementChild;
  childElement.src = this.filePath;
  childElement.id = this.htmlId;
};





// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeFileExtension(string) {
  var removefrom  = string.indexOf('.');
  string = string.slice(0, removefrom);
  return string;
}

function createProductObjects() {
  PRODUCT_FILE_NAME.forEach(element => {
    var htmlId = removeFileExtension(element);
    var name = capitalizeFirstLetter(htmlId);
    var filePath = `./img/${element}`;
    new Product (htmlId, name, filePath);
  });
}

function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomImageName() {
  var randomIndex = getRandomNumber(PRODUCT_FILE_NAME.length, 0);
  var randomImageName = PRODUCT_FILE_NAME[randomIndex];
  randomImageName = removeFileExtension(randomImageName);
  return randomImageName;
}



function fillSelectionWithNewPictures() {
  for (var i = 0; i < 3; i++) { // Magic Number
    var randomImageName = getRandomImageName();
    
    while (REPETITIONTRACKER.includes(randomImageName)) {
      randomImageName = getRandomImageName();
    }
    PRODUCTLIST[randomImageName].renderToChildElement(`productPos${i+1}`);
    REPETITIONTRACKER.push(PRODUCTLIST[randomImageName].htmlId);
  }
  if (REPETITIONTRACKER.length > 6) { // Magic Number
    REPETITIONTRACKER.shift();
    REPETITIONTRACKER.shift();
    REPETITIONTRACKER.shift();
  }
}

// For list

// function displayListOfProductsWithVotes(parentId) {
//   var li = document.createElement('li');
//   li.txtContent = 'Hello';
//   parentId.appendChild(li);
// }


//----------------
// At first load
//----------------
createProductObjects();

fillSelectionWithNewPictures();


//----------------
// Events
//---------------
var body = document.getElementById('body');

function recordClicks(event) {
  if (event.target.className === 'productCell') {
    var id = event.target.id;
    PRODUCTLIST[id].totalClicks++;
    fillSelectionWithNewPictures();
    SELECTIONCOUNTER++;
    console.log(SELECTIONCOUNTER);
    if (SELECTIONCOUNTER > 25) {
      body.removeEventListener('click', recordClicks);
    }
  }
  // displayListOfProductsWithVotes(ul);
}

body.addEventListener('click', recordClicks);
