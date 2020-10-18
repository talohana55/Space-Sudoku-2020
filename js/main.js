// grabbing the dom elements

let table = document.getElementById('sudokuTable');
let pageOne = document.getElementById('page-one');
let pageTwo = document.getElementById('page-two');
let pageThree = document.getElementById('page-three');
let errorPageOne = document.getElementById('error-div-one');
let userInput = document.getElementById("username-input").value;
let passInput = document.getElementById("password-input").value;
let loginBtn = document.getElementById("login-btn");
let logOutBtn = document.querySelector(".logOutBtn");
let switchLevelBtn = document.getElementById('switch-level');
let levelsBtn = document.querySelectorAll('.levelsBtn');
let allCells = document.querySelectorAll('.cell');
let resetBtn = document.querySelector('#reset-button');
let finishBtn = document.querySelector('#finish-button');
let youLostDiv = document.getElementById("you-lose-div");
let tryAgainBtn = document.getElementById("btn-loser");
let youWinFireworksDiv = document.querySelector('.pyro');
let youWinDiv = document.getElementById("you-win-div");


//username and password
const username = "";
const password = "";

//12 matrix sudoku boards
let mat1, mat2, mat3, mat4, mat5, mat6, mat7, mat8, mat9, mat10, mat11, mat12, matMatrix, randomNum, mat;

const resetMat = [ //  empty matrix to reset board
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
];

matrix12();
generateRandomMatrix() // ליצור מטריצות




///////////// FUNCTIONS/////////////

function generateRandomMatrix() { //generate ramdom matrix from given 12 matrixes;
    matMatrix = [mat1, mat2, mat3, mat4, mat5, mat6, mat7, mat8, mat9, mat10, mat11, mat12]; // we added the 12 matss to an array
    randomNum = Math.floor((Math.random() * 12)); // got a randomized number (12!) // מעגל את המספרים כלפי מטה ונותן מספרים רנדומלים
    mat = [...matMatrix[randomNum]]; // randomized matrix // זורק מטריצה רנדומלית מבים ה 12 שהצבתי

}
const buildSudoku = (mat) => {
    //  rows
    for (let i = 0; i < table.rows.length; i++) {
        //cells
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            table.rows[i].cells[j].innerHTML = mat[i][j]; // here we added i and j to the table
            // we generate a board 
        }
    }
}

function difficulty(percentage) {

    let cellName = '';
    let tempRow = 0,
        tempCol = 0;

    for (i = 0; i < percentage; i++) {

        tempCol = Math.floor((Math.random() * 9)); // random numberfrom 1-9. מספר רנדומלי בין אחד לתשע מעוגל כלפי מטה בעמודות
        tempRow = Math.floor((Math.random() * 9)); // random numberfrom 1-9. מספר רנדומלי בין אחד לתשע מעוגל כלפי מטה בשורות
        cellName = 'cell[' + tempRow + ']' + '[' + tempCol + ']'; // get cell ID קישור של התאים עם המשתנים של השורות והעמודות
        if (!document.getElementById(cellName).innerHTML == '') { // if cell is not empty בדיקה האם התאים ריקים ממחרוזת
            mat[tempRow][tempCol] = ""; // delete from mat variable; מחיקת תאים
            document.getElementById(cellName).innerHTML = ''; // delete from html מחיקת התאים מ

        } else if (document.getElementById(cellName).innerHTML == '') {
            i--
        }
    }
}

function createResetMat() { // יצירת אתחול למטריצה

    for (i = 0; i < allCells.length;) { // we loop through the cells לולאה שעוברת על כל התאים
        for (j = 0; j < 9; j++) { // לולאה שעוברת על כל השורות
            for (k = 0; k < 9; k++) { // לולאה שעוברת על כל העמודות
                resetMat[j][k] = (allCells[i].textContent); // and add the cell in position i to resetMat
                i++
            }
        }
    }
}

