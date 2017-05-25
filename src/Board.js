// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      // queenCount of rooks
      var queenCount = 0;
      // loop through row array and check for conflict(s)
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          queenCount++;
        }
      }
      return queenCount > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var conflict = false;
      // loop through all rows of this matrix
      for (let i = 0; i < this.rows().length; i++) {
        // call hasRowConflictAt for each row in loop
        if (this.hasRowConflictAt(i) === true) {
          conflict = true;
        }
      }
      return conflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var queenCount = 0;
      for (let i = 0; i < this.rows().length; i++) {
        var row = this.get(i);
        if (row[colIndex] === 1) {
          queenCount++;
        }
      }
      return queenCount > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var conflict = false;
      // loop through all rows of this matrix
      for (let i = 0; i < this.rows().length; i++) {
        // call hasRowConflictAt for each row in loop
        if (this.hasColConflictAt(i) === true) {
          conflict = true;
        }
      }
      return conflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //if positive index 
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        //starting loc = 0, index
        var row = 0;
        var col = majorDiagonalColumnIndexAtFirstRow;
      }
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        //starting loc = index * -1 , 0
        var row = majorDiagonalColumnIndexAtFirstRow * -1;
        var col = 0;        
      }
      
      var boardLimit = this.rows().length;
      var queenCount = 0;
      while (row < boardLimit && col < boardLimit) {
        var wholeRow = this.get(row);
        if (wholeRow[col] === 1) {
          queenCount++;
        }
        row++; 
        col++;
      }
      return queenCount > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var conflict = false;
      var index = (this.rows().length * -1 + 2);
      for (var i = index; i < (this.rows().length - 2); i++) {
        if (this.hasMajorDiagonalConflictAt(i) === true) {
          conflict = true;
        }
      }
      return conflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      if (minorDiagonalColumnIndexAtFirstRow < this.rows().length) {
        var row = 0;
        var col = minorDiagonalColumnIndexAtFirstRow;
      }
      if (minorDiagonalColumnIndexAtFirstRow >= this.rows().length) {
        var row = minorDiagonalColumnIndexAtFirstRow - 2;
        var col = this.rows().length - 1;
      }
      
      var colBoardLimit = 0;
      var rowBoardLimit = this.rows().length - 1;
      var queenCount = 0;
      while (row <= rowBoardLimit && col >= colBoardLimit) {
        var wholeRow = this.get(row);
        if (wholeRow[col] === 1) {
          queenCount++;
        }
        row++;
        col--;
      }
      return queenCount > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var conflict = false;
      for (var i = (this.rows().length * 2 - 3); i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i) === true) {
          conflict = true;
        }
      }
      return conflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
