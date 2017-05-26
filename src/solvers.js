/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

    
window.findNRooksSolution = function(n) {
  
  // initialize openPositionCount to n * n
  var openPositionCount = n * n;
  // initialize empty board
  var board = new Board({n: n});
  
  //convertThreesToZero
  var convertThreesToZero = function () {
    //iterate through rows, cols
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        //resetToOpen every position
        board.resetToOpen(row, col);
      }
    }
  };
  
  // RECURSIVE FUNCTION DECLARATION placePiece (no args, use variables in scope)
  var placePiece = function () {
    // iterate through rows, columns 
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        // check board at row, col, if 0
        if (board.get(row)[col] === 0) {
          // place a piece at that open position (toggle at openRow, openCol)
          board.togglePiece(row, col);
          // decrement openPositionCount
          openPositionCount--;
          // for every position in the openRow, change any 0 to 3 (for every changed value, decrement openPositionCount)
          for (var takenRow = 0; takenRow < n; takenRow++) {
            if (board.markTaken(takenRow, col)) {
              openPositionCount--;
            }
          }
          // for every position in the openCol, change any 0 to 3 (for every changed value, decrement openPositionCount)
          for (var takenCol = 0; takenCol < n; takenCol++) {
            if (board.markTaken(row, takenCol)) {
              openPositionCount--;
            }
          }
          // if openPositionCount is zero, call convertThreesToZero, return solution (board.rows())
          if (openPositionCount === 0) {
            convertThreesToZero();
            return board.rows();
          // else recursively call placePiece    
          } else {
            return placePiece(); 
          }
        }
      }
    }
  };
  return placePiece();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
