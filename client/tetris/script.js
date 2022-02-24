document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const squares = Array.from(document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelector('#score');
  const StartBtn = document.querySelector('#start-button');
  const width = 10;

  console.log(squares);

  // The Tetraminoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2], // 1, 11, 21, 2
    [width, width + 1, width + 2, width * 2 + 2], // 10, 11, 12, 22
    [1, width + 1, width * 2 + 1, width * 2], // 1, 11, 21, 20
    [width, width * 2, width * 2 + 1, width * 2 + 2] // 10, 20, 21, 22
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const theTetraminoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let random = Math.floor(Math.random() * theTetraminoes.length);
  console.log(random);

  let currentPosition = 4;
  const currentRotation = 0;
  let current = theTetraminoes[random][currentRotation];

  // draw the Tetramino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetramino');
    });
  }

  draw();

  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetramino');
    });
  }

  // make the tetromino move down every second
  timerId = setInterval(moveDown, 100);

  // assign fucntion to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener('keyup', control);

  // move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // freeze function
  function freeze() {
    if (current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPosition + index].classList.add('taken'));
      // start a new tetramino falling
      random = Math.floor(Math.random() * theTetraminoes.length);
      current = theTetraminoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  // move the tetramino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) currentPosition -= 1;

    if (current.some((index) => swaures[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }

    draw();
  }

  // move the tromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPosition + index) % width == width - 1);

    if (!isAtRightEdge) currentPosition += 1;

    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }

    draw();
  }

  // rotate the tetramino
  function rotate() {
    undraw();
    currentPosition++
    if(currentRotation === current.length) { 
    // if the current rotation gets to 4, make it go bck to 0
      currentRotation = 0;
    }
    current = theTetraminoes[random][currentRotation];
    draw();
  }
});