//reset the game to the original board
function reset() {
    for (i = 0; i < 9; i++) { // לולאה שעוברת על כל השורות
        for (j = 0; j < 9; j++) { // לולאה שעוברת על כל העמודות
            mat[i][j] = resetMat[i][j];
        }
    }
    buildSudoku(mat); // בניית המטריצה שווה למטריצה המאופסת
};

// to minimize the syntax for the levels EVENTS
function generateForLevelChange(mat, num) {
    buildSudoku(mat); // we generate the sudoku board
    difficulty(num); // then we delete cells by percentage 
}

// to minimize the syntax for the levels EVENTS
function listenersDisplayReset() {
    addListenersToEmptyCells(); // we add an event listener to access the empty cells
    pageDisplay('none', 'none', 'block');
    createResetMat();
}

//function for drag .
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); // we add the value to the board by the id
}

// switch levels
const swichLevel = () => { // פונקציה שמחזירה את המשתמש לדף השני
    matrix12(); // call matrix12 function for reset mat variable to original values;
    pageDisplay('none', 'block', 'none');
    for (i = 0; i < 81; i++) {
        allCells[i].style.fontWeight = "500"; // return the fontweight back to 500; 
    }
    generateRandomMatrix();
    buildSudoku(mat); // and then build the board again לאחר ששינינו רמה תבנה שוב את המטריצה
    youWinFireworksDiv.classList.remove('pyro'); // עוצר את הזיקוקים
    youWinDiv.style.display = "none" // אפקט הניצחון כבוי


}

//logout 
const logOut = () => {
    document.getElementById("username-input").value = ""; //  we clear the inputs user and pass // ברגע שלוחצים על יציאה , המערכת שוכחת את השם משתמש 
    document.getElementById("password-input").value = ""; // ברגע שלוחצים על יציאה , המערכת שוכחת את הסיסמא
    pageDisplay('block', 'none', 'none');
};

//log-in
const logIn = (user, pass) => {

    user = document.getElementById("username-input").value;
    pass = document.getElementById("password-input").value;
    document.getElementById('welcomePageTwoSpan').innerHTML = user; // this is the welcome page in
    youWinFireworksDiv.classList.remove('pyro'); // we remove the winning fireworks from page three once player click LOGIN; // עצירת אפקט הזיקוקין ברגע שהמשתש רוצה לצאת
    if (/^[0-9a-zA-Z_.-]+$/.test(user) && /^[0-9a-zA-Z_.-]+$/.test(pass)) { //  בדיקת שם משתמש וסיסמא - מספרים ואותיות בלבד
        pageDisplay("none", "block", "none");
    } else {
        errorPageOne.innerHTML = "Username OR Password doe's not match" //else we put a message that there is no match // אם אין התאמה בין השם משתמש והסיסמא אז תהיה הודעה שאומרת את זה
    }
};

//checks if all the cells match to variable mat
function finishGame() {

    let columnCheck = [];
    let islandCheck = [];


    for (i = 0; i < 9; i++) { //loop that check the column
        columnCheck = [];
        for (j = 0; j < 9; j++) {
            columnCheck.push(mat[j][i])
            if (columnCheck.length == 9) {
                columnCheck.sort();
                for (k = 0; k < 9; k++) {
                    if (columnCheck[k] == "" || columnCheck[k] == columnCheck[k + 1]) {
                        youLostDiv.style.display = "block";
                        console.log("LOSE");
                        return false;
                    }
                }
            }
        }
    }
    ///rows check
    for (i = 0; i < 9; i++) { // loop that checks rows
        mat[i].sort();
        for (j = 0; j < 9; j++) {

            if (mat[i][j] == "" || mat[i][j] == mat[i][j + 1]) {
                console.log("LOSE");
                youLostDiv.style.display = "block";
                return false;
            }
        }
    }
    for (i = 0; i < 9; i++) { //loop that checks islands
        for (j = 0; j < 9; j++) {
            if (i == 1 || i == 4 || i == 7) {
                if (j == 1 || j == 4 || j == 7) {
                    islandCheck = [];
                    islandCheck.push(mat[i][j], mat[i][j - 1], mat[i][j + 1], mat[i - 1][j], mat[i - 1][j - 1], mat[i - 1][j + 1], mat[i + 1][j], mat[i + 1][j - 1], mat[i + 1][j + 1])
                    islandCheck.sort();
                    for (k = 0; k < 9; k++) {
                        if (islandCheck[k] == "" || islandCheck[k] == islandCheck[k + 1]) {
                            console.log("LOSE");
                            youLostDiv.style.display = "block";
                            return false;
                        }
                    }
                }
            }
        }
    }

    youWinDiv.style.display = "block";
    youWinFireworksDiv.classList.add('pyro'); // adding fireworks class if player win the game;
    console.log("DONE")
    return true;
}

