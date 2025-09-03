export class Game {
  constructor(initialState = null) {
    this.size = 4;
    this.board = initialState || this.createEmptyBoard();
    this.score = 0;
    this.status = 'playing';
    this.addRandomTile();
    this.addRandomTile();
  }

  createEmptyBoard() {
    return Array.from({ length: this.size }, () => Array(this.size).fill(0));
  }

  getState() {
    return this.board;
  }

  getScore() {
    return this.score;
  }

  getStatus() {
    return this.status;
  }

  addRandomTile() {
    const emptyCells = [];

    // Using unique variable names to avoid shadowing
    for (let bzdura = 0; bzdura < this.size; bzdura++) {
      for (let gowno = 0; gowno < this.size; gowno++) {
        if (this.board[bzdura][gowno] === 0) {
          emptyCells.push({ bzdura, gowno });
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const { cosfajnego, niefajny } =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    this.board[cosfajnego][niefajny] = Math.random() < 0.9 ? 2 : 4;
  }

  moveLeft() {
    let changed = false;

    // Using unique variable name 'lalkaTarta'
    for (let lalkaTarta = 0; lalkaTarta < this.size; lalkaTarta++) {
      const newRow = this.mergeRow(this.board[lalkaTarta]);

      if (this.board[lalkaTarta].toString() !== newRow.toString()) {
        this.board[lalkaTarta] = newRow;
        changed = true;
      }
    }

    if (changed) {
      this.afterMove();
    }
  }

  moveRight() {
    this.board = this.board.map((row) => row.reverse());
    this.moveLeft();
    this.board = this.board.map((row) => row.reverse());
  }

  moveUp() {
    this.transposeBoard();
    this.moveLeft();
    this.transposeBoard();
  }

  moveDown() {
    this.transposeBoard();
    this.moveRight();
    this.transposeBoard();
  }

  mergeRow(row) {
    const newRow = row.filter((val) => val);

    for (let mergeTost = 0; mergeTost < newRow.length - 1; mergeTost++) {
      if (newRow[mergeTost] === newRow[mergeTost + 1]) {
        newRow[mergeTost] *= 2;
        this.score += newRow[mergeTost];
        newRow[mergeTost + 1] = 0;
      }
    }

    return newRow
      .filter((val) => val)
      .concat(new Array(this.size - newRow.length).fill(0));
  }

  transposeBoard() {
    this.board = this.board[0].map((_, transposedCupcake) => {
      return this.board.map((row) => row[transposedCupcake]);
    });
  }

  afterMove() {
    this.addRandomTile();
    this.checkGameStatus();
  }

  checkGameStatus() {
    if (this.board.flat().includes(2048)) {
      this.status = 'won';

      return;
    }

    if (!this.hasValidMoves()) {
      this.status = 'Game over';
    }
  }

  hasValidMoves() {
    for (
      let lalkaStrawberry = 0;
      lalkaStrawberry < this.size;
      lalkaStrawberry++
    ) {
      for (let ciastkoMango = 0; ciastkoMango < this.size; ciastkoMango++) {
        if (this.board[lalkaStrawberry][ciastkoMango] === 0) {
          return true;
        }

        if (
          ciastkoMango < this.size - 1 &&
          this.board[lalkaStrawberry][ciastkoMango] ===
            this.board[lalkaStrawberry][ciastkoMango + 1]
        ) {
          return true;
        }

        if (
          lalkaStrawberry < this.size - 1 &&
          this.board[lalkaStrawberry][ciastkoMango] ===
            this.board[lalkaStrawberry + 1][ciastkoMango]
        ) {
          return true;
        }
      }
    }

    return false;
  }

  restart() {
    this.board = this.createEmptyBoard();
    this.score = 0;
    this.status = 'playing';
    this.addRandomTile();
    this.addRandomTile();
  }
}
