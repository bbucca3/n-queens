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
  var board = new Board({n: n});
  var usedRows = [];
  var usedCols = [];
  for (let row = 0; row < n; row++) {
    var rows = board.get(row);
    for (let col = 0; col < n; col++) {
      var position = rows[col];
      if (position !== 1 && !usedRows.includes(row) && !usedCols.includes(col)) {
        board.togglePiece(row, col);
        usedRows.push(row);
        usedCols.push(col);
      }
    }
  }
  return board;
  
  
  // var board = new Board({n: n});
  // //iterate over all rows and all elements in each row
  // var solution = [];
  // var openPositionCount = n * n;
  // var checkBoardForOpenPositions = function () {
  //   for (let i = 0; i < n; i++) {
  //     var rows = this.get(i);
  //     for (let j = 0; j < n; j++) {
  //       var position = rows[j];
  //       if (position === 0) {
  //         addRook(position);
  //         openPositionCount--;
  //       if (openPositionCount === 0) {
  //         //call solution functions
        
  //           // for (var k = 0; k < board.rows().length; k++) {
  //           //   var row = board.get(k);
  //           //   solution.push(row);
  //           // }
  //           // solution.convertThrees();
  //           // return solution;
  //       }
  //     }
  //   }
  // };
  
  // //add rook
  // var addRook = function (position) {
  //   // var row = Math.floor(Math.random() * n);
  //   // var col = Math.floor(Math.random() * n);
  //   //add rook using position checkBoardForOpenPositions
  //   var location = checkBoardForOpenPositions();
  //   board.togglePiece(row, col);
  //   //update conflict locations with 3's
    
  // }
  
  // var convertThrees = function () {
  //   for (let i = 0; i < n; i++) {
  //     for (let j = 0; j < n; j++) {
  //       this.ourToggle(i,j);
  //     }
  //   }
  // };
    
    //place random rook toggle in locations that are = 0 or "open" 
    //call ourToggle on rows and cols in rooks path 
    //if board is closed (0 "open" count = 0)
      //return solution
    //if board has opening (0 "open" count > 0)
      //recur on rook placement 
  
  
  // //create new board with n size
  // var board = new Board({n: n});
  // //edit board to add rooks iteratively 
  // for (var i = 0; i < n; i++) {
  //   for (var j = 0; j < n; j++) {
  //     board.togglePiece(i, j);      
  //   }
  // }
  // var matrix = [];
  // for (var k = 0; k < board.rows().length; k++) {
  //   var row = board.get(k);
  //   matrix.push(row);
  // }
  // if (!board.hasAnyRooksConflicts()) { 
  //   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
  //   return matrix;
  // } else {
  //   this.findNRooksSolution(n);
  // }

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
