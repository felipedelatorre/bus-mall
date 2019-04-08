'use strict';

var PRODUCTLIST = {};
var PRODUCT_FILE_NAME = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg','cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var REPETITIONTRACKER = [];
var SELECTIONCOUNTER = 1;

var STATE_KEY = 'votingState';
var votingState = {};



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

//----------------
// For list
//----------------

function displayListOfProductsWithVotes() {
  var parent = document.getElementById('resultsList');

  for (var i = 0; i < Object.keys(PRODUCTLIST).length; i++) {
    var li = document.createElement('li');
    var productName = Object.keys(PRODUCTLIST)[i];
    var productTotal = Object.values(PRODUCTLIST)[i].totalClicks;
    li.textContent = `${productTotal} votes for ${productName}`;
    parent.appendChild(li);
  }
}

//----------------
// For Chart
//----------------

function createBarGraph() {
  var ctx = document.getElementById('myChart');

  var arrOfProducts = Object.keys(PRODUCTLIST);
  var arrOfTotals = [];

  for (var i = 0; i < Object.keys(PRODUCTLIST).length; i++) {
    arrOfTotals.push(Object.values(PRODUCTLIST)[i].totalClicks);
  }

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrOfProducts,
      datasets: [{
        label: '# of Votes',
        data: arrOfTotals,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function setStateToLocalStorage() {
  localStorage.setItem(STATE_KEY, JSON.stringify(votingState));
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

function recordClicks(event) {
  if (event.target.className === 'productCell') {
    var id = event.target.id;
    PRODUCTLIST[id].totalClicks++;
    votingState.numberOfTotalVotes++;
    setStateToLocalStorage();

    fillSelectionWithNewPictures();
    SELECTIONCOUNTER++;
    if (SELECTIONCOUNTER > 25) {
      body.removeEventListener('click', recordClicks);
      displayListOfProductsWithVotes();
      createBarGraph();


    }
  }
}

body.addEventListener('click', recordClicks);

