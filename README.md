# Space-Sudoku-2020

I created the project on the basis of 3 pages managed by the "background view" 
function and in fact by switching between the pages it activates the desired page and
"turns it off" by anyone to the other pages.

The game was designed as accessible to the user in a rather personal and relaxed way by creating a one-time username 
for the game and presenting it until the end, 4 stages of play with varying difficulty levels, winning / losing experience by annimations, 
dragging the numbers to the empty cells to focus The user only in the game board and not by searching for numbers from 1-9 on the keyboard.

Javascript - the game mechanism
The functionality of the game is based on taking "variables" from the HTML page, 
creating temporary variables for calculations and actions and using functions from other practices of JS
and from various sites.The main function that performs the table calculations works by searching for the negative values
so as not to waste unnecessary runtime,the test loops in each row, column and sub-matrix (no) around a certain value are 
performed first if no empty value is found, similar to Etc. The winning actions are performed in the game by annimations.