//reset variable that sorted in finishGame function back to correct values;
//NO NEED IF PLAYER WIN
const tryAgain = () => {
    for (i = 0; i < 81; i++) {
        mat[allCells[i].id[5]][allCells[i].id[8]] = allCells[i].textContent;

    }
    youLostDiv.style.display = "none";
}

////////////////LISTENERS//////////

//drop... adding the event listener that allows to drop the numbers into the empty cells and 
const addListenersToEmptyCells = () => { //here we have a function to add event listeners to the empty cells
    for (i = 0; i < allCells.length; i++) { // we loop through all the cells
        if (allCells[i].textContent === "") { //if we find an empty cell
            allCells[i].addEventListener("dragover", function(event) { // we loop through and allow the dragover by eventlistener
                event.preventDefault(); //we prevent default
            });
            allCells[i].addEventListener("drop", function(event) { //we added another event listener
                event.preventDefault();
                let data = event.dataTransfer.getData("text"); //here we have a variable thats gets a string
                event.target.innerHTML = ""; //we get an empty string 
                event.target.appendChild(document.getElementById(data).cloneNode(true)); // and then we append it a child that is actually one of the numbers that we dragged
                mat[this.id[5]][this.id[8]] = this.textContent; // update tha value in the mat variable;
                event.target.style.fontWeight = "700"; // once it lands in the board it gets a bolded style

            })
        }
    }
};

//EVENTS for levels Btn
for (i = 0; i < levelsBtn.length; i++) {
    levelsBtn[i].addEventListener('click', function() {
        if (this.textContent == "Easy") { //if this button is clicked we delete 0.28 cells from board randomly
            generateForLevelChange(mat, 21);
            listenersDisplayReset()
        } else if (this.textContent == "Medium") { //if this button is clicked we delete 0.45 cells from board randomly
            generateForLevelChange(mat, 41);
            listenersDisplayReset()

        } else if (this.textContent == "Hard") { //if this button is clicked we delete 0.65 cells from board randomly
            generateForLevelChange(mat, 61);
            listenersDisplayReset()
        } else { //else we go insane we delete 0.87 cells from board randomly
            generateForLevelChange(mat, 70);
            listenersDisplayReset()
        }
    })
}


// btn event listeners
switchLevelBtn.addEventListener('click', swichLevel);
loginBtn.addEventListener('click', logIn);
logOutBtn.addEventListener('click', logOut);
resetBtn.addEventListener('click', reset);
finishBtn.addEventListener('click', finishGame);


