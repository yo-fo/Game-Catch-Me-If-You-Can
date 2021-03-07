const startBtn      = document.querySelector("#startBtn");
var bestNameSpan = [document.querySelector("#name1"),
                    document.querySelector("#name2"),
                    document.querySelector("#name3"),
                    document.querySelector("#name4")];
var bestScoreSpan = [document.querySelector("#score1"),
                    document.querySelector("#score2"),
                    document.querySelector("#score3"),
                    document.querySelector("#score4")];

var bestScores = {
    DOM : document.querySelector("#bestScores"),
    scores : [400, 365, 256, 235],
    names: ["Avrel", "Jack", "Joe", "Harry"],
    date: ["","","",""],
}

var points = {
    DOM : document.querySelector("#score"),
    count : 236,
}

var timer = {
    DOM: document.querySelector("#clock"),
    count : 60,
    stop : function(){
        clearInterval(interval);
    },
    chrono : function() {
        timer.count--;
        // console.log(`timer: ${timer.count}`);
        timer.DOM.innerText = timer.count;
        if (timer.count == 0) {
            alert("you lost \n too bad"); // activate LOOSE function
            timer.stop();
        };
    },
    add : function() {
        this.count += 10;
    },
};

function bestScoresSave () {
    localStorage.setItem("bestScores", JSON.stringify(bestScores.scores)) ;
    localStorage.setItem("bestNames", JSON.stringify(bestScores.names)) 
}

function bestScoresDisplay () {
    const bestScoresJSON = localStorage.getItem("bestScores"); // get JSON
    const bestNamesJSON = localStorage.getItem("bestNames"); // get JSON
    if (bestScoresJSON != null) { // Check that this JSON even exists
        bestScores.scores = JSON.parse(bestScoresJSON); // If yes, parse it
        bestScores.names = JSON.parse(bestNamesJSON); // If yes, parse it
        bestScores.scores.forEach(place1)
            function place1(item,i) {bestScoreSpan[i] = item;};
        bestScores.names.forEach(place2)
            function place2(item,i) {bestNameSpan[i] = item;};
        };
}

function win(){
    var playerName = prompt("Please enter your name");
    let currentScore = points.count;

    bestScores.scores.forEach(Do);
    function Do(scoreX, i, bestScores, currentScore) {
        console.log(`${i} + ":" + ${scoreX}\n`)
        if (currentScore > scoreX) {
            bestScores.scores.splice(i,1,currentScore);
            bestScores.names.splice(i,1,playerName);
            return 
        }
    };
                            bestScores.names.forEach(Do2);
                            function Do2(nameX, i) {console.log(`${i} + ":" + ${nameX}\n`)}
    alert(`WIN\nCongrats\nScore = ${points.count}\nTime left = ${timer.count}`)  // display score
    bestScoresSave ();
}

bestScoresDisplay();
win();
bestScoresDisplay();


//var ;  declare the Best Scores array
// localStorage.setItem("BestScores", bestScoresArr);
// document.querySelector("#bestScores").innerHTML = localStorage.getItem("BestScores");

// function bestScoresSave () {
//     localStorage.setItem("bestScores", JSON.stringify(bestScores.arr)) ;
//     localStorage.setItem("bestNames", JSON.stringify(bestScores.names)) ;
// }

// function bestScoresDisplay () {
//     const bestScoresJSON = localStorage.getItem("bestScores"); // get JSON
//     const bestNamesJSON = localStorage.getItem("bestNames"); // get JSON

//     if (bestScoresJSON != null) { // Check that this JSON even exists
//         bestScores.arr = JSON.parse(bestScoresJSON); // If yes, parse it
//         bestScores.names = JSON.parse(bestNamesJSON); // If yes, parse it

//         bestScores.DOM.innerText = `${bestScores.names[0]}: ${bestScores.arr[0]}
//                                     ${bestScores.names[1]}: ${bestScores.arr[1]}
//                                     ${bestScores.names[2]}: ${bestScores.arr[2]}
//                                     ${bestScores.names[3]}: ${bestScores.arr[3]}
//                                     ${bestScores.names[4]}: ${bestScores.arr[4]}`
//     }
// }


// bestScoresSave ()
// bestScoresDisplay ()
