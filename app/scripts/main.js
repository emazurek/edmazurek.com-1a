var stage, tw, th, radius, bw, bh;
var canvasContainer = document.getElementById("artContainer");
var canvas = document.getElementById("myCanvas");
var container = new createjs.Container();
window.addEventListener('resize', resize, false);
// var colorArray = ["rgb(33,24,33)", "rgb(241,195,105)", "rgb(77,173,246)", "rgb(231,57,122)", "rgb(99,213,135)", "rgb(75,63,67)", "rgb(184,76,97)", "rgb(195,160,132)"];
var colorArray = ["rgb(0,0,0)", "rgb(255,255,255)"];
tw = canvas.width;
th = canvas.height;
var initialRadius = th < tw ? th / 2.2 : tw / 2.2;


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

function drawOne() {
  //var canvas = document.getElementById("myCanvas");
  radius = (radius == null ? initialRadius : radius / 1.15);
  obj[i] = new createjs.Shape();
  obj[i].addEventListener("click", handleClick);
  obj[i].radius = radius;
  obj[i].mycolor = randomColor(i);
  obj[i].graphics.beginFill(obj[i].mycolor).drawCircle(0, 0, radius).endFill();
  obj[i].x = tw / 2;
  obj[i].y = th / 2;
  obj[i].regX = Math.random() * (radius / 15);
  obj[i].regY = Math.random() * (radius / 15);
  obj[i].cursor = "pointer";
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
  // tw = stage.canvas.width;
  // th = stage.canvas.height;
  container.scaleX = container.scaleY = stage.canvas.width / 500;
  //drawAll();
}

function init() {
  // document.body.style.overflow = "hidden";
  stage = new createjs.Stage("myCanvas");
  stage.enableMouseOver(10);
  queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);
  queue.addEventListener("complete", handleComplete);
  queue.loadManifest([{
    id: "sound1",
    src: "assets/sax/1.ogg"
  }, {
    id: "sound2",
    src: "assets/sax/2.ogg"
  }, {
    id: "sound3",
    src: "assets/sax/3.ogg"
  }, {
    id: "sound4",
    src: "assets/sax/4.ogg"
  }, {
    id: "sound5",
    src: "assets/sax/5.ogg"
  }, {
    id: "sound6",
    src: "assets/sax/6.ogg"
  }, {
    id: "sound7",
    src: "assets/sax/7.ogg"
  }, {
    id: "sound8",
    src: "assets/sax/9.ogg"
  }, {
    id: "sound9",
    src: "assets/sax/10.ogg"
  }, {
    id: "sound10",
    src: "assets/sax/11.ogg"
  }, {
    id: "sound11",
    src: "assets/sax/12.ogg"
  }, {
    id: "sound12",
    src: "assets/sax/14.ogg"
  }, {
    id: "sound13",
    src: "assets/sax/15.ogg"
  }, {
    id: "sound14",
    src: "assets/sax/16.ogg"
  }, {
    id: "sound15",
    src: "assets/sax/17.ogg"
  }, {
    id: "sound16",
    src: "assets/sax/18.ogg"
  }, {
    id: "sound17",
    src: "assets/sax/19.ogg"
  }, {
    id: "sound18",
    src: "assets/sax/20.ogg"
  }, {
    id: "sound19",
    src: "assets/sax/21.ogg"
  }, {
    id: "sound20",
    src: "assets/sax/22.ogg"
  }, {
    id: "sound21",
    src: "assets/sax/23.ogg"
  }]);
  createjs.Sound.alternateExtensions = ["mp3"];
}

function handleClick(event) {
  var randomSound = "sound" + Math.floor((Math.random() * 21) + 1);
  console.log(randomSound);
  drawOne();
  createjs.Sound.play(randomSound, {
    volume: vol
  });
  vol = vol / 1.025;
}

function handleComplete(event) {
  resize();
  stage.addChild(container);
  drawOne();
  createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
  stage.update();
}