function matrix12() {
    mat1 = [
        ['4', '8', '3', '6', '7', '9', '2', '5', '1'],
        ['2', '1', '9', '5', '8', '4', '6', '7', '3'],
        ['5', '6', '7', '2', '1', '3', '4', '8', '9'],
        ['1', '4', '8', '7', '5', '2', '9', '3', '6'],
        ['3', '7', '2', '8', '9', '6', '1', '4', '5'],
        ['9', '5', '6', '3', '4', '1', '7', '2', '8'],
        ['6', '3', '4', '1', '2', '8', '5', '9', '7'],
        ['8', '9', '5', '4', '6', '7', '3', '1', '2'],
        ['7', '2', '1', '9', '3', '5', '8', '6', '4'],
    ];

    mat2 = [
        ['6', '5', '8', '2', '9', '3', '4', '1', '7'],
        ['7', '4', '1', '5', '6', '8', '9', '2', '3'],
        ['9', '3', '2', '1', '7', '4', '5', '6', '8'],
        ['3', '8', '5', '9', '2', '1', '7', '4', '6'],
        ['1', '6', '7', '4', '8', '5', '2', '3', '9'],
        ['4', '2', '9', '7', '3', '6', '8', '5', '1'],
        ['2', '7', '4', '3', '1', '9', '6', '8', '5'],
        ['8', '9', '3', '6', '5', '2', '1', '7', '4'],
        ['5', '1', '6', '8', '4', '7', '3', '9', '2'],
    ];

    mat3 = [
        ['4', '8', '9', '2', '7', '5', '6', '3', '1'],
        ['3', '7', '5', '4', '6', '1', '9', '2', '8'],
        ['2', '6', '1', '9', '3', '8', '5', '7', '4'],
        ['1', '5', '2', '7', '9', '3', '4', '8', '6'],
        ['7', '9', '6', '5', '8', '4', '3', '1', '2'],
        ['8', '3', '4', '1', '2', '6', '7', '5', '9'],
        ['6', '1', '7', '8', '5', '9', '2', '4', '3'],
        ['5', '4', '3', '6', '1', '2', '8', '9', '7'],
        ['9', '2', '8', '3', '4', '7', '1', '6', '5'],
    ];

    mat4 = [
        ['5', '8', '9', '4', '2', '1', '7', '3', '6'],
        ['4', '6', '2', '5', '7', '3', '8', '1', '9'],
        ['7', '3', '1', '8', '9', '6', '2', '5', '4'],
        ['8', '9', '3', '2', '4', '5', '6', '7', '1'],
        ['6', '1', '7', '3', '8', '9', '5', '4', '2'],
        ['2', '4', '5', '1', '6', '7', '9', '8', '3'],
        ['1', '2', '6', '7', '5', '4', '3', '9', '8'],
        ['9', '5', '4', '6', '3', '8', '1', '2', '7'],
        ['3', '7', '8', '9', '1', '2', '4', '6', '5'],
    ];

    mat5 = [
        ['6', '5', '4', '1', '7', '2', '9', '8', '3'],
        ['9', '8', '7', '6', '4', '3', '2', '1', '5'],
        ['3', '2', '1', '5', '8', '9', '4', '6', '7'],
        ['8', '9', '6', '7', '1', '4', '5', '3', '2'],
        ['1', '4', '3', '2', '6', '5', '8', '7', '9'],
        ['2', '7', '5', '9', '3', '8', '1', '4', '6'],
        ['4', '3', '9', '8', '5', '6', '7', '2', '1'],
        ['7', '6', '2', '4', '9', '1', '3', '5', '8'],
        ['5', '1', '8', '3', '2', '7', '6', '9', '4'],
    ];

    mat6 = [
        ['3', '1', '5', '8', '6', '2', '4', '7', '9'],
        ['7', '6', '2', '3', '4', '9', '5', '8', '1'],
        ['8', '4', '9', '5', '7', '1', '2', '6', '3'],
        ['9', '2', '8', '6', '5', '7', '3', '1', '4'],
        ['6', '5', '4', '2', '1', '3', '7', '9', '8'],
        ['1', '7', '3', '9', '8', '4', '6', '2', '5'],
        ['4', '9', '6', '1', '2', '5', '8', '3', '7'],
        ['2', '3', '7', '4', '9', '8', '1', '5', '6'],
        ['5', '8', '1', '7', '3', '6', '9', '4', '2'],
    ];

    mat7 = [
        ['8', '5', '7', '4', '6', '2', '3', '1', '9'],
        ['9', '2', '1', '3', '5', '7', '8', '4', '6'],
        ['3', '4', '6', '1', '9', '8', '5', '2', '7'],
        ['6', '8', '5', '2', '4', '3', '7', '9', '1'],
        ['1', '7', '9', '5', '8', '6', '2', '3', '4'],
        ['4', '3', '2', '7', '1', '9', '6', '8', '5'],
        ['2', '9', '3', '6', '7', '4', '1', '5', '8'],
        ['7', '1', '4', '8', '2', '5', '9', '6', '3'],
        ['5', '6', '8', '9', '3', '1', '4', '7', '2'],
    ];

    mat8 = [
        ['1', '2', '7', '5', '6', '8', '3', '4', '9'],
        ['6', '5', '9', '4', '3', '2', '1', '7', '8'],
        ['4', '8', '3', '1', '7', '9', '2', '6', '5'],
        ['7', '9', '8', '6', '4', '1', '5', '3', '2'],
        ['2', '1', '6', '3', '8', '5', '7', '9', '4'],
        ['5', '3', '4', '9', '2', '7', '6', '8', '1'],
        ['8', '6', '2', '7', '5', '4', '9', '1', '3'],
        ['3', '4', '1', '2', '9', '6', '8', '5', '7'],
        ['9', '7', '5', '8', '1', '3', '4', '2', '6'],
    ];

    mat9 = [
        ['3', '2', '7', '1', '5', '8', '9', '4', '6'],
        ['6', '1', '9', '4', '3', '7', '5', '8', '2'],
        ['5', '4', '8', '9', '6', '2', '7', '1', '3'],
        ['1', '8', '6', '5', '7', '4', '3', '2', '9'],
        ['4', '3', '2', '6', '8', '9', '1', '5', '7'],
        ['9', '7', '5', '3', '2', '1', '4', '6', '8'],
        ['7', '6', '4', '2', '1', '3', '8', '9', '5'],
        ['8', '5', '1', '7', '9', '6', '2', '3', '4'],
        ['2', '9', '3', '8', '4', '5', '6', '7', '1'],
    ];

    mat10 = [
        ['8', '3', '4', '1', '5', '7', '2', '9', '6'],
        ['5', '2', '1', '8', '6', '9', '4', '7', '3'],
        ['6', '9', '7', '3', '2', '4', '1', '5', '8'],
        ['1', '6', '5', '2', '9', '3', '7', '8', '4'],
        ['7', '8', '3', '6', '4', '5', '9', '2', '1'],
        ['2', '4', '9', '7', '1', '8', '3', '6', '5'],
        ['4', '7', '8', '5', '3', '2', '6', '1', '9'],
        ['3', '1', '2', '9', '8', '6', '5', '4', '7'],
        ['9', '5', '6', '4', '7', '1', '8', '3', '2'],
    ];

    mat11 = [
        ['8', '7', '5', '3', '2', '1', '9', '4', '6'],
        ['9', '6', '1', '4', '7', '8', '3', '2', '5'],
        ['4', '3', '2', '9', '6', '5', '8', '7', '1'],
        ['6', '8', '7', '2', '4', '9', '1', '5', '3'],
        ['5', '2', '9', '7', '1', '3', '6', '8', '4'],
        ['1', '4', '3', '5', '8', '6', '2', '9', '7'],
        ['3', '5', '8', '6', '9', '7', '4', '1', '2'],
        ['7', '1', '4', '8', '3', '2', '5', '6', '9'],
        ['2', '9', '6', '1', '5', '4', '7', '3', '8'],
    ];

    mat12 = [
        ['7', '6', '1', '9', '5', '8', '2', '3', '4'],
        ['4', '5', '3', '6', '1', '2', '9', '7', '8'],
        ['9', '2', '8', '3', '7', '4', '5', '6', '1'],
        ['5', '9', '2', '8', '6', '3', '1', '4', '7'],
        ['8', '7', '6', '5', '4', '1', '3', '2', '9'],
        ['3', '1', '4', '7', '2', '9', '6', '8', '5'],
        ['2', '8', '5', '4', '9', '6', '7', '1', '3'],
        ['1', '4', '7', '2', '3', '5', '8', '9', '6'],
        ['6', '3', '9', '1', '8', '7', '4', '5', '2'],
    ];
};

function pageDisplay(page1, page2, page3) {
    pageOne.style.display = page1;
    pageTwo.style.display = page2;
    pageThree.style.display = page3;
};