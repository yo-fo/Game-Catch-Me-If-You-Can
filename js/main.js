const leftBoardHeight = 500;
const leftBoardWidth = 890;
const board = document.querySelector("#section2");
const targetHeigt = 40;
const targetLength = 150;
const startBtn      = document.querySelector("#startBtn");
const restartBtn    = document.querySelector("#restartBtn");
var bestNameSpan = [document.querySelector("#name1"),
                    document.querySelector("#name2"),
                    document.querySelector("#name3"),
                    document.querySelector("#name4"),
                    document.querySelector("#name5")];
var bestScoreSpan = [document.querySelector("#score1"),
                    document.querySelector("#score2"),
                    document.querySelector("#score3"),
                    document.querySelector("#score4"),
                    document.querySelector("#score5"),];
var dateArray = document.querySelectorAll(".date")
var dateDOM = document.querySelector("#date");
var bestScores = {
    DOM : document.querySelector("#bestScores"),
    scores : [{ points: 0, name: '', date: ''},
            { points: 0, name: '', date: ''},
            { points: 0, name: '', date: ''},
            { points: 0, name: '', date: ''},
            { points: 0, name: '', date: ''}],
}
var countDown;


//////////////////////////  OBJ DECLARATIONS  /////////////////////////////


var topMax = (leftBoardHeight - targetHeigt) + "px";  //
var leftMax = (leftBoardWidth - targetLength) + "px";
var newTop = 0;
var newLeft = 0;
const target = {
    DOM : document.querySelector("#target"),
    rotate : ()=>{
        target.DOM.style.animationName = "rotate360";    //rotate(360deg)
        target.DOM.style.animationDuration = "2s";    //    (2 - level.level * 0.25) + "s";    
        target.DOM.style.animationIterationCount = "infinite";    //rotate(360deg)
        target.DOM.style.animationTimingFunction = "linear";    //rotate(360deg)
        // console.log("rotate()");
    },
    enableMove : false,
    move : ()=>{
        // console.log("target.move");               // debug
        if(target.enableMove == true){
            target.enableMove = false;
            setTimeout(target.moveNow, 800 -(level.level * 100) ); //moves every 800ms reduced by 100ms every level
        }
    },
    moveNow : ()=>{
        target.enableMove = false;
        newTop = Math.random() * parseInt(topMax);
        newLeft = Math.random() * parseInt(leftMax);
        target.DOM.style.top = `${newTop}px`;
        target.DOM.style.left = `${newLeft}px`;
        target.enableMove = true;
        // console.log("move()");                      //debug
    },
}

const click = {
    next : 10, //clicks to next level
    DOM: document.querySelector("#toNextLevel"),
    inside: false, // the click was in the Target?
}

const miss = {
    value : 0, //missed clicks
    DOM : document.querySelector("#missed"),
}

const level = {
    DOM : levelDisplay = document.querySelector("#levelDisplay"),
    level : 1,
}

const points = {
    DOM : document.querySelector("#score"),
    count : 0,
    add : ()=>{
        target.moveNow;
        if (click.next > 1) {
            points.count += 10 * level.level +1;
            click.next--;
            click.DOM.innerText = click.next;
            points.DOM.innerText = points.count;
        } else if (click.next == 1 && level.level < 5) {
            level.level++;
            level.DOM.innerText = level.level;
            target.DOM.style.animationDuration = (2 - level.level * 0.25) + "s";
            timer.add();
            alert(`Level Up!\nlevel ${level.level}`);
            click.next = 10;
            click.DOM.innerText = click.next;
            points.DOM.innerText = points.count;
        } else if (click.next == 1 && level.level == 5) {
            endGame();
        } else {alert("ERROR");}
    },
    remove : ()=>{
        points.count -= level.level;
        miss.value++;
        miss.DOM.innerText = miss.value;
        points.DOM.innerText = points.count;
    },
    display : ()=>{
        // console.log(points.count);
    },
} ;

const timer = {
    DOM: document.querySelector("#clock"),
    count : 60,
    stop : ()=>{
        clearInterval(timer.countDown);
    },
    countDown: null,
    chrono : ()=>{
        timer.count--;
        // console.log(`timer: ${timer.count}`);
        timer.DOM.innerText = timer.count;
        document.querySelector("#secPoint").style.visibility = "visible";
        setTimeout(function(){        
            document.querySelector("#secPoint").style.visibility = "hidden";
        },100)
        if (timer.count == 0) {
            alert("CountDown to 0");                        // 
            clearInterval(timer.countDown);                 //      
            timer.stop();
            endGame();
        };
    },
    add : function() {
        this.count += 10;
    },
};


