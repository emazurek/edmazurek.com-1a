var stage, tw, th, radius, bw, bh, container;
var canvasContainer = document.getElementById('artContainer');
var canvas = document.getElementById('myCanvas');
window.addEventListener('resize', resize, false);
canvas.addEventListener('click', handleClick);
//var colorArray = ['rgb(33,24,33)', 'rgb(241,195,105)', 'rgb(77,173,246)', 'rgb(231,57,122)', 'rgb(99,213,135)', 'rgb(75,63,67)', 'rgb(184,76,97)', 'rgb(195,160,132)'];
 var colorArray = ['rgb(0,0,0)', 'rgb(255,255,255)'];
tw = canvas.width;
th = canvas.height;
var sizeDenom = 15;
var initialRadius = th < tw ? th / sizeDenom : tw / sizeDenom;

// THESE TWO VARIABLES STORE THE TIME AND DATE WHEN THE PAGE IS LOADED
var startDate = new Date();
var startTime = startDate.getTime();

// THIS FUNCTION CALCULATES THE SECONDS ELAPSED SINCE THE PAGE WAS LOADED

function seconds_elapsed() {
    var date_now = new Date();
    var time_now = date_now.getTime();
    var time_diff = time_now - startTime;
    var seconds_elapsed = Math.floor(time_diff / 1000);

    return (time_diff);
}

function randomColor(i) {
    var newArray = colorArray;
    console.log(i);
    if (i != 0) {
        var n = container.children.length;
        var lastColor = container.children[n - 1].mycolor;
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

function drawOne() {
    //var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    radius = (radius == null ? initialRadius : radius / 1.02);
    obj[i] = new createjs.Shape();
    obj[i].radius = radius;
    obj[i].mycolor = randomColor(i);
    obj[i].graphics.beginFill(obj[i].mycolor).drawCircle(0, 0, radius).endFill();
    obj[i].x = tw / 2;
    obj[i].y = th / 2;
    obj[i].regX = radius * 3;
    obj[i].regY = radius * 3;
    createjs.Tween.get(obj[i], {
        loop: true
    }).to({
        rotation: 360
    }, 10000);
    container.addChild(obj[i]);
    i++;
}

function resize() {
    // Resize the canvas element
    bw = stage.canvas.width;
    bh = stage.canvas.height;
    stage.canvas.width = canvasContainer.clientWidth > 550 ? 500 : canvasContainer.clientWidth - 50;
    stage.canvas.height = 500;
    tw = stage.canvas.width;
    th = stage.canvas.height;
    container.scaleX = container.scaleY = stage.canvas.width / 500;
}

function init() {
    // document.body.style.overflow = 'hidden';
    stage = new createjs.Stage('myCanvas');
    container = new createjs.Container();
    resize();
    queue = new createjs.LoadQueue(true, '../assets/sax/');
    queue.installPlugin(createjs.Sound);
    queue.on('progress', handleOverallProgress);
    queue.addEventListener('complete', handleComplete);
    var soundObjects = [];
    var soundItems = 7;
    for (w = 1; w <= soundItems; w++) {
        soundObjects.push({
            id: 'sound' + w,
            src: w + '.ogg'
        });
    }
    queue.loadManifest(soundObjects);
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
    stage.removeChild(preloadText);
    stage.addChild(container);
    drawOne();
    createjs.Ticker.addEventListener('tick', tick);
}

function tick(event) {
    stage.update();
}

function handleOverallProgress(event) {
    currentPct = Math.floor(queue.progress * 100);
    stage.removeChild(preloadText);
    drawPreloadText();
    stage.update();
}

function drawPreloadText() {
    preloadText = new createjs.Text(currentPct + '%', '80px Open Sans', '#FFFFFF');
    preloadText.textAlign = 'center';
    var b = preloadText.getBounds();
    preloadText.x = (tw) / 2;
    preloadText.y = 0 + b.height;
    preloadText.textBaseline = 'alphabetic';
    stage.addChild(preloadText);
}