var bx = 500; //binary x position
var by = 250; //binary y position

//Author: Other
function setUpPage() {//set up the page of the canvas, 
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//Author: Self 
function emoji(x, y, xVel, yVel, imagePath, dead) { //emoji object function.  
    this.x = x;//x position
    this.y = y;//y position
    this.xVel = xVel;//x velocity
    this.yVel = yVel;//y velocity
    this.imagePath = imagePath;//image name
    this.dead = dead;//life or dead of emoji
}

//Author: Self  
//create new objects of emojis. 
var emoji1 = new emoji(1000, 200, Math.floor(Math.random() * 50), Math.floor(Math.random() * 10), "a.png", false); 
var emoji2 = new emoji(670, 50, Math.floor(Math.random() * 10), Math.floor(Math.random() * 50), "b.png", false);
var emoji3 = new emoji(200, 100, Math.floor(Math.random() * 30), Math.floor(Math.random() * 10), "c.jpg", false);
var emoji4 = new emoji(3, 100, Math.floor(Math.random() * 60), Math.floor(Math.random() * 50), "d.png", false);
var emoji5 = new emoji(777, 100, Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), "e.png", false);
var emoji6 = new emoji(60, 200, Math.floor(Math.random() * 100), Math.floor(Math.random() * 10), "f.png", false);
var emoji7 = new emoji(100, 200, Math.floor(Math.random() * 5), Math.floor(Math.random() * 10), "g.png", false);
var emoji7 = new emoji(500, 111, Math.floor(Math.random() * 50), Math.floor(Math.random() * 10), "h.png", false);
var emoji7 = new emoji(987, 200, Math.floor(Math.random() * 50), Math.floor(Math.random() * 100), "i.png", false);
var emoji8 = new emoji(250, 50, Math.floor(Math.random() * 10), Math.floor(Math.random() * 50), "m.jpg", false);
var emoji9 = new emoji(0, 0, Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), "s.jpg", false);
var emoji10 = new emoji(30, 137, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), "t.jpg", false);


//Author: Self 
var array = [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8, emoji9, emoji10]; //arrays of objects.  

// Author: Other and me
function drawImage(imagePath, x, y, center) { //draws images when call
    var ctx = document.getElementById('mainCanvas').getContext("2d");
    var img = new Image();
    img.src = imagePath;
    if (center == true) {
        ctx.drawImage(img, x - img.width / 2, y - img.height / 2);
    }
    else {
        ctx.drawImage(img, x, y);
    }
}

//Author: Self  
function listener() { //adds an keydown listeners that listen to when the user use the keyboard. 
    document.addEventListener("keydown", keyDown, false);
}

//Author: Self  
function drawEmoji() { //draws everything in the array call array by using the drawimage function.
    for (var i = 0; i < array.length; i++) {
        drawImage(array[i].imagePath, array[i].x, array[i].y, true);
    }
}

//Author: Self  
//arrays of chords.  
var sound = [
    ['C4', 'E4', 'G4', 'B4'],
    ['C3', 'E3', 'G3', 'B3'],
    ['C2', 'E2', 'G2', 'B2'],
    ['G2', 'B2', 'D2', 'F#2'],
    ['G3', 'B3', 'D3', 'F#3'],
    ['G4', 'B4', 'D4', 'F#4'],
    ['C2', 'E2', 'G2', 'B2'],
    ['A2', 'C#3', 'E3', 'G#4'],
    ['A3', 'C#4', 'E4', 'G#5'],
    ['A4', 'C#5', 'E5', 'G#6'],
    ['F2', 'A2', 'C3', 'E3'],
    ['F3', 'A3', 'C4', 'E4'],
    ['F4', 'A4', 'C5', 'E5'],
];

function binaryotherside(){//Author: Self
    //let binary photo move out of screen and to the other side
        if (bx < 0) { 
            bx = window.innerWidth;
        }
        if (by < 0) {
            by = window.innerHeight;
        }
        if (bx > window.innerWidth) {
            bx = bx - bx;
        }
        if (by > window.innerHeight) {
            by = by - by;
        }
}

//Author: Self  
function updateEmoji() { //update the emojis' position, update binary picture position, detect collision, and dead of emoji. 
    drawImage("binary.jpg", bx, by, true); //draws binary image at position (bx,by)
    for (var i = 0; i < array.length; i++) {
        array[i].x += array[i].xVel; //the x position will change by adding x velocity
        array[i].y += array[i].yVel; //the y position will change by adding y velocity
        
        binaryotherside();
        
        //let emojis bounce off the walls
        if (array[i].x < 0) { 
            array[i].xVel = -array[i].xVel;
        }
        if (array[i].y < 0) {
            array[i].yVel = -array[i].yVel;
        }
        if (array[i].x > window.innerWidth) {
            array[i].xVel = -array[i].xVel;
        }
        if (array[i].y > window.innerHeight) {
            array[i].yVel = -array[i].yVel;
        }
        //detect collision and dead of emojis
        if (bx < array[i].x + 77 &&
            bx + 137 > array[i].x &&
            by < array[i].y + 80 &&
            by + 80 > array[i].y) { //when the position of the binary photo touch an emoji, the emoji will be dead
            array[i].dead = true;
            if (array[i].dead == true) {//if dead is true, the position of the object will be (-100000,100000)
                array[i].x = -100000;
                array[i].y = 100000;
                var synth1 = new Tone.PolySynth(4, Tone.Synth).toMaster(); //connects sound from tone.js to master speaker on the platform people are using 
                synth1.triggerAttackRelease(sound[Math.floor(Math.random() * sound.length)], '8n');//plays random sounds from array call sound for an duration of 8th note
            }
            //if all the array of emoji object are dead then a pop up confirm box will appear and if the user click ok, then the form will reload and the game will restart.
            if (array[0].dead == true && array[1].dead == true &&
                array[2].dead == true && array[3].dead == true &&
                array[4].dead == true && array[5].dead == true &&
                array[6].dead == true && array[7].dead == true &&
                array[8].dead == true && array[9].dead == true ) {
                confirm("Have a Nice Day and click ok to play again :)");
                    document.location.reload();
            }
        }
    }
}

//Author: Self  
function update() {//call functions to update the screen.  
    clearCanvas();
    updateEmoji();
    drawEmoji();
}

//Author: Other
function clearCanvas() {//clears canvas from position (0,0) to (canvas width, canvas height).  
    var ctx = document.getElementById('mainCanvas').getContext("2d");
    var canvas = document.getElementById("mainCanvas");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function keyDown() {//Author: Self  
    window.event.preventDefault();// prevent default event
    switch (window.event.key) {//senses if the key is press and cases go through which key are press and does whatever is states under the case
        case 'ArrowLeft': 
            bx = bx - 7;
            break;
        case 'ArrowUp':
            by = by - 7;
            break;
        case 'ArrowDown':
            by = by + 7;
            break;
        case 'ArrowRight':
            bx = bx + 7;
            break;
    }
}

function rule() { //Author: Self
    //float.html will call this function to display the rules or directions for playing this games 
    confirm("Move Around with the keyboard with Up Arrow, Down Arrow, Right Arrow, and Left Arrow. Catch the faces or emojis and you'll get a surprise. Try to go past the walls or canvas, an example is keep pressing the up arrow. Have fun and enjoy your day :)");
}

function initialize() { //Author: Self 
    //initialize the page by drawing the emojis and binary picture
    drawImage("binary.jpg", bx, by, true);
    drawEmoji();
}

function main() { //Author: Self 
    //calls all the functions that are running on the main canvas 
    listener();
    setUpPage();
    initialize();
    setInterval(update, 100);
}
