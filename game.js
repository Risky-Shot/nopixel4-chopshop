import { $, sample, logger, enforceMinMax } from './helpers.js'

var timeBarIntervalId = null;

let btnAmount = 0;
let timeAmount = 0;

const alphabets = ['Q','W','E','R','A','S','D'];


let lookoutKeys = [];

var timeUp = false;

async function timeBarFunction() {
    var elem = $("#timerBar");
    timeAmount = parseInt($('#timeAmount').value);
    let start = new Date();
    timeBarIntervalId = setInterval(frame, 1000); // update timebar every 1 second
    function frame() {
        var now = new Date();
        var timeDiff = now.getSeconds() - start.getSeconds();
        var perc = 100 - Math.round((timeDiff / timeAmount)*100);
        if (perc <= 0) {
            elem.style.width = '0%';
            clearInterval(timeBarIntervalId);
            if (lookoutKeys.length > 0) {
                setTimeout(() => {
                    alert('Game Failed : TimeUp');
                    resetGame();
                }, 100);
            }
        } else {
            elem.style.width = perc + '%';
        }
    }
}

function placeHolderButtons() {
    $('.btn-container').innerHTML = '';
    btnAmount = parseInt($('#btnAmount').value);
    const squares = [...Array(btnAmount).keys()].map(i => {
        let button = document.createElement('button')
        button.id = `button-${i+1}`;
        button.className = 'btn';
        button.innerHTML = '?';
        $('.btn-container').appendChild(button);
        return button
    });
}

async function startGame() {
    $("#timerBar").style.width = '100%';
    clearInterval(timeBarIntervalId);
    resetGame();
    timeBarFunction();
    $('.btn-container').innerHTML = '';
    btnAmount = parseInt($('#btnAmount').value);
    const buttons = [...Array(btnAmount).keys()].map(i => {
        let button = document.createElement('button')
        button.id = `button-${i+1}`;
        button.className = 'btn';
        let buttonFound = sample(alphabets);
        //button.dataset.key = keyCodes[buttonFound];
        button.innerHTML = buttonFound;
        $('.btn-container').appendChild(button);
        lookoutKeys.push(buttonFound);
        return button
    });

    logger(buttons)
    document.onkeyup = function (event) {
        if (event.code == 'Key'+lookoutKeys[0]) {
            //TODO : Change Color of buttons pressed : get total lookoutkeys length subtract from btnAmount and then query select using "button-"+
            lookoutKeys.shift();
            var ele = $("#button-"+(btnAmount-lookoutKeys.length));
            ele.style.backgroundColor = "rgba(0,184,136,0.5)";
            ele.style.borderColor = "rgba(0,184,136,1, 1) !important";
            ele.style.color = "rgba(0,184,136,1)";
            ele.style.textShadow = "0 0 10px rgba(0,184,136,1)"
            if (lookoutKeys.length == 0) {
                setTimeout(() => {
                    alert('Game Won');
                    resetGame();
                }, 100);

             }
        } else {
                alert('Game Failed : Wrong Key');
                resetGame();
        }
    };
}

window.onload = function(){
    placeHolderButtons();
};

$('.start').addEventListener('click', () => startGame());
$('.reset').addEventListener('click', () => resetGame());

// TODOD : Change Labels Color Too
$('#darkModeToggle').addEventListener('click', () => {
    if ($('#darkModeToggle').checked) {
        document.body.style.backgroundColor = "hwb(0 0% 100% / 0.250)";
        document.querySelectorAll('.label').forEach(element => {
            element.style.color = "hwb(0 0% 100% / 0.850)";
        });
    }else{
        document.body.style.backgroundColor = "hwb(0 0% 100% / 0.850)";
        document.querySelectorAll('.label').forEach(element => {
            element.style.color = "#ff5722";
        });
    }
});

$('#btnAmount').addEventListener("input", () => {
    enforceMinMax($('#btnAmount'));
    placeHolderButtons()
});

$('#timeAmount').addEventListener("input", () => {
    enforceMinMax($('#timeAmount'));
    timeAmount = parseInt($('#timeAmount').value);
});

function resetGame() {
    clearInterval(timeBarIntervalId);
    timeBarIntervalId = null;
    var elem = document.getElementById("timerBar");
    elem.style.width = '100%';
    document.onkeyup = null;
    lookoutKeys = [];
    placeHolderButtons();
    
}

