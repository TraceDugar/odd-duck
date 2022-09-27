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

let indexArray = [];

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
          'yellow',
          'white',
          'black',
        ],
        borderColor: [
          'white',
          'black',
          'yellow',
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
    // for (let i = 0; i < prodArr.length; i++) {
    //   let liElem = document.createElement('li');
    //   liElem.textContent = `${prodArr[i].name} recieved ${prodArr[i].clicks} votes, and was seen ${prodArr[i].views} times.`;
    //   resultsContainer.appendChild(liElem);
    // }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// EXECUTABLE CODE 
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

renderImgs();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);

//--Table 11 Collaboration