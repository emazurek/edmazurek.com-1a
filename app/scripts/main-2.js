var stage, tw, th, radius, bw, bh;
var canvasContainer = document.getElementById('artContainer');
var canvas = document.getElementById('myCanvas');
var nowLoading = document.getElementById('now-loading');
var container = new createjs.Container();
window.addEventListener('resize', resize, false);
canvas.addEventListener('click', handleClick);
var colorArray = ['rgb(33,24,33)', 'rgb(241,195,105)', 'rgb(77,173,246)', 'rgb(231,57,122)', 'rgb(99,213,135)', 'rgb(75,63,67)', 'rgb(184,76,97)', 'rgb(195,160,132)'];
// var colorArray = ['rgb(0,0,0)', 'rgb(255,255,255)'];
tw = canvas.width;
th = canvas.height;
var sizeDenom = 15;
var initialRadius = th < tw ? th / sizeDenom : tw / sizeDenom;

// THESE TWO VARIABLES STORE THE TIME AND DATE WHEN THE PAGE IS LOADED
var startDate = new Date();
var startTime = startDate.getTime();

// THIS FUNCTION CALCULATES THE SECONDS ELAPSED SINCE THE PAGE WAS LOADED
function seconds_elapsed () 
{ 
var date_now = new Date (); 
var time_now = date_now.getTime (); 
var time_diff = time_now - startTime; 
var seconds_elapsed = Math.floor ( time_diff / 1000 ); 

return ( time_diff ); 
} 

function randomColor(i) {
  var newArray = colorArray;
  if (i != 0) {
    var lastColor = container.children[i - 1].mycolor;
    newArray = newArray.filter(function(el) {
      return el !== lastColor;
    });
  }
  var j = Math.floor(Math.random() * newArray.length);
  return newArray[j];
}

var obj = Array();
var i = 0;
var vol = 1;
var preloadText = '';
var currentPct = 0;

function drawPreloadText() {
  preloadText = new createjs.Text(currentPct + '%', '20px Open Sans', '#FFFFFF');
  preloadText.textAlign = 'center';
  var b = preloadText.getBounds();
  preloadText.x = (tw - b.width)/2;
  preloadText.y = (th - b.height)/2;
  preloadText.textBaseline = 'alphabetic';  
  container.addChild(preloadText);
}


function drawOne() {
  //var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  radius = (radius == null ? initialRadius : radius / 1.02);
  obj[i] = new createjs.Shape();
  obj[i].radius = radius;
  obj[i].mycolor = randomColor(i);
  obj[i].graphics.beginFill(obj[i].mycolor).drawCircle(0, 0, radius).endFill();
  obj[i].x = tw / 2;
  obj[i].y = th / 2;
  obj[i].regX = radius*3;
  obj[i].regY = radius*3;
  createjs.Tween.get(obj[i], {
    loop: true
  }).to({
    rotation: 360
  }, 10000);
  container.addChild(obj[i]);
  i++;
  //console.log(radius + (obj[i].regX < obj[i].regY ? obj[i].regY : obj[i].regX));
  //console.log(314/(initialRadius - radius));
}

// function drawAll() {
//   var all = stage.children;
//   tw = stage.canvas.width;
//   th = stage.canvas.height;
//   // stage.clear();
//   all.forEach(function(el) {
//     el.x = tw/2;
//     el.y = th/2;
//     el.radius = th < tw ? el.radius * th/bh : el.radius * tw/bw;
//     el.graphics.clear().beginFill(el.mycolor).drawCircle(0,0,el.radius).endFill();
//     radius = el.radius;
//   });
// }

function resize() {
  // Resize the canvas element
  bw = stage.canvas.width;
  bh = stage.canvas.height;
  // stage.canvas.width
  stage.canvas.width = canvasContainer.clientWidth > 550 ? 500 : canvasContainer.clientWidth - 50;
  stage.canvas.height = 500;
  tw = stage.canvas.width;
  th = stage.canvas.height;
  // tw = stage.canvas.width;
  // th = stage.canvas.height;
  container.scaleX = container.scaleY = stage.canvas.width / 500;
  //drawAll();
}

function init() {
  // document.body.style.overflow = 'hidden';
  stage = new createjs.Stage('myCanvas');
  resize();
  queue = new createjs.LoadQueue(true, '../assets/sax/');
  queue.installPlugin(createjs.Sound);
  queue.addEventListener('complete', handleComplete);
  queue.on('progress', handleOverallProgress);
  queue.loadManifest([{
    id: 'sound1',
    src: '1.ogg'
  }, {
    id: 'sound2',
    src: '2.ogg'
  }, {
    id: 'sound3',
    src: '3.ogg'
  }, {
    id: 'sound4',
    src: '4.ogg'
  }, {
    id: 'sound5',
    src: '5.ogg'
  }, {
    id: 'sound6',
    src: '6.ogg'
  }, {
    id: 'sound7',
    src: '7.ogg'
  // }, {
  //   id: 'sound8',
  //   src: '9.ogg'
  // }, {
  //   id: 'sound9',
  //   src: '10.ogg'
  // }, {
  //   id: 'sound10',
  //   src: '11.ogg'
  // }, {
  //   id: 'sound11',
  //   src: '12.ogg'
  // }, {
  //   id: 'sound12',
  //   src: '14.ogg'
  // }, {
  //   id: 'sound13',
  //   src: '15.ogg'
  // }, {
  //   id: 'sound14',
  //   src: '16.ogg'
  // }, {
  //   id: 'sound15',
  //   src: '17.ogg'
  // }, {
  //   id: 'sound16',
  //   src: '18.ogg'
  // }, {
  //   id: 'sound17',
  //   src: '19.ogg'
  // }, {
  //   id: 'sound18',
  //   src: '20.ogg'
  // }, {
  //   id: 'sound19',
  //   src: '21.ogg'
  // }, {
  //   id: 'sound20',
  //   src: '22.ogg'
  // }, {
  //   id: 'sound21',
  //   src: '23.ogg'
  }]);
  createjs.Sound.alternateExtensions = ['mp3'];
}

function handleClick(event) {
  var randomSound = 'sound' + Math.floor((Math.random() * 7) + 1);
  console.log(randomSound);
  drawOne();
  createjs.Sound.play(randomSound, {
    volume: vol
  });
  vol = vol / 1.025;
}

function handleComplete(event) {
  resize();
  // container.removeChild(preloadText);
  stage.addChild(container);
  drawOne();
  createjs.Ticker.addEventListener('tick', tick);
}

function tick(event) {
  stage.update();
}

function handleOverallProgress(event) {
  //nowLoading.innerHTML = Math.floor(queue.progress*100) + '%';
  currentPct = Math.floor(queue.progress*100);
  container.removeChild(preloadText);
  drawPreloadText();
  stage.update();
}