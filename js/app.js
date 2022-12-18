'use strict';

// GLOBAL VARIABLES 
let voteCount = 25;
let prodArr = [];

//  DOM REFERENCES 
let imgContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');

//  CONSTRUCTOR FUNCTION 
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  prodArr.push(this);
}

//  HELPER FUNTCION / UTILITIES 
function randomIndex() {
  return Math.floor(Math.random() * prodArr.length);
}

//image array
let indexArray = [];

// images rendering
function renderImgs() {
  while (indexArray.length < 6) {
    let randomNum = randomIndex();
    if (!indexArray.includes(randomNum)) {
      indexArray.push(randomNum);
    }
  }
  let img1Ndx = indexArray.shift();
  let img2Ndx = indexArray.shift();
  let img3Ndx = indexArray.shift();

  imgOne.src = prodArr[img1Ndx].img;
  imgTwo.src = prodArr[img2Ndx].img;
  imgThree.src = prodArr[img3Ndx].img;

  prodArr[img1Ndx].views++;
  prodArr[img2Ndx].views++;
  prodArr[img3Ndx].views++;

  imgOne.alt = prodArr[img1Ndx].name;
  imgTwo.alt = prodArr[img2Ndx].name;
  imgThree.alt = prodArr[img3Ndx].name;
}


//chart function
function renderChart() {

  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for (let i = 0; i < prodArr.length; i++) {
    prodNames.push(prodArr[i].name);
    prodVotes.push(prodArr[i].clicks);
    prodViews.push(prodArr[i].views);
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        data: prodVotes,
        label: '# of Votes',
        backgroundColor: [
          'gold',
        ],
        borderColor: [
          'black',
        ],
        borderWidth: 1
      },
      {
        data: prodViews,
        label: '# of views',
        backgroundColor: [
          'white',
        ],
        borderColor: [
          'black',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

//  EVENT HANDLERS 
function handleClick(event) {
  console.dir(event.target);
  let imgClicked = event.target.alt;

  console.log('img clicked >>', imgClicked);

  for (let i = 0; i < prodArr.length; i++) {
    if (prodArr[i].name === imgClicked) {
      prodArr[i].clicks++;
      let prodString = JSON.stringify(prodArr)
      localStorage.setItem('myProds', prodString)

    }
  }
  voteCount--;

  renderImgs();

  if (voteCount === 0) {
    imgContainer.removeEventListener('click', handleClick);
    renderChart();
  }
}

function handleShowResults() {
  if (voteCount === 0) {
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

let retrievedProds = localStorage.getItem('myProds');

let parsedProd = JSON.parse(retrievedProds);

if (retrievedProds) {
  prodArr = parsedProd
} else {
  //  PRODUCT CONSTRUCTOR
  new Product('Acoustic');
  new Product('BassGuitar');
  new Product('Conga');
  new Product('DrumKit');
  new Product('DrumMachine');
  new Product('Harp');
  new Product('LesPaul');
  new Product('Microphone');
  new Product('MidiController');
  new Product('MixingConsole');
  new Product('Organ');
  new Product('Piano');
  new Product('Saxophone');
  new Product('StepSequencer');
  new Product('Synthesizer');
  new Product('Telecaster');
  new Product('Trumpet');
  new Product('TurnTable');
  new Product('Viola');
}

console.log(prodArr);
renderImgs();

imgContainer.addEventListener('click', handleClick);