//////////////////////////  FUNCTIONS  /////////////////////////////

function saveScores () {
    var playerName = prompt("Please enter your name");      // input name
    var newDate = new Date();                              // generate date
    bestScores.scores.push({points: points.count, name: playerName,  date: newDate});   // add new score object
    bestScores.scores.sort((a, b) => {                      // sort
        if (a.points === b.points) {return 0;}
        if (a.points > b.points) {return -1;}
        if (a.points < b.points) {return 1;}
    });
    localStorage.setItem("bestScores", JSON.stringify(bestScores)) ; // send new bestScores array to localStorage
    // Add Date Score Storage
}


function displayScores () {
    const bestScoresJSON = localStorage.getItem("bestScores"); // get JSON
    if (bestScoresJSON != null) { // Check that this JSON even exists
        bestScores.scores = JSON.parse(bestScoresJSON).scores; // If yes, parse it
    };
    // console.log(bestScores.scores);
    // console.log(bestScores);
    bestScores.scores = bestScores.scores.slice(0,5);
    bestScores.scores.forEach((object, index) => {
        // console.log('[display] `name${index + 1}`', `name${index + 1}`, object.name, object.points);
        bestNameSpan[index].textContent = object.name;
        bestScoreSpan[index].textContent = object.points;
        dateArray[index].innerText = object.date;
    });
}

function displayDate(event) {
    var id = event.target.id  // "player1"
    var pos = id[id.length-1];
    // console.log(pos);
    dateArray[pos-1].style.visibility = "visible";
}
function hideDate() {
    for (let i = 0; i < dateArray.length; i++) {
        dateArray[i].style.visibility = "hidden";
    }
}

function endGame(){
    end = true;
    clearInterval(timer.countDown);                 // clearInterval(timer.countDown);
    alert(`WIN\nCongrats\nScore = ${points.count}\nTime left = ${timer.count}`)  // display score
    saveScores();
    displayScores();
    target.DOM.style.animation = "none";  
    clearInterval(timer.chrono);
    restartBtn.style.visibility = "visible";
    restartBtn.disabled = false;
    restartBtn.addEventListener("click", restartGame); 
    target.DOM.style.visibility =  "hidden";
}

function restartGame (){
    target.DOM.style.visibility =  "visible";
    restartBtn.disabled = true;
    points.count = 1;
    points.DOM.innerText = points.count;
    timer.count = 60;
    timer.DOM.innerText = timer.count;
    level.level = 1;
    level.DOM.innerText =level.level;
    click.next = 10;
    click.DOM.innerText = click.next;
    miss.value = -1;
    miss.DOM.innerText = miss.value;
    target.rotate(); 
    timer.countDown = setInterval(timer.chrono, 1000); 
}

function startGame(){
    startBtn.disabled = true;   // Disable click on Start Button (After Starting the game)
    restartBtn.disabled = true;
    timer.countDown = setInterval(timer.chrono, 1000);     // Start a countDown timer of 60 sec counts intervals of 1000ms
    target.rotate();              // starts Target Rotation
    target.enableMove = true;
    target.DOM.addEventListener("mouseover",target.move); // on hover on TargetDiv escape of TargetDiv
    document.addEventListener("click", event =>{
        // console.log(event.target.id)
        switch(event.target.id){
            case "target":              // if click on Target
            // console.log("points.add")               // debug
                points.add();                 // add points
                break;                      // and don't remove points
            case "startBtn":
                break;
            default:                       // if click out of target
            // console.log("points.remove")               // debug
                points.remove();              // remove points
        };
    });
    
}

function init(){
    restartBtn.style.visibility = "hidden"; //  On page load hide Restart Button
    displayScores();                        // On page load display best Scores from local Storage
    bestScores.DOM.addEventListener("mouseover", event =>{displayDate(event)});
    bestScores.DOM.addEventListener("mouseout", hideDate);
    startBtn.addEventListener("click", startGame);    // on click on StartButton launch game
}
init();
